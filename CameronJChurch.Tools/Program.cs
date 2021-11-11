using CameronJChurch.Models;
using Microsoft.Extensions.CommandLineUtils;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace CameronJChurch.Tools
{
    class Program
    {
        static readonly HttpClient _client = new();

        /*
         * https://cameronjchurch.azurewebsites.net/api/coin/coinHistory
         * https://localhost:44334/api/coin/coinHistory
         */

        static async Task Main(string[] args)
        {
            var app = new CommandLineApplication();

            var coinHistory = app.Command("coinHistory", config =>
            {
                config.OnExecute(() =>
                {
                    config.ShowHelp();
                    return 1;
                });
                config.HelpOption("-? | -h | --help");
            });
            coinHistory.Command("help", config =>
            {
                config.Description = "get help!";
                config.OnExecute(() =>
                {
                    coinHistory.ShowHelp("coinHistory");
                    return 1;
                });
            });
            coinHistory.Command("trigger", config =>
            {
                config.Description = "Triggers coin history";
                config.HelpOption("-? | -h | --help");
                var endpoint = config.Argument("endpoint", "The endpoint to call to trigger coinHistory get");
                var hours = config.Argument("delayHours", "The delay between subsequent coinHistory calls");
                config.OnExecute(async () =>
                {
                    if (!string.IsNullOrEmpty(endpoint.Value) && !string.IsNullOrEmpty(hours.Value) && int.TryParse(hours.Value, out int hourDelay))
                    {
                        await TriggerCoinHistory(endpoint.Value, hourDelay);
                        return 0;
                    }
                    Console.WriteLine("Please supply appropriate argments!");
                    return 1;
                });
            });

            app.HelpOption("-? | -h | --help");
            var result = app.Execute(args);
            Environment.Exit(result);
        }

        static async Task TriggerCoinHistory(string endpoint, int hours)
        {

            while (true)
            {
                Console.WriteLine($"{DateTime.Now} - Getting CoinHistory");
                Console.WriteLine($"{endpoint}");

                var totals = await _client.GetFromJsonAsync<List<CoinTotal>>(endpoint);
                foreach (var t in totals)
                {
                    Console.WriteLine("============================================");
                    Console.WriteLine($"UserName: {t.UserName}");
                    Console.WriteLine($"TotalCost: ${t.TotalCost}");
                    Console.WriteLine($"TotalValue: ${t.TotalValue}");
                    Console.WriteLine($"CreatedDate: {t.CreatedDate}");
                }

                await Task.Delay(TimeSpan.FromHours(hours));

                Console.WriteLine("============================================");
            }
        }
    }
}

using CameronJChurch.Models;
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
        static readonly string endPoint = @"https://cameronjchurch.azurewebsites.net/api/coin/coinHistory";
        static readonly int hours = 1;

        static async Task Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine($"{DateTime.Now} - Getting CoinHistory");
                Console.WriteLine($"{endPoint}");

                await TriggerCoinHistory();
                await Task.Delay(TimeSpan.FromHours(hours));

                Console.WriteLine("============================================");
            }
        }

        static async Task TriggerCoinHistory()
        {                                    
            var totals = await _client.GetFromJsonAsync<List<CoinTotal>>(endPoint);
            foreach (var t in totals)
            {
                Console.WriteLine("============================================");
                Console.WriteLine($"UserName: {t.UserName}");
                Console.WriteLine($"TotalCost: ${t.TotalCost}");
                Console.WriteLine($"TotalValue: ${t.TotalValue}");
                Console.WriteLine($"CreatedDate: {t.CreatedDate}");
            }
        }
    }
}

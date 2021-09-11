using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;

namespace CameronJChurch
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Read Configuration from appSettings    
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            //Initialize Logger    .WriteTo.SQLite("CameronJChurch.db")
            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(config).CreateLogger();
            Log.Information($"Current directory: {AppContext.BaseDirectory}");
            try
            {
                Log.Information("### Application Starting. ###");
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "!!! The Application failed to start. !!!");
            }
            finally
            {
                Log.CloseAndFlush();
            }
            //CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

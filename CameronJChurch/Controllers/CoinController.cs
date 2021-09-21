using CameronJChurch.Data;
using CameronJChurch.Models;
using CameronJChurch.Models.ViewModels;
using CoinGecko.Clients;
using CoinGecko.Entities.Response.Coins;
using CoinGecko.Parameters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CameronJChurch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoinController : ControllerBase
    {
        private readonly ILogger<CoinController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly CoinGeckoClient _coinGeckoClient;

        public CoinController(ILogger<CoinController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
            _coinGeckoClient = CoinGeckoClient.Instance;
        }

        [HttpGet]
        public async Task<IEnumerable<CoinViewModel>> Get(string userName)
        {
            List<CoinViewModel> results = new();

            try
            {
                var coins = await _context.Coins.Where(c => c.UserName == userName).ToListAsync();
                var markets = await _coinGeckoClient.CoinsClient.GetCoinMarkets("usd", coins.Select(c => c.Name).ToArray(),
                  OrderField.MarketCapDesc, 1, 1, false, "1h", null);

                results = GetConViewModel(markets, coins);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error while getting coins");
                throw;
            }

            return results;
        }

        [HttpPost]
        public async Task<IActionResult> Post(IEnumerable<Coin> coins)
        {
            try
            {
                foreach (var c in coins)
                {
                    if (c.CoinId == 0)
                    {
                        await _context.Coins.AddAsync(c);
                    }
                    else
                    {
                        _context.Coins.Update(c);
                    }
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error saving coins");
                throw;
            }

            return Ok();
        }

        private static List<CoinViewModel> GetConViewModel(List<CoinMarkets> markets, List<Coin> coins)
        {
            List<CoinViewModel> results = new();

            foreach (var market in markets)
            {
                var coin = coins.First(c => c.Name == market.Id);
                var coinViewModel = new CoinViewModel
                {
                    Name = coin.Name,
                    CoinId = coin.CoinId,
                    Amount = coin.Amount,
                    Cost = coin.Cost,
                    UserName = coin.UserName,
                    Price = market.CurrentPrice
                };

                coinViewModel.Value = coinViewModel.Amount * coinViewModel.Price;
                
                results.Add(coinViewModel); 
            }

            return results;
        }
    }
}

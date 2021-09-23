using CameronJChurch.Data;
using CameronJChurch.Models;
using CameronJChurch.Models.ViewModels;
using CoinGecko.Clients;
using CoinGecko.Entities.Response.Coins;
using CoinGecko.Parameters;
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
        public async Task<CoinViewModel> Get(string userName)
        {
            CoinViewModel results = new();

            try
            {
                var coins = await _context.Coins.Include(c => c.History).Where(c => c.UserName == userName).ToListAsync();
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
        public async Task<IActionResult> Post(CoinViewModel coinsViewModel)
        {
            try
            {
                foreach (var c in coinsViewModel.Coins)
                {                    
                    if (c.CoinId == 0)
                    {
                        c.CreatedDate = DateTime.UtcNow;
                        await _context.Coins.AddAsync(c);
                    }
                    else
                    {
                        if(c.Updated)
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

        private static CoinViewModel GetConViewModel(IEnumerable<CoinMarkets> markets, IEnumerable<Coin> coins)
        {
            CoinViewModel result = new();

            foreach (var market in markets)
            {
                var coin = coins.First(c => c.Name.ToLower() == market.Id);

                coin.Price = market.CurrentPrice;
                coin.Symbol = market.Symbol;
                coin.Value = coin.Amount * coin.Price;

                result.Coins.Add(coin);
            }

            result.TotalCost = result.Coins.Sum(c => c.Cost);
            result.TotalValue = result.Coins.Sum(c => c.Value);

            return result;
        }
    }
}

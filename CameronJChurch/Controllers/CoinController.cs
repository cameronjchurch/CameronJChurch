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
                var coinTemplates = await _context.CoinTemplates.ToListAsync();
                var markets = await _coinGeckoClient.CoinsClient.GetCoinMarkets("usd", coins.Select(c => c.Name).ToArray(),
                  OrderField.MarketCapDesc, 1, 1, false, "1h", null);

                var availableCoins = coinTemplates.Where(ct => !coins.Any(c => c.Name == ct.Name));

                results = GetConViewModel(markets, coins, availableCoins.Select(c => c.Name));
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error while getting CoinViewModel");
                throw;
            }

            return results;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Coin coin)
        {
            try
            {
                if (coin.CoinId == 0)
                {
                    coin.CreatedDate = DateTime.UtcNow;
                    await _context.Coins.AddAsync(coin);
                }
                else
                {
                    _context.Coins.Update(coin);
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error saving Coin");
                throw;
            }

            return Ok();
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(Coin coin)
        {
            try
            {
                _context.Coins.Update(coin);
                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error patching Coin");
                throw;
            }

            return Ok();
        }

        private static CoinViewModel GetConViewModel(IEnumerable<CoinMarkets> markets, IEnumerable<Coin> coins, IEnumerable<string> coinNames)
        {
            CoinViewModel result = new();

            result.CoinNames = coinNames;

            foreach (var coin in coins)
            {
                var market = markets.First(m => m.Name == coin.Name);

                coin.Price = market.CurrentPrice;
                coin.Symbol = market.Symbol.ToUpper();
                coin.Value = coin.Amount * coin.Price;

                result.Coins.Add(coin);
            }

            result.TotalCost = result.Coins.Sum(c => c.Cost);
            result.TotalValue = result.Coins.Sum(c => c.Value);

            return result;
        }
    }
}

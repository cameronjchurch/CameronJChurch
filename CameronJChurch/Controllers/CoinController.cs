using CameronJChurch.Data;
using CameronJChurch.Models;
using CameronJChurch.Models.ViewModels;
using Coinbase;
using CoinGecko.Clients;
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

        private readonly CoinbaseClient _coinbaseClient;
        private readonly CoinGeckoClient _coingeckoClient;

        public CoinController(ILogger<CoinController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;            
            
            _coinbaseClient = new CoinbaseClient();
            _coingeckoClient = CoinGeckoClient.Instance;
        }

        [HttpGet]
        public async Task<CoinViewModel> Get(string userName, bool useCoinbase = false)
        {
            CoinViewModel results = new();
            Dictionary<string, decimal?> prices = new();

            try
            {
                var coins = await _context.Coins.Include(c => c.CoinTemplate).Include(c => c.History).Where(c => c.UserName == userName).ToListAsync();
                var coinTemplates = await _context.CoinTemplates.ToListAsync();
                var availableCoins = coinTemplates.Where(ct => !coins.Any(c => c.CoinTemplate.Name == ct.Name));

                if (useCoinbase)
                    prices = await GetCoinbasePrices(coins);
                else
                    prices = await GetCoinGeckoPrices(coins);                

                results = GetConViewModel(prices, coins, availableCoins);
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
                    _context.CoinTemplates.Attach(coin.CoinTemplate);
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

        private static CoinViewModel GetConViewModel(IDictionary<string, decimal?> prices, IEnumerable<Coin> coins, IEnumerable<CoinTemplate> coinTemplates)
        {
            CoinViewModel result = new();

            result.CoinTemplates = coinTemplates;

            foreach (var coin in coins)
            {
                var price = prices[coin.CoinTemplate.Symbol];

                coin.Price = price;
                
                coin.Value = coin.Amount * coin.Price;

                result.Coins.Add(coin);
            }

            result.TotalCost = result.Coins.Sum(c => c.Cost);
            result.TotalValue = result.Coins.Sum(c => c.Value);

            return result;
        }

        private async Task<Dictionary<string, decimal?>> GetCoinbasePrices(List<Coin> coins)
        {
            Dictionary<string, decimal?> results = new();

            foreach (var c in coins)
            {
                var price = await _coinbaseClient.Data.GetSpotPriceAsync($"{c.CoinTemplate.Symbol}-USD");
                results.Add(c.CoinTemplate.Symbol, price.Data.Amount);
            }

            return results;
        }

        private async Task<Dictionary<string, decimal?>> GetCoinGeckoPrices(List<Coin> coins)
        {
            Dictionary<string, decimal?> results = new();

            var markets = await _coingeckoClient.CoinsClient.GetCoinMarkets("usd", coins.Select(c => c.CoinTemplate.Name).ToArray(),
                  OrderField.MarketCapDesc, 1, 1, false, "1h", null);

            foreach (var c in coins)
            {
                var market = markets.First(m => m.Symbol.ToUpper() == c.CoinTemplate.Symbol);

                results.Add(c.CoinTemplate.Symbol, market.CurrentPrice);
            }

            return results;
        }
    }
}

using System.Collections.Generic;

namespace CameronJChurch.Models.ViewModels
{
    public class CoinViewModel
    {
        public CoinViewModel() 
        {
            Coins = new List<Coin>();
            CoinNames = new List<string>();
        }
        public ICollection<Coin> Coins { get; set; }
        public IEnumerable<string> CoinNames { get; set; }
                        
        public decimal? TotalCost { get; set; }
        public decimal? TotalValue { get; set; }
    }
}

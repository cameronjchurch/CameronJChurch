using System.Collections.Generic;

namespace CameronJChurch.Models.ViewModels
{
    public class CoinViewModel
    {
        public CoinViewModel() 
        {
            Coins = new List<Coin>();
            CoinTemplates = new List<CoinTemplate>();
            CoinTotalHistory = new List<CoinTotal>();
        }
        public ICollection<Coin> Coins { get; set; }
        public IEnumerable<CoinTemplate> CoinTemplates { get; set; }
        public ICollection<CoinTotal> CoinTotalHistory { get; set; }
                        
        public decimal? TotalCost { get; set; }
        public decimal? TotalValue { get; set; }
    }
}

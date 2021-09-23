using System;
using System.Collections.Generic;

namespace CameronJChurch.Models.ViewModels
{
    public class CoinViewModel
    {
        public CoinViewModel() 
        {
            Coins = new List<Coin>();
        }
        public ICollection<Coin> Coins { get; set; }
                        
        public decimal? TotalCost { get; set; }
        public decimal? TotalValue { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CameronJChurch.Models
{
    public class Coin
    {
        public Coin()
        {
            History = new List<CoinHistory>();
        }

        [Key]
        public int CoinId { get; set; }
        public string Name { get; set; }
        public decimal Cost { get; set; }
        public decimal Amount { get; set; }        
        public string UserName { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<CoinHistory> History { get; set; }

        [NotMapped]
        public string Symbol { get; set; }
        [NotMapped]
        public decimal? Price { get; set; }
        [NotMapped]
        public decimal? Value { get; set; }
        [NotMapped]
        public bool Updated { get; set; }
    }
}

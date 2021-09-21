using System.ComponentModel.DataAnnotations;

namespace CameronJChurch.Models
{
    public class Coin
    {
        [Key]
        public int CoinId { get; set; }
        public string Name { get; set; }        
        public decimal Cost { get; set; }
        public decimal Amount { get; set; }
        public string UserName { get; set; }
    }
}

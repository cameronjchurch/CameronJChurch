using System.ComponentModel.DataAnnotations;

namespace CameronJChurch.Models
{
    public class Coin
    {
        [Key]
        public int CoinId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double Cost { get; set; }
        public double Amount { get; set; }
        public string UserName { get; set; }
    }
}

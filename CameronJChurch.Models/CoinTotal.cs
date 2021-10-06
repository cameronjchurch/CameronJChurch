using System;
using System.ComponentModel.DataAnnotations;

namespace CameronJChurch.Models
{
    public class CoinTotal
    {
        [Key]
        public int CoinTotalId { get; set; }
        public decimal? TotalCost { get; set; }
        public decimal? TotalValue { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UserName { get; set; }
    }
}

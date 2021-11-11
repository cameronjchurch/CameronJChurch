using System;
using System.ComponentModel.DataAnnotations;

namespace CameronJChurch.Models
{
    public class CoinHistory
    {       
        [Key]
        public int CoinHistoryId { get; set; }
        public int CoinId { get; set; }        
        public decimal Cost { get; set; }
        public decimal Amount { get; set; }        
        public DateTime CreatedDate { get; set; }
    }
}

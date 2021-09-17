using System.ComponentModel.DataAnnotations;

namespace CameronJChurch.Models
{
    public class Bill
    {
        [Key]
        public int BillId { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public double Amount { get; set; }
        public bool Paid { get; set; }        
        public BillTemplate BillTemplate { get; set; }
    }
}

namespace CameronJChurch.Models.ViewModels
{
    public class CoinViewModel
    {
        public int CoinId { get; set; }
        public string Name { get; set; }
        public decimal Cost { get; set; }
        public decimal Amount{get;set;}
        public decimal? Price { get; set; }
        public decimal? Value { get; set; }
        public string UserName { get; set; }
    }
}

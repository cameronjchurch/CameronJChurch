using System;

namespace CameronJChurch.Models.ViewModels
{
    public class BillViewModel
    {
        public int BillId { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        public bool Paid { get; set; }
        public string UserName { get; set; }
        public int BillTemplateId { get; set; }
    }
}

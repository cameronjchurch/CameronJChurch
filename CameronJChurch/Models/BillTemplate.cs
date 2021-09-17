using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CameronJChurch.Models
{
    public class BillTemplate
    {
        [Key]
        public int BillTemplateId { get; set; }
        public string Name { get; set; }
        public int Day { get; set; }
        public double Amount { get; set; }
        public string UserName { get; set; }
        [DefaultValue(true)]
        public bool Active { get; set; }
    }
}

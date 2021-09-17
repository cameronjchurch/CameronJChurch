using System.ComponentModel.DataAnnotations;

namespace CameronJChurch.Models
{
    public class BillTemplate
    {
        [Key]
        public int BillTemplateId { get; set; }
        public string Name { get; set; }
        public int Day { get; set; }
        public string UserName { get; set; }
        public CameronJChurchUser User { get; set; }
    }
}

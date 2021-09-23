using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CameronJChurch.Models
{
    public class CoinTemplate
    {
        [Key]
        public int CoinTemplateId { get; set; }
        public string Name { get; set; }
        public string Symbol { get; set; }
        [NotMapped]
        public bool Updated { get; set; }
    }
}

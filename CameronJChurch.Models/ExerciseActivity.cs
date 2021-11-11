using System.ComponentModel.DataAnnotations;

namespace CameronJChurch.Models
{
    public class ExerciseActivity
    {
        [Key]
        public int ExerciseActivityId { get; set; }
        public string ExerciseActivityName { get; set; }
        public string ExerciseActivityUnit { get; set; }
        public decimal Count { get; set; }
        public string UserName { get; set; }
    }
}

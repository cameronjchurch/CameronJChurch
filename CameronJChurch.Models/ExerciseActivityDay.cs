using System;
using System.ComponentModel.DataAnnotations;

namespace CameronJChurch.Models
{
    public class ExerciseActivityDay
    {
        [Key]
        public int ExerciseActivityDayId { get; set; }
        public DateTime Date { get; set; }
        public ExerciseActivity ExerciseActivity { get; set; }
        public int Count { get; set; }
        public string UserName { get; set; }
    }
}

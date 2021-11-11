using System.Collections.Generic;

namespace CameronJChurch.Models.ViewModels
{
    public class ExerciseViewModel
    {
        public ExerciseViewModel()
        {
            AllActivities = new List<ExerciseActivityDay>();
            TodaysActivities = new List<ExerciseActivityDay>();
            Exercises = new List<ExerciseActivity>();
        }

        public ICollection<ExerciseActivityDay> AllActivities { get; set; }
        public ICollection<ExerciseActivityDay> TodaysActivities { get; set; }
        public ICollection<ExerciseActivity> Exercises { get; set; }
    }
}

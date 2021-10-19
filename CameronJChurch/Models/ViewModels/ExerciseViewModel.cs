using System.Collections.Generic;

namespace CameronJChurch.Models.ViewModels
{
    public class ExerciseViewModel
    {
        public ExerciseViewModel()
        {
            Activities = new List<ExerciseActivityDay>();
            Exercises = new List<ExerciseActivity>();
        }

        public ICollection<ExerciseActivityDay> Activities { get; set; }
        public ICollection<ExerciseActivity> Exercises { get; set; }
    }
}

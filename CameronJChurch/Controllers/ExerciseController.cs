using CameronJChurch.Data;
using CameronJChurch.Models;
using CameronJChurch.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CameronJChurch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly ILogger<ExerciseController> _logger;
        private readonly ApplicationDbContext _context;

        public ExerciseController(ILogger<ExerciseController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ExerciseViewModel> Get(string userName)
        {
            ExerciseViewModel results = new();
            
            try
            {
                var exercises = await _context.ExerciseActivity.Where(e => e.UserName == userName).ToListAsync();
                var exerciseActivities = await _context.ExerciseActivityDay.Include(a => a.ExerciseActivity).Where(a => a.UserName == userName).ToListAsync();

                results.Exercises = exercises;
                results.Activities = exerciseActivities;
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error while getting ExerciseActivities");
                throw;
            }

            return results;
        }

        [HttpPost]
        public async Task<IActionResult> Post(ExerciseActivity exerciseActivity)
        {
            try
            {
                if (exerciseActivity.ExerciseActivityId == 0)
                {
                    await _context.ExerciseActivity.AddAsync(exerciseActivity);
                }
                else
                {
                    _context.ExerciseActivity.Update(exerciseActivity);
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error saving ExerciseActivity");
                throw;
            }

            return Ok();
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(IEnumerable<ExerciseActivityDay> activities)
        {
            try
            {
                foreach (var activity in activities)
                {
                    if (activity.ExerciseActivityDayId == 0)
                    {
                        await _context.ExerciseActivityDay.AddAsync(activity);
                    }
                    else
                    {
                        _context.ExerciseActivityDay.Update(activity);
                    }
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error saving ExerciseActivityDays");
                throw;
            }

            return Ok();
        }
    }
}

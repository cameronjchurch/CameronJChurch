using CameronJChurch.Data;
using CameronJChurch.Models;
using CameronJChurch.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
            List<PerformanceMetric> performance = new();
            Stopwatch sw = new();

            try
            {
                sw.Start();
                var exercises = await _context.ExerciseActivity.Where(e => e.UserName == userName).ToListAsync();
                sw.Stop();
                performance.Add(new PerformanceMetric { Name = "ExerciseActivity", Value = sw.ElapsedMilliseconds });

                sw.Start();
                var allActivities = await _context.ExerciseActivityDay.Include(a => a.ExerciseActivity).Where(a => a.UserName == userName).ToListAsync();
                sw.Stop();
                performance.Add(new PerformanceMetric { Name = "ExerciseActivityDay", Value = sw.ElapsedMilliseconds });

                sw.Start();
                var todaysActivities = allActivities.Where(a => a.Date >= DateTime.Now.Date).ToList();
                List<ExerciseActivity> availableExercises = exercises.Where(e => !todaysActivities.Any(ea => ea.ExerciseActivity.ExerciseActivityId == e.ExerciseActivityId)).ToList();
                sw.Stop();
                performance.Add(new PerformanceMetric { Name = "Activity calculation", Value = sw.ElapsedMilliseconds });

                results.PerformanceMetrics = performance;
                results.Exercises = availableExercises;
                results.AllActivities = allActivities;
                results.TodaysActivities = todaysActivities;
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

        [Route("activity")]
        [HttpPost]
        public async Task<IActionResult> PostActivity(ExerciseActivityDay exerciseActivityDay)
        {
            try
            {
                if (exerciseActivityDay.ExerciseActivityDayId == 0)
                {
                    await _context.ExerciseActivityDay.AddAsync(exerciseActivityDay);
                    _context.ExerciseActivity.Attach(exerciseActivityDay.ExerciseActivity);
                }
                else
                {
                    _context.ExerciseActivityDay.Update(exerciseActivityDay);
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error saving ExerciseActivityDay");
                throw;
            }

            return Ok();
        }
    }
}

using CameronJChurch.Data;
using CameronJChurch.Models;
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
    public class LogController : ControllerBase
    {
        private readonly ILogger<LogController> _logger;
        private readonly ApplicationDbContext _context;

        public LogController(ILogger<LogController> logger, ApplicationDbContext context) 
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Log>> Get()
        {
            IEnumerable<Log> logEntries = null;

            try 
            {
                logEntries = await _context.Logs.OrderByDescending(l => l.Timestamp).AsNoTracking().ToListAsync();
            }
            catch (Exception exception) 
            {
                _logger.LogError(exception, $"Failed reading Logs");
            }

            return logEntries;
        }

        [HttpGet("{page}")]
        public async Task<IEnumerable<Log>> Get(int? page)
        {
            IEnumerable<Log> logEntries = null;

            try
            {
                logEntries = await PaginatedList<Log>.CreateAsync(
                    _context.Logs.OrderByDescending(l => l.Timestamp).AsNoTracking(), page ?? 1, 10);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Failed reading Logs");
            }

            return logEntries;
        }
    }
}

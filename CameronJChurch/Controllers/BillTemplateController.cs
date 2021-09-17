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
    public class BillTemplateController : ControllerBase
    {
        private readonly ILogger<BillTemplateController> _logger;
        private readonly ApplicationDbContext _context;

        public BillTemplateController(ILogger<BillTemplateController> logger, ApplicationDbContext context) 
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<BillTemplate>> Get(string userName)
        {
            IEnumerable<BillTemplate> results = null;

            try 
            {
                results = await _context.BillTemplates.Where(b => b.Active && b.UserName == userName).ToListAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error getting BillTemplates");
                throw;
            }            

            return results;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BillTemplate billTemplate)
        {            
            try
            {
                billTemplate.Active = true;
                await _context.BillTemplates.AddAsync(billTemplate);
                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error saving BillTemplate");
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {            
            try
            {
                var billTemplate = await _context.BillTemplates.FindAsync(id);
                billTemplate.Active = false;
                _context.BillTemplates.Update(billTemplate);
                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error deleting BillTemplate");
                throw;
            }

            return Ok();
        }
    }
}

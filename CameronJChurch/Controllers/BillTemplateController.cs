using CameronJChurch.Data;
using CameronJChurch.Models;
using Microsoft.AspNetCore.Mvc;
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
        public IEnumerable<BillTemplate> Get()
        {
            IEnumerable<BillTemplate> results = null;

            try 
            {
                results = _context.BillTemplates.ToList();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error getting BillTemplates");
            }
            


            return results;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]BillTemplate billTemplate)
        {
            //var billTemplate = new BillTemplate { Name = name, Day = day };
            try
            {
                //billTemplate.UserName = User.Identity.Name;
                _ = await _context.BillTemplates.AddAsync(billTemplate);
                _ = await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error saving BillTemplate");                
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var billTemplate = new BillTemplate { BillTemplateId = id };

            try
            {
                _context.BillTemplates.Attach(billTemplate);
                _context.BillTemplates.Remove(billTemplate);
                _ = await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error deleting BillTemplate");
            }

            return Ok();
        }
    }
}

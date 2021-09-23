using CameronJChurch.Data;
using CameronJChurch.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CameronJChurch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoinTemplateController : ControllerBase
    {
        private readonly ILogger<CoinTemplateController> _logger;
        private readonly ApplicationDbContext _context;        

        public CoinTemplateController(ILogger<CoinTemplateController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;            
        }
        
        [HttpGet]
        public async Task<IEnumerable<CoinTemplate>> Get() 
        {            
            try
            {
                return await _context.CoinTemplates.ToListAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error getting CoinTemplates");
                throw;
            }            
        }

        [HttpPost]
        public async Task<IActionResult> Post(CoinTemplate coinTemplate)
        {
            try 
            {
                if (coinTemplate.CoinTemplateId == 0)
                {
                    await _context.CoinTemplates.AddAsync(coinTemplate);
                }
                else
                {
                    _context.CoinTemplates.Update(coinTemplate);
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error saving new CoinTemplate");
                throw;
            }

            return Ok();
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(CoinTemplate coinTemplate)
        {
            try
            {
                _context.CoinTemplates.Update(coinTemplate);
                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error patching CoinTemplate");
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var billTemplate = await _context.CoinTemplates.FindAsync(id);                
                _context.CoinTemplates.Remove(billTemplate);
                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error deleting CoinTemplate");
                throw;
            }

            return Ok();
        }
    }
}

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
    public class BillController : ControllerBase
    {
        private readonly ILogger<BillController> _logger;
        private readonly ApplicationDbContext _context;

        public BillController(ILogger<BillController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<BillViewModel>> Get(string userName)
        {
            List<Bill> results = new();

            try
            {
                /*
                 * 1. Get bills for month
                 * 2. Get tempalates
                 * 3. if no bills, or more templates than bills
                 * 4. save templates and bills table
                 */
                results = await _context.Bills
                    .Include(b => b.BillTemplate)
                    .Where(b => b.Month == DateTime.Now.Month && b.Year == DateTime.Now.Year && b.BillTemplate.UserName == userName)
                    .ToListAsync();

                var templates = await _context.BillTemplates.Where(b => b.Active && b.UserName == userName).ToListAsync();

                var createNewBills = HasNewBill(results, templates);

                if (results.Count == 0 || createNewBills)
                {                                        
                    foreach (var t in templates)
                    {
                        if(!results.Any(b => b.BillTemplate.BillTemplateId == t.BillTemplateId))
                            results.Add(new Bill { BillTemplate = t, Month = DateTime.Now.Month, Year = DateTime.Now.Year, Amount = t.Amount });
                    }

                    await _context.Bills.AddRangeAsync(results.Where(b => b.BillId == 0));                    
                    await _context.SaveChangesAsync();

                    results = await _context.Bills
                        .Include(b => b.BillTemplate)
                        .Where(b => b.Month == DateTime.Now.Month && b.Year == DateTime.Now.Year && b.BillTemplate.UserName == userName)
                        .AsNoTracking().ToListAsync();
                }
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error getting bills for month: {DateTime.Now.Month}");
                throw;
            }

            return GetViewModel(results);
        }

        [HttpPost]
        public async Task<IActionResult> Post(IEnumerable<BillViewModel> billViewModels)
        {
            var bills = await GetBills(billViewModels);

            try
            {
                foreach (var b in bills)
                {
                    if (b.BillId == 0)
                    { 
                        await _context.Bills.AddAsync(b); 
                    }
                    else
                    {
                        _context.Bills.Update(b);
                    }
                }                
                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, $"Error saving bills");
                throw;
            }

            return Ok();
        }

        static bool HasNewBill(IEnumerable<Bill> bills, IEnumerable<BillTemplate> billTemplates)
        {            
            foreach (var t in billTemplates)
            {
                if (!bills.Any(b => b.BillTemplate.BillTemplateId == t.BillTemplateId))
                    return true;
            }

            return false;
        }

        async Task<IEnumerable<Bill>> GetBills(IEnumerable<BillViewModel> billViewModels)
        {
            List<Bill> bills = new();

            foreach (var bvm in billViewModels)
            {
                var tempalte = await _context.BillTemplates.FindAsync(bvm.BillTemplateId);

                var bill = new Bill
                {
                    BillId = bvm.BillId,
                    Amount = bvm.Amount,
                    Paid = bvm.Paid,
                    BillTemplate = tempalte,
                    Month = bvm.Date.Month,
                    Year = bvm.Date.Year
                };

                bills.Add(bill);
            }

            return bills;
        }

        static IEnumerable<BillViewModel> GetViewModel(IEnumerable<Bill> bills)
        {
            List<BillViewModel> results = new();

            foreach (var b in bills)
            {
                var billViewModel = new BillViewModel
                {
                    BillId = b.BillId,
                    Amount = b.Amount > 0 ? b.Amount : b.BillTemplate.Amount,
                    Name = b.BillTemplate.Name,
                    Date = new DateTime(b.Year, b.Month, b.BillTemplate.Day),
                    Paid = b.Paid,
                    UserName = b.BillTemplate.UserName,
                    BillTemplateId = b.BillTemplate.BillTemplateId
                };

                results.Add(billViewModel);
            }

            return results.OrderBy(b => b.Date);
        }
    }
}

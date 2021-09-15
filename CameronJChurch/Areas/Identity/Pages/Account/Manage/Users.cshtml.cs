using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using CameronJChurch.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace CameronJChurch.Areas.Identity.Pages.Account.Manage
{
    public class UsersModel : PageModel
    {
        private readonly UserManager<CameronJChurchUser> _userManager;
        private readonly ILogger<UsersModel> _logger;

        public UsersModel(
            UserManager<CameronJChurchUser> userManager,
            ILogger<UsersModel> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public IList<CameronJChurchUser> Users { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            [Display(Name = "Email")]
            public string Email { get; set; }
        }

        private void Load()
        {
            var users = _userManager.Users.ToList();
            Users = users;
        }

        public void OnGet()
        {            
            Load();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = new CameronJChurchUser { UserName = Input.Email, Email = Input.Email, EmailConfirmed = true };
            _ = await _userManager.CreateAsync(user, "Password123!");
            return RedirectToPage();
        }

        public async Task<IActionResult> OnPostDeleteAsync(string userId) 
        {
            var user = await _userManager.FindByIdAsync(userId);
            _ = await _userManager.DeleteAsync(user);
            return RedirectToPage();
        }
    }
}

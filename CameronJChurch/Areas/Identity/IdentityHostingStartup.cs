using CameronJChurch.Areas.Identity.Data;
using CameronJChurch.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(CameronJChurch.Areas.Identity.IdentityHostingStartup))]
namespace CameronJChurch.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<IdentityContext>(options =>
                    options.UseSqlite(
                        context.Configuration.GetConnectionString("ApplicationContextConnection")));

                services.AddDefaultIdentity<CameronJChurchUser>(options => options.SignIn.RequireConfirmedAccount = true)
                    .AddEntityFrameworkStores<IdentityContext>();
            });
        }
    }
}
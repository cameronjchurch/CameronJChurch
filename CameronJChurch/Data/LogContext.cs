using CameronJChurch.Models;
using Microsoft.EntityFrameworkCore;

namespace CameronJChurch.Data
{
    public class LogContext : DbContext
    {
        public LogContext() { }
        public LogContext(DbContextOptions<LogContext> options) : base(options)
        { }
        public virtual DbSet<Log> Logs { get; set; }
    }
}

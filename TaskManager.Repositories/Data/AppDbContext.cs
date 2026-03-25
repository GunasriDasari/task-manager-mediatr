using Microsoft.EntityFrameworkCore;
using TaskManager.Models.Models;

namespace TaskManager.Repositories.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<TaskItem> Tasks { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using TaskManager.Repositories.Data;
using TaskManager.Models.Models;
using TaskManager.Repositories.Interfaces;

namespace TaskManager.Repositories.Implementations
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;
        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public IQueryable<TaskItem> GetAll()
        {
            return _context.Tasks.AsQueryable();
        }

        public async Task<TaskItem?> GetByIdAsync(int id)
        {
            return await _context.Tasks
                .AsNoTracking()
                .FirstOrDefaultAsync( t => t.Id == id);
        }

        public async Task<TaskItem?> GetByIdForUpdateAsync(int id)
        {
            return await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task AddAsync(TaskItem task)
        {
            await _context.Tasks.AddAsync(task);
        }

        public void Delete(TaskItem task)
        {
            _context.Tasks.Remove(task);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}

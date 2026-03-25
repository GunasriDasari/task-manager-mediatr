using TaskManager.Models.Models;

namespace TaskManager.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        IQueryable<TaskItem> GetAll();

        Task<TaskItem?> GetByIdAsync(int id);

        Task<TaskItem?> GetByIdForUpdateAsync(int id);

        Task AddAsync(TaskItem task);

        void Delete(TaskItem task);

        Task SaveChangesAsync();
    }
}

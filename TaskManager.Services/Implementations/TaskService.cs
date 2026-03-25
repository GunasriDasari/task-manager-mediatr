using Microsoft.EntityFrameworkCore;
using TaskManager.Models.DTOs;
using TaskManager.Models.Models;
using TaskManager.Repositories.Interfaces;
using TaskManager.Services.Interfaces;

namespace TaskManager.Services.Implementations
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;

        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }

        public async Task<PagedResultDto<TaskResponseDto>> GetTasksAsync(
            bool? isCompleted,
            string? search,
            string? sortBy,
            int pageNumber,
            int pageSize)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 5;

            var query = _repository.GetAll().AsNoTracking();

            //filter
            if (isCompleted.HasValue)
                query = query.Where(t => t.IsCompleted == isCompleted.Value);

            //search
            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(t =>
                t.Title.Contains(search) ||
                (t.Description != null && t.Description.Contains(search)));

            var totalCount = await query.CountAsync();

            //sorting
            query = sortBy?.ToLower() switch
            {
                "title" => query.OrderBy(t => t.Title),
                "title_desc" => query.OrderByDescending(t => t.Title),
                "status" => query.OrderBy(t => t.IsCompleted),
                "status_desc" => query.OrderByDescending(t => t.IsCompleted),
                _ => query.OrderBy(t => t.Id)
            };

            //pagination
            var tasks = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted
                })
                .ToListAsync();

            return new PagedResultDto<TaskResponseDto>
            {
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = tasks
            };
        }

        public async Task<TaskResponseDto?> GetTaskByIdAsync(int id)
        {
            var task = await _repository.GetByIdAsync(id);

            if (task == null) return null;

            return new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted
            };
        }

        public async Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto dto)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted,
            };

            await _repository.AddAsync(task);
            await _repository.SaveChangesAsync();

            return new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
            };
        }

        public async Task<bool> UpdateTaskAsync(int id, UpdateTaskDto dto)
        {
            var task = await _repository.GetByIdAsync(id);

            if (task == null) return false;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.IsCompleted = dto.IsCompleted;

            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _repository.GetByIdAsync(id);

            if (task == null) return false;

            _repository.Delete(task);
            await _repository.SaveChangesAsync();

            return true;
        }
    }
}

using TaskManager.Models.DTOs;

namespace TaskManager.Services.Interfaces
{
    public interface ITaskService
    {
        Task<PagedResultDto<TaskResponseDto>> GetTasksAsync(
            bool? isCompleted,
            string? search,
            string? sortBy,
            int pageNumber,
            int pageSize);

        Task<TaskResponseDto?> GetTaskByIdAsync(int id);

        Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto dto);

         Task<bool> UpdateTaskAsync(int id, UpdateTaskDto dto);

        Task<bool> DeleteTaskAsync(int id);

    }
}

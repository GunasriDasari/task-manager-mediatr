using MediatR;
using System.Reflection.Metadata.Ecma335;
using TaskManager.Models.DTOs;
using TaskManager.Services.Interfaces;

namespace TaskManagerApi.Features.Tasks.Queries.GetTasks
{
    
    public class GetTasksQueryHandler : IRequestHandler<GetTasksQuery, PagedResultDto<TaskResponseDto>>
    {
        private readonly ITaskService _taskService;

        public GetTasksQueryHandler(ITaskService taskService)
        {
            _taskService = taskService;
        }

        public async Task<PagedResultDto<TaskResponseDto>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
        {
            return await _taskService.GetTasksAsync(
                request.IsCompleted,
                request.Search,
                request.SortBy,
                request.PageNumber,
                request.PageSize);
        }
    }
}

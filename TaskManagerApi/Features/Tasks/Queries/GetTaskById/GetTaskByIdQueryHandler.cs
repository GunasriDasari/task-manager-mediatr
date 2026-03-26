using MediatR;
using TaskManager.Models.DTOs;
using TaskManager.Services.Interfaces;

namespace TaskManagerApi.Features.Tasks.Queries.GetTaskById
{
    public class GetTaskByIdQueryHandler : IRequestHandler<GetTaskByIdQuery, TaskResponseDto?>
    {
        private readonly ITaskService _taskService;
        public GetTaskByIdQueryHandler(ITaskService taskService)
        {
            _taskService = taskService;
        }
        public async Task<TaskResponseDto?> Handle(GetTaskByIdQuery request,  CancellationToken cancellationToken)
        {
            return await _taskService.GetTaskByIdAsync(request.Id);
        }
    }
}

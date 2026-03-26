using MediatR;
using System.Reflection;
using TaskManager.Models.DTOs;
using TaskManager.Services.Interfaces;

namespace TaskManagerApi.Features.Tasks.Commands.CreateTask
{
    public class CreateTaskCommandHandler : IRequestHandler<CreateTaskCommand, TaskResponseDto>
    {
        private readonly ITaskService _taskService;

        public CreateTaskCommandHandler(ITaskService taskService)
        {
            _taskService = taskService;
        }

        public async Task<TaskResponseDto> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
        {
            var dto = new CreateTaskDto
            {
                Title = request.Title,
                Description = request.Description,
                IsCompleted = request.IsCompleted
            };

            return await _taskService.CreateTaskAsync(dto);
        }
    }
}

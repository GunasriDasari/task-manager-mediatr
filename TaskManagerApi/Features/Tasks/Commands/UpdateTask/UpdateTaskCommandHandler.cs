using MediatR;
using TaskManager.Models.DTOs;
using TaskManager.Services.Interfaces;

namespace TaskManagerApi.Features.Tasks.Commands.UpdateTask
{
    public class UpdateTaskCommandHandler : IRequestHandler<UpdateTaskCommand, bool>
    {
        private readonly ITaskService _taskService;

        public UpdateTaskCommandHandler(ITaskService taskService)
        {
            _taskService = taskService;
        }

        public async Task<bool> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
        {
            var dto = new UpdateTaskDto
            {
                Title = request.Title,
                Description = request.Description,
                IsCompleted = request.IsCompleted
            };

            return await _taskService.UpdateTaskAsync(request.Id, dto);
        }
    }
}
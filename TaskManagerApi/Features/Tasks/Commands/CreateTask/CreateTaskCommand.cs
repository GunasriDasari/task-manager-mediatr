using MediatR;
using TaskManager.Models.DTOs;

namespace TaskManagerApi.Features.Tasks.Commands.CreateTask
{
    public class CreateTaskCommand : IRequest<TaskResponseDto>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }

        public CreateTaskCommand(string title, string description, bool isCompleted)
        {
            Title = title;
            Description = description;
            IsCompleted = isCompleted;
        }
    }
}

using MediatR;
using TaskManager.Models.DTOs;

namespace TaskManagerApi.Features.Tasks.Queries.GetTaskById
{
    public class GetTaskByIdQuery : IRequest<TaskResponseDto>
    {
        public int Id { get; set; }
        public GetTaskByIdQuery(int id)
        {
            Id = id;
        }
    }
}

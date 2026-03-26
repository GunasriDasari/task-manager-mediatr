using MediatR;
using TaskManager.Models.DTOs;

namespace TaskManagerApi.Features.Tasks.Queries.GetTasks
{
    public class GetTasksQuery : IRequest<PagedResultDto<TaskResponseDto>>
    {
        public bool? IsCompleted { get; set; }
        public string? Search {  get; set; }
        public string? SortBy { get; set; }
        public int PageNumber { get; set; } 
        public int PageSize { get; set; }

        public GetTasksQuery(
            bool? isCompleted, 
            string? search, 
            string? sortBy, 
            int pageNumber, 
            int pageSize)
        {
            IsCompleted = isCompleted;
            Search = search;
            SortBy = sortBy;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
    }
}

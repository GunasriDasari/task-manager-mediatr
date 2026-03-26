using MediatR;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Models.DTOs;
using TaskManagerApi.Features.Tasks.Queries.GetTasks;
using TaskManagerApi.Features.Tasks.Queries.GetTaskById;
using TaskManagerApi.Features.Tasks.Commands.CreateTask;
using TaskManagerApi.Features.Tasks.Commands.UpdateTask;
using TaskManagerApi.Features.Tasks.Commands.DeleteTask;

namespace TaskManagerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ILogger<TasksController> _logger;
        private readonly IMediator _mediator;
        public TasksController(ILogger<TasksController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks(bool? isCompleted, string? search, string? sortBy, int pageNumber = 1, int pageSize = 10)
        {
            var query = new GetTasksQuery(isCompleted, search, sortBy, pageNumber, pageSize);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {

            var query = new GetTaskByIdQuery(id);
            var task = await _mediator.Send(query);

            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(CreateTaskDto dto)
        {
            var command = new CreateTaskCommand(dto.Title, dto.Description, dto.IsCompleted);
            var result = await _mediator.Send(command);

            return CreatedAtAction(nameof(GetTaskById), new {id = result.Id}, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto dto)
        {
            var command = new UpdateTaskCommand(id, dto.Title, dto.Description, dto.IsCompleted);
            var updated = await _mediator.Send(command);

            if(!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var command = new DeleteTaskCommand(id);
            var deleted = await _mediator.Send(command);

            if(!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
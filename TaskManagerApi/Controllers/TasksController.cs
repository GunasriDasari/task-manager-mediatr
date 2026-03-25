using Microsoft.AspNetCore.Mvc;
using TaskManager.Services.Interfaces;
using TaskManager.Models.DTOs;

namespace TaskManagerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ILogger<TasksController> _logger;
        private readonly  ITaskService _service;
        public TasksController(ILogger<TasksController> logger, ITaskService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks(bool? isCompleted, string? search, string? sortBy, int pageNumber = 1, int pageSize = 10)
        {
            var result = await _service.GetTasksAsync(isCompleted, search, sortBy, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {

            var task = await _service.GetTaskByIdAsync(id);

            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(CreateTaskDto dto)
        {
            var result = await _service.CreateTaskAsync(dto);

            return CreatedAtAction(nameof(GetTaskById), new {id = result.Id}, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto dto)
        {
            var updated = await _service.UpdateTaskAsync(id, dto);

            if(!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var deleted = await _service.DeleteTaskAsync(id);

            if(!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
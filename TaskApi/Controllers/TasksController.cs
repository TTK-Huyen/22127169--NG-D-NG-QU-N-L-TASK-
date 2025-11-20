// Controllers/TasksController.cs
using Microsoft.AspNetCore.Mvc;
using TaskApi.Dtos;
using TaskApi.Services;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _service;

        public TasksController(ITaskService service)
        {
            _service = service;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<List<TaskDto>>> GetAll()
        {
            var tasks = await _service.GetAllAsync();
            return Ok(tasks);
        }

        // GET: api/tasks/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<TaskDto>> GetById(int id)
        {
            var task = await _service.GetByIdAsync(id);
            if (task == null)
                return NotFound();

            return Ok(task);
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskDto>> Create([FromBody] CreateTaskDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _service.CreateAsync(dto);

            // Trả về 201 + location
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT: api/tasks/5
        [HttpPut("{id:int}")]
        public async Task<ActionResult<TaskDto>> Update(int id, [FromBody] UpdateTaskDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.UpdateAsync(id, dto);
            if (updated == null)
                return NotFound();

            return Ok(updated);
        }

        // PATCH: api/tasks/5/status
        [HttpPatch("{id:int}/status")]
        public async Task<ActionResult<TaskDto>> UpdateStatus(int id, [FromBody] UpdateTaskStatusDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.UpdateStatusAsync(id, dto);
            if (updated == null)
                return NotFound();

            return Ok(updated);
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok)
                return NotFound();

            return NoContent();
        }

        // ========== CÁC API FILTER RIÊNG (nếu bạn muốn dùng DTO filter) ==========

        // POST: api/tasks/filter/title
        [HttpPost("filter/title")]
        public async Task<ActionResult<List<TaskDto>>> FilterByTitle([FromBody] TaskFilterTitleDto dto)
        {
            var result = await _service.FilterByTitleAsync(dto);
            return Ok(result);
        }

        // POST: api/tasks/filter/status
        [HttpPost("filter/status")]
        public async Task<ActionResult<List<TaskDto>>> FilterByStatus([FromBody] TaskFilterStatusDto dto)
        {
            var result = await _service.FilterByStatusAsync(dto);
            return Ok(result);
        }

        // POST: api/tasks/filter/duedate
        [HttpPost("filter/duedate")]
        public async Task<ActionResult<List<TaskDto>>> FilterByDueDate([FromBody] TaskFilterDueDateDto dto)
        {
            var result = await _service.FilterByDueDateAsync(dto);
            return Ok(result);
        }
    }
}

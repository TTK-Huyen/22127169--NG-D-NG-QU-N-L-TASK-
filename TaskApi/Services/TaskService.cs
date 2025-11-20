using System.Linq;
using System.Linq.Expressions;
using TaskApi.Dtos;
using TaskApi.Models;
using TaskApi.Repositories;

namespace TaskApi.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repo;

        public TaskService(ITaskRepository repo)
        {
            _repo = repo;
        }

        // Helper map từ entity -> DTO
        private static TaskDto ToDto(TaskItem t) =>
            new TaskDto(t.Id, t.Title, t.DueDate, t.Status);

        public async Task<List<TaskDto>> GetAllAsync()
        {
            var tasks = await _repo.GetAllAsync();
            return tasks.Select(ToDto).ToList();
        }

        public async Task<List<TaskDto>> FilterByTitleAsync(TaskFilterTitleDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
            {
                var all = await _repo.GetAllAsync();
                return all.Select(ToDto).ToList();
            }

            var result = await _repo.FindAsync(t => t.Title.Contains(dto.Title));
            return result.Select(ToDto).ToList();
        }

        public async Task<List<TaskDto>> FilterByStatusAsync(TaskFilterStatusDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Status))
            {
                var all = await _repo.GetAllAsync();
                return all.Select(ToDto).ToList();
            }

            var result = await _repo.FindAsync(t => t.Status == dto.Status);
            return result.Select(ToDto).ToList();
        }

        public async Task<List<TaskDto>> FilterByDueDateAsync(TaskFilterDueDateDto dto)
        {
            if (dto.DueDate == null)
            {
                var all = await _repo.GetAllAsync();
                return all.Select(ToDto).ToList();
            }

            // tuỳ yêu cầu, ở đây mình lọc đúng ngày DueDate
            var date = dto.DueDate.Value.Date;
            var result = await _repo.FindAsync(t => t.DueDate.HasValue && t.DueDate.Value.Date == date);
            return result.Select(ToDto).ToList();
        }

        public async Task<TaskDto?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return null;
            return ToDto(entity);
        }

        public async Task<TaskDto> CreateAsync(CreateTaskDto dto)
        {
            var entity = new TaskItem
            {
                Title = dto.Title,
                DueDate = dto.DueDate,
                Status = dto.Status ?? "Đang làm"
            };

            await _repo.AddAsync(entity);

            return ToDto(entity);
        }

        public async Task<TaskDto?> UpdateAsync(int id, UpdateTaskDto dto)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return null;

            entity.Title = dto.Title;
            entity.DueDate = dto.DueDate;

            await _repo.UpdateAsync(entity);

            return ToDto(entity);
        }

        public async Task<TaskDto?> UpdateStatusAsync(int id, UpdateTaskStatusDto dto)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return null;

            entity.Status = dto.Status;

            await _repo.UpdateAsync(entity);

            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            await _repo.RemoveAsync(entity);
            return true;
        }
    }
}

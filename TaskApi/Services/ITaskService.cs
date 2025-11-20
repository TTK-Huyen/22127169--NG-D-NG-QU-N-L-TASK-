using TaskApi.Dtos;

namespace TaskApi.Services
{
    public interface ITaskService
    {
        // Lấy tất cả task
        Task<List<TaskDto>> GetAllAsync();

        // Lọc theo tiêu chí (tuỳ bạn dùng hay không)
        Task<List<TaskDto>> FilterByTitleAsync(TaskFilterTitleDto dto);
        Task<List<TaskDto>> FilterByStatusAsync(TaskFilterStatusDto dto);
        Task<List<TaskDto>> FilterByDueDateAsync(TaskFilterDueDateDto dto);

        // Lấy chi tiết 1 task
        Task<TaskDto?> GetByIdAsync(int id);

        // Tạo mới
        Task<TaskDto> CreateAsync(CreateTaskDto dto);

        // Cập nhật thông tin (title, dueDate)
        Task<TaskDto?> UpdateAsync(int id, UpdateTaskDto dto);

        // Cập nhật trạng thái riêng
        Task<TaskDto?> UpdateStatusAsync(int id, UpdateTaskStatusDto dto);

        // Xoá
        Task<bool> DeleteAsync(int id);
    }
}

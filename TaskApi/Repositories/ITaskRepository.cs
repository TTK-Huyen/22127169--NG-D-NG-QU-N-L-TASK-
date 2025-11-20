// Repositories/ITaskRepository.cs
using TaskApi.Models;

namespace TaskApi.Repositories
{
    // Repository riêng cho TaskItem, kế thừa từ IRepository<T>
    public interface ITaskRepository : IRepository<TaskItem>
    {
        // Nếu sau này bạn cần hàm đặc biệt cho Task (lọc theo status, title, ...)
        // thì khai báo thêm ở đây, ví dụ:
        // Task<List<TaskItem>> GetByStatusAsync(string status);
    }
}

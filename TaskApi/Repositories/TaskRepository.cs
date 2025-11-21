// Task/Repositories/TaskRepository.cs
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Models;

namespace TaskApi.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _db;

        public TaskRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<TaskItem>> GetAllAsync()
        {
            return await _db.Tasks.ToListAsync();
        }

        public async Task<TaskItem?> GetByIdAsync(int id)
        {
            return await _db.Tasks.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<List<TaskItem>> FindAsync(Expression<Func<TaskItem, bool>> predicate)
        {
            return await _db.Tasks.Where(predicate).ToListAsync();
        }

        public async Task<TaskItem> AddAsync(TaskItem entity)
        {
            await _db.Tasks.AddAsync(entity);
            await _db.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(TaskItem entity)
        {
            _db.Tasks.Update(entity);
            await _db.SaveChangesAsync();
        }

        public async Task RemoveAsync(TaskItem entity)
        {
            _db.Tasks.Remove(entity);
            await _db.SaveChangesAsync();
        }

        public Task<int> SaveChangesAsync()
        {
            return _db.SaveChangesAsync();
        }
    }
}

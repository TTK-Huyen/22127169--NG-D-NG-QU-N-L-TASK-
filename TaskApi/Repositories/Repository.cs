// Task/Repositories/Repository.cs
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace TaskApi.Repositories;

public interface IRepository<T> where T : class
{
    Task<List<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate);

    Task<T> AddAsync(T entity);      // thêm mới, trả về entity đã thêm
    Task UpdateAsync(T entity);      // cập nhật
    Task RemoveAsync(T entity);      // xóa
}

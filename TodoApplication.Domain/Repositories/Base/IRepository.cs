

namespace TodoApplication.Domain.Repositories.Base
{
    public interface IRepository<T> where T : class
    {
        Task AddAsync(T enitity);
        Task UpdateAsync(T enitity);
        Task DeleteAsync(T enitity);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(long id);
    }
}

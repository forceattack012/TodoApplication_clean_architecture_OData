using Microsoft.EntityFrameworkCore;
using TodoApplication.Domain.Repositories.Base;
using TodoApplication.Infrastructure.Data;

namespace TodoApplication.Infrastructure.Repositories.Base
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly TodoContext dbContext;
        public Repository(TodoContext todoContext)
        {
            dbContext = todoContext;
        }
        public async Task AddAsync(T enitity)
        {
            await dbContext.Set<T>().AddAsync(enitity);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(T enitity)
        {
            dbContext.Set<T>().Remove(enitity);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await dbContext.Set<T>().ToListAsync();
        }

        public async Task<T> GetByIdAsync(long id)
        {
            return await dbContext.Set<T>().FindAsync(id);
        }

        public async Task UpdateAsync(T enitity)
        {
            dbContext.Entry(enitity).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }
    }
}

using TodoApplication.Domain.Entities;
using TodoApplication.Domain.Repositories.Base;

namespace TodoApplication.Domain.Repositories
{
    public interface ITodoRepository : IRepository<TodoItem>
    {
        Task<IEnumerable<TodoItem>> GetTodoItemsByTitie(string title);
    }
}

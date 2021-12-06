using Microsoft.EntityFrameworkCore;
using TodoApplication.Domain.Entities;
using TodoApplication.Domain.Repositories;
using TodoApplication.Infrastructure.Data;
using TodoApplication.Infrastructure.Repositories.Base;

namespace TodoApplication.Infrastructure.Repositories
{
    public class TodoRepository : Repository<TodoItem>, ITodoRepository
    {
        public TodoRepository(TodoContext todoContext) : base(todoContext)
        {

        }
        public async Task<IEnumerable<TodoItem>> GetTodoItemsByTitie(string title)
        {
            return await dbContext.TodoItems.Where(r => r.Title == title).ToListAsync();
        }
    }
}

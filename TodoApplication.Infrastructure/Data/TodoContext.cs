using Microsoft.EntityFrameworkCore;
using TodoApplication.Domain.Entities;

namespace TodoApplication.Infrastructure.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {

        }
        public DbSet<TodoItem> TodoItems { get; set; } = null!;
    }
}

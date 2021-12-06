using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TodoApplication.Domain.Repositories;
using TodoApplication.Domain.Repositories.Base;
using TodoApplication.Infrastructure.Data;
using TodoApplication.Infrastructure.Repositories;
using TodoApplication.Infrastructure.Repositories.Base;

namespace TodoApplication.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddDbContext<TodoContext>(opt => opt.UseInMemoryDatabase("TodoList"));
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped(typeof(ITodoRepository), typeof(TodoRepository));

            return services;
        }
    }
}

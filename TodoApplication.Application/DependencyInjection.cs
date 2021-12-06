using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using MediatR;

namespace TodoApplication.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInApplication(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}

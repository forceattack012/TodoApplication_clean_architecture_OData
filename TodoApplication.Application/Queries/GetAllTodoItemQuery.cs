using MediatR;
using TodoApplication.Application.DTOs;

namespace TodoApplication.Application.Queries
{
    public class GetAllTodoItemQuery : IRequest<IEnumerable<TodoItemDTO>>
    {
    }
}

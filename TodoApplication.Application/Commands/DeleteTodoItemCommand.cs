using MediatR;
using TodoApplication.Application.DTOs;

namespace TodoApplication.Application.Commands
{
    public class DeleteTodoItemCommand : IRequest<TodoItemDTO>
    {
        public long _id;

        public DeleteTodoItemCommand(long id) => _id = id;
    }
}

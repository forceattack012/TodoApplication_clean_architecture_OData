using MediatR;
using TodoApplication.Application.DTOs;
using TodoApplication.Application.Queries;
using TodoApplication.Domain.Repositories;

namespace TodoApplication.Application.Handlers
{
    public class GetAllTodoItemHandler : IRequestHandler<GetAllTodoItemQuery, IEnumerable<TodoItemDTO>>
    {
        private readonly ITodoRepository _todoItemRepo;

        public GetAllTodoItemHandler(ITodoRepository todoItemRepo)
        {
            _todoItemRepo = todoItemRepo;
        }
        public async Task<IEnumerable<TodoItemDTO>> Handle(GetAllTodoItemQuery request, CancellationToken cancellationToken)
        {
            var todoItems = await _todoItemRepo.GetAllAsync();
            return todoItems.Select(item => new TodoItemDTO(item));
        }
    }
}

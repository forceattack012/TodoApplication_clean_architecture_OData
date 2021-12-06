using MediatR;
using TodoApplication.Application.DTOs;
using TodoApplication.Application.Queries;
using TodoApplication.Domain.Repositories;

namespace TodoApplication.Application.Handlers
{
    public class GetTodoItemByTitleHandler : IRequestHandler<GetTodoItemByTitleQuery, IEnumerable<TodoItemDTO>>
    {
        private readonly ITodoRepository _todoItemRepo;

        public GetTodoItemByTitleHandler(ITodoRepository todoItemRepo)
        {
            _todoItemRepo = todoItemRepo;
        }

        public async Task<IEnumerable<TodoItemDTO>> Handle(GetTodoItemByTitleQuery request, CancellationToken cancellationToken)
        {
            var todoItem = await _todoItemRepo.GetTodoItemsByTitie(request.Title);
            return todoItem.Select(item => new TodoItemDTO(item));
        }
    }
}

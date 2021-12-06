using MediatR;
using TodoApplication.Application.Commands;
using TodoApplication.Application.DTOs;
using TodoApplication.Domain.Entities;
using TodoApplication.Domain.Repositories;

namespace TodoApplication.Application.Handlers
{
    public class CreateTodoItemHandler : IRequestHandler<CreateTodoItemCommand, TodoItemDTO>
    {
        private readonly ITodoRepository _todoItemRepo;

        public CreateTodoItemHandler(ITodoRepository todoItemRepo)
        {
            _todoItemRepo = todoItemRepo;
        }
        public async Task<TodoItemDTO> Handle(CreateTodoItemCommand request, CancellationToken cancellationToken)
        {
            if(request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            var newTodoItem = new TodoItem()
            {
                Title = request.Title,
                Description = request.Description,
                CreatedDate = request.CreatedDate,
                ModifyDate = request.ModifyDate,
                StartSchedule = request.StartSchedule,
                IsComplete = request.IsComplete
            };

            await _todoItemRepo.AddAsync(newTodoItem);
            return new TodoItemDTO(newTodoItem);
        }
    }
}

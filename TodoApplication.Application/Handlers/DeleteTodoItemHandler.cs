using MediatR;
using TodoApplication.Application.Commands;
using TodoApplication.Application.DTOs;
using TodoApplication.Domain.Repositories;

namespace TodoApplication.Application.Handlers
{
    public class DeleteTodoItemHandler : IRequestHandler<DeleteTodoItemCommand, TodoItemDTO>
    {
        private readonly ITodoRepository _todoItemRepo;

        public DeleteTodoItemHandler(ITodoRepository todoItemRepo)
        {
            _todoItemRepo = todoItemRepo;
        }
        public async Task<TodoItemDTO> Handle(DeleteTodoItemCommand request, CancellationToken cancellationToken)
        {
            var existingItem = await _todoItemRepo.GetByIdAsync(request._id);
            if(existingItem == null)
            {
                throw new ArgumentNullException(nameof(existingItem));
            }

            try
            {
                await _todoItemRepo.DeleteAsync(existingItem);
            }
            catch(Exception)
            {
                throw;
            }
            return new TodoItemDTO(existingItem);
        }
    }
}

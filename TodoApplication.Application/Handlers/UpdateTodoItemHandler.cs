using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApplication.Application.Commands;
using TodoApplication.Application.DTOs;
using TodoApplication.Domain.Repositories;

namespace TodoApplication.Application.Handlers
{
    public class UpdateTodoItemHandler : IRequestHandler<UpdateTodoItemCommand, TodoItemDTO>
    {
        private ITodoRepository _todoRepo;

        public UpdateTodoItemHandler(ITodoRepository todoRepo)
        {
            _todoRepo = todoRepo;
        }

        public async Task<TodoItemDTO> Handle(UpdateTodoItemCommand request, CancellationToken cancellationToken)
        {
            var id = request._id;
            var existingItem = await _todoRepo.GetByIdAsync(id);

            if (existingItem == null)
            {
                throw new ArgumentNullException(nameof(existingItem));
            }

            existingItem.StartSchedule = request.StartSchedule;
            existingItem.EndSchedule = request.EndSchedule;
            existingItem.Title = request.Title;
            existingItem.Description = request.Description;
            existingItem.IsComplete = request.IsComplete;
            existingItem.ModifyDate= request.ModifyDate;

            try
            {
                await _todoRepo.UpdateAsync(existingItem);
            }
            catch (Exception)
            {
                throw;
            }
            return new TodoItemDTO(existingItem);
        }

    }
}

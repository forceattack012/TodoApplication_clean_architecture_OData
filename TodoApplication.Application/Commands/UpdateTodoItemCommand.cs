using MediatR;
using TodoApplication.Application.DTOs;

namespace TodoApplication.Application.Commands
{
    public class UpdateTodoItemCommand : IRequest<TodoItemDTO>
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime StartSchedule { get; set; }
        public DateTime EndSchedule { get; set; }
        public DateTime? ModifyDate { get; set; }
        public bool IsComplete { get; set; }

        public long _id;
        public UpdateTodoItemCommand()
        {

        }
        public UpdateTodoItemCommand(long id) => _id = id;
    }
}

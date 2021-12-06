using MediatR;
using TodoApplication.Application.DTOs;

namespace TodoApplication.Application.Commands
{
    public class CreateTodoItemCommand : IRequest<TodoItemDTO>
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime StartSchedule { get; set; }
        public DateTime EndSchedule { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifyDate { get; set; }
        public bool IsComplete { get; set; }
    }
}

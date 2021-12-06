using TodoApplication.Domain.Entities;

namespace TodoApplication.Application.DTOs
{
    public class TodoItemDTO
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime StartSchedule { get; set; }
        public DateTime EndSchedule { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifyDate { get; set; }


        public TodoItemDTO(TodoItem todoItem) => (Id, Title, Description, StartSchedule, EndSchedule, CreatedDate, ModifyDate) =
            (todoItem.Id, todoItem.Title, todoItem.Description, todoItem.StartSchedule, todoItem.EndSchedule, todoItem.CreatedDate, todoItem.ModifyDate);
    }
}

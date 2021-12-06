
namespace TodoApplication.Domain.Entities
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime StartSchedule { get; set; }
        public DateTime EndSchedule { get; set; }
        public DateTime CreatedDate { get; set; }   
        public DateTime? ModifyDate { get; set; }
        public bool IsComplete { get; set; }
        public string? Secret { get; set; }
    }
}

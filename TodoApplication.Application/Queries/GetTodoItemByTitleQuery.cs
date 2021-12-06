using MediatR;
using TodoApplication.Application.DTOs;

namespace TodoApplication.Application.Queries
{
    public class GetTodoItemByTitleQuery : IRequest<IEnumerable<TodoItemDTO>>
    {
        public string Title { get; set; }
        public GetTodoItemByTitleQuery(string title)
        {
            Title = title;
        }
    }
}

using MediatR;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.AspNetCore.Mvc;
using TodoApplication.Application.Commands;
using TodoApplication.Application.DTOs;
using TodoApplication.Application.Queries;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing;
using Microsoft.AspNetCore.OData.Formatter;

namespace TodoApplication.API.Controllers
{
    public class TodoItemController : ODataController
    {
        private IMediator _mediator;

        public TodoItemController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [EnableQuery]
        public async Task<IEnumerable<TodoItemDTO>> Get()
        {
            var query = new GetAllTodoItemQuery();
            var result = await _mediator.Send(query);
            return result;
        }

        [EnableQuery]
        public async Task<IActionResult> Post([FromBody] CreateTodoItemCommand todoItemCommand)
        {
            var result = await _mediator.Send(todoItemCommand);
            return Created(result);
        }

        [EnableQuery]
        public async Task<IActionResult> Patch([FromODataUri] long id, [FromBody] UpdateTodoItemCommand updateTodoItemCommand)
        {
            var command = new UpdateTodoItemCommand(id);
            command.Title = updateTodoItemCommand.Title;
            command.Description = updateTodoItemCommand.Description;
            command.StartSchedule = updateTodoItemCommand.StartSchedule;
            command.EndSchedule = updateTodoItemCommand.EndSchedule;
            command.ModifyDate = updateTodoItemCommand.ModifyDate;
            command.IsComplete = updateTodoItemCommand.IsComplete;

            var result = await _mediator.Send(command);
            return Updated(result);
        }

        [HttpDelete("api/v1/todoitem/{id}")]
        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.All)]
        public async Task<IActionResult> Delete([FromODataUri] long id)
        {
            var command = new DeleteTodoItemCommand(id);

            var result = await _mediator.Send(command);
            return StatusCode(204);
        }
    }
}

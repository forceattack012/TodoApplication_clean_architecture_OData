using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using TodoApplication.Application.DTOs;

namespace TodoApplication.API.Builder
{
    public class TodoItemBuilder
    {
        public IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();
            builder.EntitySet<TodoItemDTO>("TodoItem")
                                .EntityType
                                .Filter()
                                .Select()
                                .OrderBy()
                                .Expand()
                                .Count()
                                .Page();
   
            return builder.GetEdmModel();
        }
    }
}

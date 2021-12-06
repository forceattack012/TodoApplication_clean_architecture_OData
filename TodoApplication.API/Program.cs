using MediatR;
using Microsoft.AspNetCore.OData;
using TodoApplication.API.Builder;
using TodoApplication.Application;
using TodoApplication.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddInfrastructure();
builder.Services.AddInApplication();

// OData
builder.Services.AddControllers().AddOData(opt => opt.AddRouteComponents("/api/v1", new TodoItemBuilder().GetEdmModel()));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapGet("/healthCheck", () =>
 {
     return DateTime.Now;
 });

app.MapControllers();
app.Run();

internal record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
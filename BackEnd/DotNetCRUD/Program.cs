using DotNetCRUD.Models;
using Microsoft.EntityFrameworkCore;
using Supabase;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
                      });
});

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<StudentDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DevConnection")));

builder.Services.AddHealthChecks();
var app = builder.Build();
app.MapHealthChecks("/health");

// Configure the HTTP request pipeline.

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();

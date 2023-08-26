using DotNetCRUD.Models;
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

string originURL = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins(originURL).AllowAnyHeader().AllowAnyMethod();
                      });
});

// Add services to the container.

builder.Services.AddControllers();

string dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "";
string dbConnection = $"User Id=postgres;Password={dbPassword};Server=db.shzmkoeojizdcwpsnvwc.supabase.co;Port=5432;Database=postgres;";
builder.Services.AddDbContext<StudentDBContext>(options => options.UseNpgsql(dbConnection));

builder.Services.AddHealthChecks();
var app = builder.Build();
app.MapHealthChecks("/health");

// Configure the HTTP request pipeline.

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();

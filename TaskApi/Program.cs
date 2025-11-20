// Program.cs
using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Repositories;
using TaskApi.Services;

var builder = WebApplication.CreateBuilder(args);

// ==========================
// 1. Add DbContext (MySQL)
// ==========================
var connectionString = builder.Configuration.GetConnectionString("Default");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    );
});

// ==========================
// 2. Add Repository & Service
// ==========================
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

// Nếu bạn có StudentRepository:
// builder.Services.AddScoped<IStudentRepository, StudentRepository>();
// builder.Services.AddScoped<IStudentService, StudentService>();

// ==========================
// 3. Add Controllers
// ==========================
builder.Services.AddControllers();

// ==========================
// 4. Add Swagger
// ==========================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ==========================
// 5. CORS (cho React frontend)
// ==========================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowAnyOrigin(); // Cho phép tất cả domain (DEV mode)
        });
});

var app = builder.Build();

// ==========================
// 6. Enable Swagger (DEV)
// ==========================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ==========================
// 7. Enable CORS
// ==========================
app.UseCors("AllowAll");

// ==========================
// 8. Routing
// ==========================
app.MapControllers();

app.Run();

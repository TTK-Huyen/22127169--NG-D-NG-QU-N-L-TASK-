// Dtos/TaskDtos.cs
namespace TaskApi.Dtos;
public record TaskDto
(int Id, string Title, DateTime? DueDate, string Status);


public class GetAllTaskDto
{
    public List<TaskDto> Tasks { get; set; } = new List<TaskDto>();
}

public class TaskFilterTitleDto
{
    public string? Title { get; set; }
}

public class TaskFilterDueDateDto
{
    public DateTime? DueDate { get; set; }
}

public class CreateTaskDto
{
    public string Title { get; set; } = default!;
    public DateTime? DueDate { get; set; }
    public string Status { get; set; } = "Đang làm";
}

public class TaskFilterStatusDto
{
    public string? Status { get; set; }
}

public class UpdateTaskDto
{
    public string Title { get; set; } = default!;
    public DateTime? DueDate { get; set; }
}

public class UpdateTaskStatusDto
{
    public string Status { get; set; } = default!;
}

public class DeleteTaskDto
{
    public int Id { get; set; }
}




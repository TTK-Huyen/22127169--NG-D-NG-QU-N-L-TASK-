// Model task
/*
id, title, duedate: null , status
*/
// Models/TaskItem.cs
namespace TaskApi.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public DateTime? DueDate { get; set; }
        public string Status { get; set; } = "Đang làm"; // "Đang làm" / "Hoàn thành"
    }
}
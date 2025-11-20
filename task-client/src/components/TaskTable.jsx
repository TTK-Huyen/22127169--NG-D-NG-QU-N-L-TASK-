// src/components/TaskTable.jsx

function StatusBadge({ status }) {
  return (
    <span
      className={`badge ${
        status === "Hoàn thành" ? "badge-done" : "badge-working"
      }`}
    >
      {status}
    </span>
  );
}

function TaskTable({ tasks, onToggleStatus, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-head">
          <tr>
            <th className="table-cell">Task</th>
            <th className="table-cell">Due-date</th>
            <th className="table-cell">Status</th>
            <th className="table-cell"></th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 && (
            <tr>
              <td className="table-empty" colSpan={4}>
                Chưa có task nào
              </td>
            </tr>
          )}

          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="table-cell">{task.title}</td>
              <td className="table-cell">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("vi-VN")
                  : "—"}
              </td>

              <td className="table-cell">
                <button
                  className="icon-btn"
                  type="button"
                  onClick={() => onToggleStatus(task)}
                >
                  <StatusBadge status={task.status} />
                </button>
              </td>

              <td className="table-cell" style={{ textAlign: "right" }}>
                <button
                  className="icon-btn"
                  type="button"
                  onClick={() => onEdit(task)}
                  title="Sửa"
                >
                  ✏️
                </button>
                <button
                  className="icon-btn icon-delete"
                  type="button"
                  onClick={() => onDelete(task.id)}
                  title="Xoá"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;

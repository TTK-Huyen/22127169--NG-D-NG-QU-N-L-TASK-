// src/pages/TasksList.jsx
import { useEffect, useState } from "react";
import {
  getTasks,
  deleteTask,
  updateTaskStatus,
  filterTasksByStatus,
} from "../api/tasks";
import { Link } from "react-router-dom";
import {
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiActivity,
  FiAlertTriangle,
} from "react-icons/fi";

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async (status = "Tất cả") => {
    try {
      setLoading(true);
      setError("");
      let data;
      if (status === "Tất cả") data = await getTasks();
      else data = await filterTasksByStatus(status);
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(statusFilter);
  }, [statusFilter]);

  const handleDelete = async (id) => {
    if (!confirm("Xóa task này?")) return;
    await deleteTask(id);
    await load(statusFilter);
  };

  const handleToggleStatus = async (task) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const hasDue = !!task.dueDate;
    const due = hasDue ? new Date(task.dueDate) : null;
    if (due) due.setHours(0, 0, 0, 0);

    const isOverdue =
      hasDue && due < today && task.status !== "Hoàn thành";

    let newStatus;

    if (isOverdue) {
      // Quá hạn -> click để chuyển sang Hoàn thành
      newStatus = "Hoàn thành";
    } else {
      newStatus =
        task.status === "Hoàn thành" ? "Đang làm" : "Hoàn thành";
    }

    await updateTaskStatus(task.id, newStatus);
    await load(statusFilter);
  };

  // Lọc theo nội dung task
  const displayTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Helper xác định hiển thị trạng thái + màu
  const getStatusInfo = (task) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const hasDue = !!task.dueDate;
    const due = hasDue ? new Date(task.dueDate) : null;
    if (due) due.setHours(0, 0, 0, 0);

    const isOverdue =
      hasDue && due < today && task.status !== "Hoàn thành";

    if (isOverdue) {
      return {
        label: "Quá hạn",
        style: "bg-amber-500 hover:bg-amber-600",
      };
    }

    if (task.status === "Hoàn thành") {
      return {
        label: "Hoàn thành",
        style: "bg-emerald-500 hover:bg-emerald-600",
      };
    }

    return {
      label: "Đang làm",
      style: "bg-sky-500 hover:bg-sky-600",
    };
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Màn hình quản lý task cá nhân
          </h2>
          <p className="text-xs text-slate-500">
            Quản lý công việc theo trạng thái: đang làm, quá hạn, hoàn thành
          </p>
        </div>

        <select
          className="px-3 py-2 rounded-full border border-slate-200 text-sm bg-white shadow-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Đang làm">Đang làm</option>
          <option value="Hoàn thành">Hoàn thành</option>
        </select>
      </div>

      {/* Search + Add */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Task"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 min-w-[160px] px-3 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
        />

        <Link
          to="/tasks/new"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition"
        >
          Add
        </Link>
      </div>

      {error && (
        <div className="text-sm text-rose-600 bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Task</th>
              <th className="px-4 py-3 text-left">Due-date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-slate-400"
                >
                  Đang tải dữ liệu...
                </td>
              </tr>
            )}

            {!loading && displayTasks.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-slate-400"
                >
                  Không có task nào phù hợp
                </td>
              </tr>
            )}

            {displayTasks.map((t) => {
              const statusInfo = getStatusInfo(t);

              return (
                <tr
                  key={t.id}
                  className="border-t border-slate-100 hover:bg-slate-50/70 transition"
                >
                  <td className="px-4 py-3 text-slate-800">{t.title}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {t.dueDate
                      ? new Date(t.dueDate).toLocaleDateString("vi-VN")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleStatus(t)}
                      className={`inline-flex items-center gap-1 min-w-[130px] justify-center px-3 py-1 rounded-full text-xs font-semibold text-white transition ${statusInfo.style}`}
                    >
                      {statusInfo.label === "Đang làm" && (
                        <FiActivity size={14} />
                      )}
                      {statusInfo.label === "Hoàn thành" && (
                        <FiCheckCircle size={14} />
                      )}
                      {statusInfo.label === "Quá hạn" && (
                        <FiAlertTriangle size={14} />
                      )}
                      {statusInfo.label}
                    </button>
                  </td>

                  <td className="px-4 py-3 text-right space-x-2">
                    {statusInfo.label === "Quá hạn" && (
                      <>
                        <Link
                          to={`/tasks/${t.id}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100"
                          title="Sửa"
                        >
                          <FiEdit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-rose-300 text-rose-600 hover:bg-rose-50"
                          title="Xóa"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </>
                    )}

                    {statusInfo.label === "Đang làm" && (
                      <Link
                        to={`/tasks/${t.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100"
                        title="Sửa"
                      >
                        <FiEdit size={16} />
                      </Link>
                    )}

                    {statusInfo.label === "Hoàn thành" && (
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-rose-300 text-rose-600 hover:bg-rose-50"
                        title="Xóa"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

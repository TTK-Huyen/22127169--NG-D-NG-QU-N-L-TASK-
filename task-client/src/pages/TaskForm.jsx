// src/pages/TaskForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTask,
  createTask,
  updateTask,
  updateTaskStatus,
} from "../api/tasks";

export default function TaskForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const nav = useNavigate();

  const [task, setTask] = useState({
    title: "",
    dueDate: "",
    status: "Đang làm",
  });
  const [originalStatus, setOriginalStatus] = useState(null); // lưu status ban đầu khi load
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  // Load dữ liệu khi vào trang /tasks/:id (ấn icon sửa)
  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          setLoading(true);
          const data = await getTask(id); // GET /api/tasks/{id}

          setTask({
            title: data.title,
            dueDate: data.dueDate
              ? new Date(data.dueDate).toISOString().slice(0, 10)
              : "",
            status: data.status,
          });

          setOriginalStatus(data.status);
        } catch (err) {
          console.error(err);
          setError("Không tải được thông tin task");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, isEdit]);

  const handleChange = (field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const validateDueDate = () => {
    if (!task.dueDate) return true; // cho phép để trống

    const selected = new Date(task.dueDate);
    selected.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // chỉ cho hôm nay hoặc tương lai
    return selected >= today;
  };

  // Hàm LƯU: dùng cho cả thêm mới và cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!task.title.trim()) {
      setError("Vui lòng nhập tên task");
      return;
    }

    if (!validateDueDate()) {
      setError("Ngày hết hạn phải là hôm nay hoặc tương lai");
      return;
    }

    // Data sau khi user đã chỉnh sửa
    const payload = {
      title: task.title.trim(),
      dueDate: task.dueDate ? task.dueDate + "T00:00:00" : null,
      status: task.status,
    };

    try {
      if (isEdit) {
        // 1. Cập nhật title + dueDate
        await updateTask(id, payload); // PUT /api/tasks/{id}

        // 2. Nếu status thay đổi so với ban đầu -> gọi thêm PATCH /status
        if (originalStatus !== null && task.status !== originalStatus) {
          await updateTaskStatus(id, task.status); // PATCH /api/tasks/{id}/status
        }
      } else {
        // Thêm mới
        await createTask(payload); // POST /api/tasks
      }

      // Quay lại màn danh sách
      nav("/tasks");
    } catch (err) {
      console.error(err);
      setError("Lưu task thất bại");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-4 text-slate-800 text-center">
          {isEdit ? "Cập nhật task" : "Thêm task mới"}
        </h2>

        {loading ? (
          <p className="text-sm text-slate-500 text-center">Đang tải...</p>
        ) : (
          <>
            {error && (
              <div className="mb-3 text-sm text-rose-600 bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl">
                {error}
              </div>
            )}

            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tên task
            </label>
            <input
              className="w-full mb-3 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={task.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            <label className="block text-sm font-medium text-slate-700 mb-1">
              Ngày hết hạn
            </label>
            <input
              type="date"
              className="w-full mb-3 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={task.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />

            <label className="block text-sm font-medium text-slate-700 mb-1">
              Trạng thái
            </label>
            <select
              className="w-full mb-4 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
              value={task.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="Đang làm">Đang làm</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>

            <div className="flex gap-3 justify-center">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={() => nav("/tasks")}
                className="px-5 py-2 rounded-full bg-slate-200 text-sm text-slate-700 hover:bg-slate-300"
              >
                Hủy
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

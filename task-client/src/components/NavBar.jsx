// src/components/NavBar.jsx
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname } = useLocation();

  const itemClass = (to) =>
    `px-3 py-2 rounded-full text-sm font-medium transition ${
      pathname.startsWith(to)
        ? "bg-blue-600 text-white shadow-sm"
        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
    }`;

  return (
    <nav className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
          T
        </div>
        <div>
          <h3 className="font-semibold text-lg text-slate-800">
            Task Manager
          </h3>
          <p className="text-xs text-slate-500">22127169 - Demo Web API + React</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link to="/tasks" className={itemClass("/tasks")}>
          Danh sách
        </Link>
        <Link to="/tasks/new" className={itemClass("/tasks/new")}>
          Thêm task
        </Link>
      </div>
    </nav>
  );
}

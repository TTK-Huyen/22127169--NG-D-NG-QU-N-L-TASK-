// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import TasksList from "./pages/TasksList";
import TaskForm from "./pages/TaskForm";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-sky-100 via-slate-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" />} />
            <Route path="/tasks" element={<TasksList />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/tasks/:id" element={<TaskForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

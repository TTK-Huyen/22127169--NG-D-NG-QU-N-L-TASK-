// src/api/tasks.js
import api from "./client";

// GET: /api/tasks
export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

// GET: /api/tasks/{id}
export const getTask = async (id) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};

// POST: /api/tasks
export const createTask = async (payload) => {
  const res = await api.post("/tasks", payload);
  return res.data;
};

// PUT: /api/tasks/{id}
export const updateTask = async (id, payload) => {
  const res = await api.put(`/tasks/${id}`, payload);
  return res.data;
};

// PATCH: /api/tasks/{id}/status
export const updateTaskStatus = async (id, status) => {
  const res = await api.patch(`/tasks/${id}/status`, { status });
  return res.data;
};

// DELETE: /api/tasks/{id}
export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

// POST: /api/tasks/filter/status
export const filterTasksByStatus = async (status) => {
  const res = await api.post("/tasks/filter/status", { status });
  return res.data;
};

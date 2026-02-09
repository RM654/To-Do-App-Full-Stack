import axios from "axios";

const API_BASE = "/api";

export async function fetchTasks() {
  const resp = await axios.get(`${API_BASE}/tasks`);
  return resp.data;
}

export async function createTask(title, description) {
  const resp = await axios.post(`${API_BASE}/tasks`, { title, description });
  return resp.data;
}

export async function markDone(taskId) {
  const resp = await axios.post(`${API_BASE}/tasks/${taskId}/done`);
  return resp.data;
}

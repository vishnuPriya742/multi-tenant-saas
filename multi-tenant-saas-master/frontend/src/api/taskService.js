import api from "./api";

export const getTasks = (projectId) =>
  api.get(`/projects/${projectId}/tasks`);

export const createTask = (projectId, data) =>
  api.post(`/projects/${projectId}/tasks`, data);

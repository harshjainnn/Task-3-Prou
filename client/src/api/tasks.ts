import { apiClient } from './client';
import { Task, Employee, DashboardStats } from './types';

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await apiClient.get('/employees');
  return response.data;
};

export const fetchTasks = async (employeeId?: number, status?: string): Promise<Task[]> => {
  const params: any = {};
  if (employeeId) params.employeeId = employeeId;
  if (status) params.status = status;
  
  const response = await apiClient.get('/tasks', { params });
  return response.data;
};

export const createTask = async (task: {
  title: string;
  status: string;
  employeeId: number;
}): Promise<Task> => {
  const response = await apiClient.post('/tasks', task);
  return response.data;
};

export const updateTask = async (
  id: number,
  updates: { status?: string; title?: string; employeeId?: number }
): Promise<Task> => {
  const response = await apiClient.put(`/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};

export const fetchDashboard = async (): Promise<DashboardStats> => {
  const response = await apiClient.get('/dashboard');
  return response.data;
};
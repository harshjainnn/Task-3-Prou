export interface Employee {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  employeeId: number;
  employee: Employee;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
}


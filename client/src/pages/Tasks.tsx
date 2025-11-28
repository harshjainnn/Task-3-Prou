import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTasks, fetchEmployees } from '../api/tasks';
import TaskList from '../components/TaskList';
import TaskFilters from '../components/TaskFilters';

export default function Tasks() {
  const [selectedEmployee, setSelectedEmployee] = useState<number | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });

  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks', selectedEmployee, selectedStatus],
    queryFn: () => fetchTasks(selectedEmployee, selectedStatus),
  });

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
        <p className="mt-1 text-sm text-gray-500">View and manage all tasks</p>
      </div>

      {employees && (
        <TaskFilters
          employees={employees}
          selectedEmployee={selectedEmployee}
          selectedStatus={selectedStatus}
          onEmployeeChange={setSelectedEmployee}
          onStatusChange={setSelectedStatus}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading tasks...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error loading tasks</div>
        </div>
      ) : (
        tasks && <TaskList tasks={tasks} />
      )}
    </div>
  );
}


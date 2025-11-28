import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, createTask } from '../api/tasks';
import CreateTaskForm from '../components/CreateTaskForm';

export default function CreateTask() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: employees, isLoading: employeesLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      navigate('/tasks');
    },
  });

  if (employeesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create New Task</h2>
        <p className="mt-1 text-sm text-gray-500">Add a new task to the tracker</p>
      </div>

      {employees && (
        <CreateTaskForm
          employees={employees}
          onSubmit={(task) => mutation.mutate(task)}
          isLoading={mutation.isPending}
        />
      )}
    </div>
  );
}


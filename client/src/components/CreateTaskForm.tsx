import { useState } from 'react';
import { Employee } from '../api/types';

interface Props {
  employees: Employee[];
  onSubmit: (task: { title: string; status: string; employeeId: number }) => void;
  isLoading: boolean;
}

export default function CreateTaskForm({ employees, onSubmit, isLoading }: Props) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending');
  const [employeeId, setEmployeeId] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && employeeId) {
      onSubmit({
        title,
        status,
        employeeId: typeof employeeId === 'number' ? employeeId : parseInt(employeeId as string),
      });
      setTitle('');
      setStatus('pending');
      setEmployeeId('');
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter task title"
              />
            </div>
          </div>

          <div>
            <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
              Assign to Employee
            </label>
            <div className="mt-1">
              <select
                id="employee"
                required
                value={employeeId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEmployeeId(e.target.value ? parseInt(e.target.value) : '')}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Select an employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="mt-1">
              <select
                id="status"
                value={status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !title || !employeeId}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


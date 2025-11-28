import { Employee } from '../api/types';

interface Props {
  employees: Employee[];
  selectedEmployee: number | undefined;
  selectedStatus: string | undefined;
  onEmployeeChange: (employeeId: number | undefined) => void;
  onStatusChange: (status: string | undefined) => void;
}

export default function TaskFilters({
  employees,
  selectedEmployee,
  selectedStatus,
  onEmployeeChange,
  onStatusChange,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="employee-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Employee
          </label>
          <select
            id="employee-filter"
            value={selectedEmployee || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onEmployeeChange(e.target.value ? parseInt(e.target.value) : undefined)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">All Employees</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="status-filter"
            value={selectedStatus || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onStatusChange(e.target.value || undefined)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}


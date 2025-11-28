import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '../api/tasks';
import DashboardStats from '../components/DashboardStats';

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    console.error('Dashboard error:', error);
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="text-red-500 font-semibold">Error loading dashboard</div>
        <div className="text-sm text-gray-600 text-center max-w-md px-4">
          {error instanceof Error ? error.message : 'Failed to connect to backend'}
          <br />
          <span className="text-xs mt-2 block">
            Make sure the backend server is running on http://localhost:4000
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500">Overview of task completion</p>
      </div>
      {data && <DashboardStats stats={data} />}
    </div>
  );
}


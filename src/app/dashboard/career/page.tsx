'use client';

import Navigation from '@/components/Navigation';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CareerDashboard() {
  // Sample data- in real app this would come from Firebase
  const skillsProgressData = {
    labels: ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'AWS'],
    datasets: [
      {
        label: 'Skill Level (1-10)',
        data: [8, 9, 7, 6, 8, 5],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };

  const codingHoursData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Coding Hours',
        data: [4, 3, 5, 6, 4, 2, 1],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const incomeProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Income ($)',
        data: [5000, 5200, 5500, 5800, 6000, 6200],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <>
      <Navigation />
      <div className="lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Career & Money Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track your professional development, skills, and financial progress
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        💰
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Monthly Income
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          $6,200
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        💻
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Coding Hours (Week)
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          25h
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        📈
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Projects Completed
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          12
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        🎯
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Goal Progress
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          82%
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Skills Progress */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Technical Skills Assessment
                </h3>
                <div className="h-64">
                  <Bar data={skillsProgressData} options={chartOptions} />
                </div>
              </div>

              {/* Coding Hours */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Weekly Coding Hours
                </h3>
                <div className="h-64">
                  <Line data={codingHoursData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Income Progress */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Income Growth
              </h3>
              <div className="h-64">
                <Line data={incomeProgressData} options={chartOptions} />
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recent Career Activities
                </h3>
                <div className="space-y-4">
                  {[
                    { 
                      date: '2024-06-14', 
                      type: 'Project', 
                      title: 'Life Tracking App',
                      status: 'In Progress',
                      notes: 'Building fullstack dashboard application'
                    },
                    { 
                      date: '2024-06-13', 
                      type: 'Learning', 
                      title: 'Advanced React Patterns',
                      status: 'Completed',
                      notes: 'Studied compound components and render props'
                    },
                    { 
                      date: '2024-06-12', 
                      type: 'Networking', 
                      title: 'Tech Meetup',
                      status: 'Attended',
                      notes: 'Met with local developers, discussed AI trends'
                    },
                    { 
                      date: '2024-06-11', 
                      type: 'Skill Building', 
                      title: 'AWS Certification Study',
                      status: 'Ongoing',
                      notes: 'Preparing for Solutions Architect exam'
                    },
                  ].map((activity, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                          <span className="text-xs text-gray-500">{activity.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {activity.type}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            activity.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            activity.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{activity.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

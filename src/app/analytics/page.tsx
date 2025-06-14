'use client';

import Navigation from '@/components/Navigation';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics() {
  // Sample comprehensive analytics data
  const overallProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Fitness',
        data: [70, 75, 80, 85],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Career',
        data: [60, 65, 70, 82],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Relationships',
        data: [75, 80, 78, 88],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Personal',
        data: [65, 70, 72, 78],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const activityCompletionData = {
    labels: ['Completed', 'Partially Completed', 'Missed'],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const timeAllocationData = {
    labels: ['Fitness', 'Career', 'Relationships', 'Personal', 'Health'],
    datasets: [
      {
        label: 'Hours per Week',
        data: [12, 25, 8, 5, 3],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
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
                Analytics & Insights
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Comprehensive analysis of your progress across all life areas
              </p>
            </div>

            {/* Overall Score Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-gradient-to-r from-green-400 to-green-600 overflow-hidden shadow rounded-lg">
                <div className="p-5 text-white">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                        💪
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-green-100 truncate">
                          Fitness Score
                        </dt>
                        <dd className="text-lg font-bold">
                          85/100
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden shadow rounded-lg">
                <div className="p-5 text-white">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                        💼
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-blue-100 truncate">
                          Career Score
                        </dt>
                        <dd className="text-lg font-bold">
                          82/100
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-400 to-pink-600 overflow-hidden shadow rounded-lg">
                <div className="p-5 text-white">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                        💕
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-pink-100 truncate">
                          Relationships Score
                        </dt>
                        <dd className="text-lg font-bold">
                          88/100
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-400 to-purple-600 overflow-hidden shadow rounded-lg">
                <div className="p-5 text-white">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                        🎯
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-purple-100 truncate">
                          Overall Score
                        </dt>
                        <dd className="text-lg font-bold">
                          83/100
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Overall Progress Trends */}
              <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Life Areas Progress Trends
                </h3>
                <div className="h-80">
                  <Line data={overallProgressData} options={chartOptions} />
                </div>
              </div>

              {/* Activity Completion Rate */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Activity Completion Rate
                </h3>
                <div className="h-64">
                  <Doughnut data={activityCompletionData} options={chartOptions} />
                </div>
              </div>

              {/* Time Allocation */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Weekly Time Allocation
                </h3>
                <div className="h-64">
                  <Bar data={timeAllocationData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Insights and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Key Insights */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Key Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Consistent Fitness Progress</p>
                        <p className="text-sm text-gray-500">Your fitness activities show steady improvement over the past month.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Career Acceleration</p>
                        <p className="text-sm text-gray-500">Your coding hours and skill development are trending upward.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Strong Social Connections</p>
                        <p className="text-sm text-gray-500">Your relationship satisfaction scores are above average.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Time Balance Opportunity</p>
                        <p className="text-sm text-gray-500">Consider allocating more time to personal development activities.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Recommendations
                  </h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-400 pl-4">
                      <p className="text-sm font-medium text-gray-900">Maintain Boxing Training</p>
                      <p className="text-sm text-gray-500">Your current training schedule is optimal. Keep up the great work!</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <p className="text-sm font-medium text-gray-900">Increase Coding Practice</p>
                      <p className="text-sm text-gray-500">Consider adding 30 minutes more daily coding to accelerate skill growth.</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <p className="text-sm font-medium text-gray-900">Schedule Regular Breaks</p>
                      <p className="text-sm text-gray-500">Add meditation or relaxation activities to improve overall balance.</p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <p className="text-sm font-medium text-gray-900">Weekend Social Planning</p>
                      <p className="text-sm text-gray-500">Plan more weekend activities with friends and family.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

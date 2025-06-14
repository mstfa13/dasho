'use client';

import Navigation from '@/components/Navigation';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function RelationshipsDashboard() {
  // Sample data- in real app this would come from Firebase
  const socialInteractionsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Social Interactions',
        data: [3, 2, 4, 5, 3, 8, 6],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Quality Time (hours)',
        data: [1, 0.5, 2, 3, 1.5, 5, 4],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const relationshipTypesData = {
    labels: ['Family', 'Close Friends', 'Dating', 'Colleagues', 'Acquaintances'],
    datasets: [
      {
        data: [25, 20, 15, 25, 15],
        backgroundColor: [
          'rgba(236, 72, 153, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(244, 63, 94, 0.8)',
          'rgba(139, 69, 19, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const moodProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Happiness Level (1-10)',
        data: [7, 8, 6, 9],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Relationship Satisfaction (1-10)',
        data: [8, 7, 8, 9],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
                Relationships & Dating Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track your social connections, dating progress, and relationship satisfaction
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        💕
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Relationship Status
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Dating
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
                        👥
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Close Friends
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          8
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
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        😊
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Happiness Level
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          9/10
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
                        📅
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Dates This Month
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          6
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Social Interactions */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Weekly Social Activity
                </h3>
                <div className="h-64">
                  <Line data={socialInteractionsData} options={chartOptions} />
                </div>
              </div>

              {/* Relationship Types */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Relationship Distribution
                </h3>
                <div className="h-64">
                  <Doughnut data={relationshipTypesData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Mood & Satisfaction Progress */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Mood & Relationship Satisfaction
              </h3>
              <div className="h-64">
                <Line data={moodProgressData} options={chartOptions} />
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recent Relationship Activities
                </h3>
                <div className="space-y-4">
                  {[
                    { 
                      date: '2024-06-14', 
                      type: 'Date', 
                      person: 'Sarah',
                      activity: 'Dinner at Italian restaurant',
                      rating: 9,
                      notes: 'Great conversation, really clicked'
                    },
                    { 
                      date: '2024-06-13', 
                      type: 'Friends', 
                      person: 'Mark & Lisa',
                      activity: 'Movie night at home',
                      rating: 8,
                      notes: 'Watched thriller, ordered pizza'
                    },
                    { 
                      date: '2024-06-12', 
                      type: 'Family', 
                      person: 'Parents',
                      activity: 'Sunday lunch',
                      rating: 9,
                      notes: 'Caught up on life, mom made my favorite dish'
                    },
                    { 
                      date: '2024-06-11', 
                      type: 'Date', 
                      person: 'Emma',
                      activity: 'Coffee date',
                      rating: 6,
                      notes: 'Nice chat but no romantic connection'
                    },
                  ].map((activity, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">{activity.activity}</span>
                          <span className="text-xs text-gray-500">{activity.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {activity.type}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {activity.person}
                          </span>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-1">Rating:</span>
                            <span className="text-sm font-medium text-yellow-600">{activity.rating}/10</span>
                          </div>
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

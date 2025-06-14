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

export default function BoxingDashboard() {
  // Sample data - in real app this would come from Firebase
  const trainingData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Training Hours',
        data: [2, 1.5, 0, 2.5, 1, 3, 0],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const skillsData = {
    labels: ['Punching Power', 'Defense', 'Footwork', 'Stamina', 'Technique'],
    datasets: [
      {
        data: [85, 78, 82, 90, 75],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 101, 101, 0.8)',
          'rgba(248, 113, 113, 0.8)',
          'rgba(252, 129, 129, 0.8)',
          'rgba(254, 147, 147, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const fightStatsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Wins',
        data: [2, 1, 3, 2, 1, 2],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Losses',
        data: [0, 1, 0, 0, 1, 0],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
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
                Boxing Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track your boxing training, fights, and skill development
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        🥊
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Fights
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          13
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
                        🏆
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Wins
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          11
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
                        💪
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Punching Power
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          85/100
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
                        ⏱️
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Training Hours (Week)
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          12.5h
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Training Progress */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Weekly Training Hours
                </h3>
                <div className="h-64">
                  <Line data={trainingData} options={chartOptions} />
                </div>
              </div>

              {/* Skills Radar */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Skill Assessment
                </h3>
                <div className="h-64">
                  <Doughnut data={skillsData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Fight Statistics */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Fight Statistics
              </h3>
              <div className="h-64">
                <Bar data={fightStatsData} options={chartOptions} />
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recent Training Sessions
                </h3>
                <div className="space-y-4">
                  {[
                    { date: '2024-06-14', type: 'Sparring', duration: '2.5h', notes: 'Great footwork session' },
                    { date: '2024-06-13', type: 'Heavy Bag', duration: '1h', notes: 'Focused on power punches' },
                    { date: '2024-06-12', type: 'Technique', duration: '1.5h', notes: 'Defense drills' },
                    { date: '2024-06-11', type: 'Cardio', duration: '1h', notes: 'Running and rope work' },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">{session.type}</span>
                          <span className="text-xs text-gray-500">{session.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{session.notes}</p>
                      </div>
                      <span className="text-sm font-medium text-indigo-600">{session.duration}</span>
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

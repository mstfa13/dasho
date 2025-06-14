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

export default function GymDashboard() {
  // Sample data- in real app this would come from Firebase
  const weightProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Body Weight (kg)',
        data: [78, 77.5, 77, 76.8, 76.5, 76.2],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Muscle Mass (kg)',
        data: [65, 65.5, 66, 66.2, 66.5, 67],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const workoutFrequencyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Workouts per Week',
        data: [4, 5, 3, 6],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  };

  const strengthProgressData = {
    labels: ['Bench Press', 'Squat', 'Deadlift', 'Overhead Press'],
    datasets: [
      {
        label: 'Current Max (kg)',
        data: [85, 120, 140, 55],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
      {
        label: 'Goal (kg)',
        data: [100, 140, 160, 70],
        backgroundColor: 'rgba(99, 102, 241, 0.4)',
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
                Gym Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track your fitness journey, workouts, and strength progress
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        📊
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Current Weight
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          76.2 kg
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
                        💪
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Muscle Mass
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          67 kg
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
                        🏋️
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Workouts This Week
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          4/6
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
                          73%
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Weight Progress */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Weight & Muscle Progress
                </h3>
                <div className="h-64">
                  <Line data={weightProgressData} options={chartOptions} />
                </div>
              </div>

              {/* Workout Frequency */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Weekly Workout Frequency
                </h3>
                <div className="h-64">
                  <Bar data={workoutFrequencyData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Strength Progress */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Strength Progress vs Goals
              </h3>
              <div className="h-64">
                <Bar data={strengthProgressData} options={chartOptions} />
              </div>
            </div>

            {/* Recent Workouts */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recent Workouts
                </h3>
                <div className="space-y-4">
                  {[
                    { 
                      date: '2024-06-14', 
                      type: 'Upper Body', 
                      duration: '1h 30m', 
                      exercises: ['Bench Press', 'Pull-ups', 'Shoulder Press'],
                      notes: 'New PR on bench press!'
                    },
                    { 
                      date: '2024-06-13', 
                      type: 'Lower Body', 
                      duration: '1h 15m', 
                      exercises: ['Squats', 'Deadlifts', 'Leg Press'],
                      notes: 'Focused on form and control'
                    },
                    { 
                      date: '2024-06-12', 
                      type: 'Cardio', 
                      duration: '45m', 
                      exercises: ['Treadmill', 'Cycling', 'Rowing'],
                      notes: 'High intensity interval training'
                    },
                    { 
                      date: '2024-06-11', 
                      type: 'Full Body', 
                      duration: '1h 45m', 
                      exercises: ['Compound movements', 'Circuit training'],
                      notes: 'Great overall session'
                    },
                  ].map((workout, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">{workout.type}</span>
                          <span className="text-xs text-gray-500">{workout.date}</span>
                        </div>
                        <span className="text-sm font-medium text-indigo-600">{workout.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {workout.exercises.map((exercise, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {exercise}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{workout.notes}</p>
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

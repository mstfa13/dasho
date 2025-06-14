'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import Navigation from '@/components/Navigation';
import { ChartBarIcon, CalendarIcon, PlusIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [stats, setStats] = useState({
    todayCompleted: 0,
    todayTotal: 8,
    weeklyProgress: 68,
    totalActivities: 0
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!user) return;

    // Calculate real stats from localStorage
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `dasho-activities-${user.id}-${today}`;
    const todayData = localStorage.getItem(storageKey);
    
    let todayCompleted = 0;
    let todayTotal = 8;
    
    if (todayData) {
      try {
        const parsed = JSON.parse(todayData);
        todayCompleted = parsed.activities.filter((a: { completed: boolean }) => a.completed).length;
        todayTotal = parsed.activities.length;
      } catch (error) {
        console.error('Error parsing today data:', error);
      }
    }
    
    // Calculate total activities from all dates
    let totalActivities = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`dasho-activities-${user.id}-`)) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data.activities) {
            totalActivities += data.activities.filter((a: { completed: boolean }) => a.completed).length;
          }
        } catch (error) {
          console.error('Error parsing activity data:', error);
        }
      }
    }
    
    const weeklyProgress = todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0;
    
    setStats({
      todayCompleted,
      todayTotal,
      weeklyProgress,
      totalActivities
    });
  }, [user]);

  if (!isClient || loading) {
    return null;
  }

  return (
    <div className="lg:pl-72">
      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Welcome back, {user?.displayName || 'User'}!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your daily activities and monitor your progress across different areas of life.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Today&apos;s Activities
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.todayCompleted} / {stats.todayTotal}
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
                    <ChartBarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Weekly Progress
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.weeklyProgress}%
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
                    <PlusIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Activities
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.totalActivities}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <a
                  href="/daily-log"
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 border border-gray-200 rounded-lg hover:border-gray-300"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                      <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Log Today&apos;s Activities
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Track your daily progress
                    </p>
                  </div>
                </a>

                <a
                  href="/dashboard/boxing"
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 border border-gray-200 rounded-lg hover:border-gray-300"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-red-50 text-red-700 ring-4 ring-white">
                      🥊
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Boxing Dashboard
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      View your boxing progress
                    </p>
                  </div>
                </a>

                <a
                  href="/dashboard/gym"
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 border border-gray-200 rounded-lg hover:border-gray-300"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                      💪
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Gym Dashboard
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Track your fitness journey
                    </p>
                  </div>
                </a>

                <a
                  href="/analytics"
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 border border-gray-200 rounded-lg hover:border-gray-300"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                      <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Analytics
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      View detailed analytics
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <>
      <Navigation />
      <Dashboard />
    </>
  );
}

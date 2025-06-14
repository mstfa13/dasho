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
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
              <h1 className="text-3xl font-bold sm:text-4xl">
                Welcome back, {user?.displayName || 'User'}! 👋
              </h1>
              <p className="mt-2 text-indigo-100 text-lg">
                Ready to track your progress and achieve your goals today?
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                    <CalendarIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Today&apos;s Activities
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {stats.todayCompleted} / {stats.todayTotal}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium text-green-600">
                    {Math.round((stats.todayCompleted / stats.todayTotal) * 100)}% Complete
                  </span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                    <ChartBarIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Weekly Progress
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {stats.weeklyProgress}%
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stats.weeklyProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                    <PlusIcon className="h-6 w-6 text-purple-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Activities
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {stats.totalActivities}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-purple-600 font-medium">All time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow-xl rounded-2xl ring-1 ring-gray-900/5">
            <div className="px-6 py-8 sm:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <a
                  href="/daily-log"
                  className="group relative flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 text-center hover:from-indigo-100 hover:to-indigo-200 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 mb-3 group-hover:bg-indigo-700 transition-colors">
                    <PlusIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-medium text-gray-900">
                    Log Today&apos;s Activities
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Track your daily progress
                  </p>
                </a>

                <a
                  href="/dashboard/boxing"
                  className="group relative flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-red-100 p-6 text-center hover:from-red-100 hover:to-red-200 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 mb-3 group-hover:bg-red-700 transition-colors text-white text-xl">
                    🥊
                  </div>
                  <h3 className="text-base font-medium text-gray-900">
                    Boxing Dashboard
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    View your boxing progress
                  </p>
                </a>

                <a
                  href="/dashboard/gym"
                  className="group relative flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-center hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 mb-3 group-hover:bg-green-700 transition-colors text-white text-xl">
                    💪
                  </div>
                  <h3 className="text-base font-medium text-gray-900">
                    Gym Dashboard
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Track your fitness journey
                  </p>
                </a>

                <a
                  href="/analytics"
                  className="group relative flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 mb-3 group-hover:bg-purple-700 transition-colors">
                    <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-medium text-gray-900">
                    Analytics
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    View detailed analytics
                  </p>
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

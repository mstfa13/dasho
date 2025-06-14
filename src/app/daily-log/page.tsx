'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import { DEFAULT_ACTIVITIES } from '@/types';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface ActivityLog {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  value?: number;
  unit?: string;
  notes?: string;
}

export default function DailyLog() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showActivities, setShowActivities] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calendar helper functions
  const generateCalendarDays = () => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const days = [];
    
    // Add empty cells for days before month starts
    const startDay = start.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= end.getDate(); day++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }
    
    return days;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getActivityData = (date: Date) => {
    if (!user) return { completed: 0, total: 8 };
    
    const dateKey = formatDateKey(date);
    const storageKey = `dasho-activities-${user.id}-${dateKey}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const completed = parsed.activities.filter((a: { completed: boolean }) => a.completed).length;
        return { completed, total: parsed.activities.length };
      } catch {
        return { completed: 0, total: 8 };
      }
    }
    return { completed: 0, total: 8 };
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };
  useEffect(() => {
    // Initialize with default activities
    const todayActivities = DEFAULT_ACTIVITIES.map(activity => ({
      id: activity.id,
      name: activity.name,
      category: activity.category,
      completed: false,
      value: activity.defaultValue,
      unit: activity.unit,
      notes: ''
    }));
    
    // Try to load saved activities for the selected date
    if (user) {
      const dateKey = formatDateKey(selectedDate);
      const storageKey = `dasho-activities-${user.id}-${dateKey}`;
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setActivities(parsed.activities);
        } catch {
          setActivities(todayActivities);
        }
      } else {
        setActivities(todayActivities);
      }
    } else {
      setActivities(todayActivities);
    }
  }, [selectedDate, user]);

  const toggleActivity = (id: string) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id 
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const updateActivityValue = (id: string, value: number) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id 
          ? { ...activity, value }
          : activity
      )
    );
  };

  const updateActivityNotes = (id: string, notes: string) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id 
          ? { ...activity, notes }
          : activity
      )
    );
  };  const saveActivities = async () => {
    try {
      if (!user) return;
      
      // Save activities to localStorage
      const dateKey = formatDateKey(selectedDate);
      const activitiesData = {
        userId: user.id,
        date: dateKey,
        activities,
        savedAt: new Date().toISOString(),
      };      
      const storageKey = `dasho-activities-${user.id}-${dateKey}`;
      localStorage.setItem(storageKey, JSON.stringify(activitiesData));
      
      toast.success('Activities saved successfully!');
    } catch {
      toast.error('Failed to save activities');
    }
  };

  const completedCount = activities.filter(a => a.completed).length;
  const completionPercentage = Math.round((completedCount / activities.length) * 100);
  if (!isClient || loading) {
    return null;
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Please sign in to access daily log.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="lg:pl-72">
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} rounded-2xl p-6 shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                      📅 Habit Tracker
                    </h1>
                    <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Track your daily habits and build consistency
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
              {/* Calendar Header */}
              <div className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b px-6 py-4`}>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className={`p-2 rounded-lg hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} transition-colors`}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <h2 className="text-xl font-semibold">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <button
                    onClick={() => navigateMonth('next')}
                    className={`p-2 rounded-lg hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} transition-colors`}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Days of Week */}
              <div className={`grid grid-cols-7 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {generateCalendarDays().map((day, index) => {
                  if (!day) {
                    return <div key={index} className="h-24"></div>;
                  }

                  const { completed, total } = getActivityData(day);
                  const completionRate = total > 0 ? (completed / total) * 100 : 0;
                  const today = isToday(day);
                  const selected = isSelected(day);

                  return (
                    <div
                      key={day.toISOString()}
                      onClick={() => {
                        setSelectedDate(day);
                        setShowActivities(true);
                      }}
                      className={`h-24 border-r border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-2 cursor-pointer hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} transition-colors ${
                        selected ? (theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50') : ''
                      } ${today ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm font-medium ${today ? 'text-blue-600' : theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                            {day.getDate()}
                          </span>
                          {today && <span className="text-xs text-blue-600 font-bold">Today</span>}
                        </div>
                        
                        {/* Progress Indicator */}
                        <div className="flex-1 flex flex-col justify-end">
                          <div className={`w-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 mb-1`}>
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                completionRate === 100 ? 'bg-green-500' : 
                                completionRate >= 75 ? 'bg-blue-500' :
                                completionRate >= 50 ? 'bg-yellow-500' : 
                                completionRate > 0 ? 'bg-orange-500' : 'bg-gray-300'
                              }`}
                              style={{ width: `${completionRate}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-center text-gray-500">
                            {completed}/{total}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity Detail Panel */}
            {showActivities && (
              <div className={`mt-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      Activities for {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <button
                      onClick={() => setShowActivities(false)}
                      className={`text-gray-400 hover:${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                          activity.completed
                            ? theme === 'dark' 
                              ? 'bg-green-900 border-green-600 shadow-lg'
                              : 'bg-green-50 border-green-500 shadow-lg'
                            : theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
                              : 'bg-gray-50 border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => toggleActivity(activity.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              activity.completed
                                ? 'bg-green-500 border-green-500'
                                : theme === 'dark'
                                  ? 'border-gray-400'
                                  : 'border-gray-300'
                            }`}>
                              {activity.completed && (
                                <CheckIcon className="h-4 w-4 text-white" />
                              )}
                            </div>
                            <span className={`font-medium ${activity.completed ? 'text-green-700' : theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                              {activity.name}
                            </span>
                          </div>
                          {activity.completed && (
                            <span className="text-green-600 text-xl">✓</span>
                          )}
                        </div>
                        
                        {activity.value && (
                          <div className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Target: {activity.value} {activity.unit}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={saveActivities}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      💾 Save Progress
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );{/* Progress Summary */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Today&apos;s Progress 🎯</h3>
                <div className="text-right">
                  <span className="text-3xl font-bold text-green-600">{completionPercentage}%</span>
                  <p className="text-sm text-gray-600">Complete</p>
                </div>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3 mb-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {completedCount} of {activities.length} activities completed
                </span>
                <span className="text-green-700 font-medium">
                  {activities.length - completedCount} remaining
                </span>
              </div>
            </div>

            {/* Activities List */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                  Daily Activities
                </h3>
                
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div 
                      key={activity.id}
                      className={`border rounded-lg p-4 transition-all ${
                        activity.completed 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <button
                          onClick={() => toggleActivity(activity.id)}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            activity.completed
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300 hover:border-indigo-500'
                          }`}
                        >
                          {activity.completed && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${
                              activity.completed ? 'text-green-900 line-through' : 'text-gray-900'
                            }`}>
                              {activity.name}
                            </h4>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {activity.category}
                            </span>
                          </div>
                          
                          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {activity.unit && (
                              <div>
                                <label className="block text-xs font-medium text-gray-700">
                                  Amount ({activity.unit})
                                </label>
                                <input
                                  type="number"
                                  value={activity.value || ''}
                                  onChange={(e) => updateActivityValue(activity.id, Number(e.target.value))}
                                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  placeholder={`Enter ${activity.unit}`}
                                />
                              </div>
                            )}
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-700">
                                Notes (optional)
                              </label>
                              <input
                                type="text"
                                value={activity.notes || ''}
                                onChange={(e) => updateActivityNotes(activity.id, e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Add notes..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>                <div className="mt-8 flex justify-end">
                  <button
                    onClick={saveActivities}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    💾 Save Activities
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

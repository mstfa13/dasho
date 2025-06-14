'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { DEFAULT_ACTIVITIES } from '@/types';
import { CheckIcon } from '@heroicons/react/24/outline';
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
  const [isClient, setIsClient] = useState(false);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

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
      const storageKey = `dasho-activities-${user.id}-${date}`;
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
  }, [date, user]);

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
  };
  const saveActivities = async () => {
    try {
      if (!user) return;
      
      // Save activities to localStorage
      const activitiesData = {
        userId: user.id,
        date,
        activities,
        savedAt: new Date().toISOString(),
      };      
      const storageKey = `dasho-activities-${user.id}-${date}`;
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
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold sm:text-4xl">
                      Daily Activity Log 📝
                    </h1>
                    <p className="mt-2 text-blue-100 text-lg">
                      Track your daily activities and build positive habits
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="rounded-lg border-0 bg-white/10 text-white placeholder-blue-200 focus:bg-white/20 focus:ring-2 focus:ring-white/25 px-4 py-2 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>
            </div>            {/* Progress Summary */}
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

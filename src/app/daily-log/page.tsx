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
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Daily Activity Log
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Track your daily activities and progress
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Today&apos;s Progress</h3>
                <span className="text-2xl font-bold text-indigo-600">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {completedCount} of {activities.length} activities completed
              </p>
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
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={saveActivities}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Activities
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

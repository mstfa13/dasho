export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  name: string;
  category: string;
  date: Date;
  completed: boolean;
  value?: number;
  unit?: string;
  notes?: string;
}

export interface DashboardPage {
  id: string;
  userId: string;
  title: string;
  category: string;
  metrics: Metric[];
  chartConfigs: ChartConfig[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  category: string;
  date: Date;
  source: 'manual' | 'activity' | 'import';
}

export interface ChartConfig {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  title: string;
  dataSource: string;
  metrics: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

export interface ImportedData {
  id: string;
  userId: string;
  fileName: string;
  fileType: 'csv' | 'xlsx';
  uploadDate: Date;
  processed: boolean;
  rowCount: number;
  mappings: Record<string, string>;
}

export interface ActivityTemplate {
  id: string;
  name: string;
  category: string;
  defaultValue?: number;
  unit?: string;
  description?: string;
}

export const DEFAULT_CATEGORIES = [
  'Fitness',
  'Health',
  'Career',
  'Relationships',
  'Personal',
  'Education',
  'Hobbies',
  'Finance'
] as const;

export const DEFAULT_ACTIVITIES: ActivityTemplate[] = [
  { id: '1', name: 'Gym Workout', category: 'Fitness', defaultValue: 1, unit: 'session' },
  { id: '2', name: 'Shower', category: 'Health', defaultValue: 1, unit: 'session' },
  { id: '3', name: 'Take Finasteride', category: 'Health', defaultValue: 1, unit: 'pill' },
  { id: '4', name: 'Take Creatine', category: 'Health', defaultValue: 5, unit: 'grams' },
  { id: '5', name: 'Boxing Training', category: 'Fitness', defaultValue: 60, unit: 'minutes' },
  { id: '6', name: 'Coding Session', category: 'Career', defaultValue: 120, unit: 'minutes' },
  { id: '7', name: 'Read', category: 'Education', defaultValue: 30, unit: 'minutes' },
  { id: '8', name: 'Meditation', category: 'Personal', defaultValue: 15, unit: 'minutes' },
];

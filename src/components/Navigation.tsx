'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  HomeIcon, 
  PlusIcon, 
  ChartBarIcon, 
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { 
  Swords,
  Dumbbell,
  Briefcase,
  Heart
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Daily Log', href: '/daily-log', icon: PlusIcon },
  { name: 'Boxing', href: '/dashboard/boxing', icon: Swords },
  { name: 'Gym', href: '/dashboard/gym', icon: Dumbbell },
  { name: 'Career', href: '/dashboard/career', icon: Briefcase },
  { name: 'Relationships', href: '/dashboard/relationships', icon: Heart },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  if (!user) return null;

  return (
    <>      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 px-6 pb-4 shadow-xl">
          <div className="flex h-16 shrink-0 items-center border-b border-gray-700 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Dasho
              </h1>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>                <ul role="list" className="-mx-2 space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                              : 'text-gray-300 hover:text-white hover:bg-gray-700/50 hover:scale-105'
                          }`}
                        >
                          <item.icon className={`h-6 w-6 shrink-0 transition-transform ${isActive ? 'scale-110' : ''}`} aria-hidden="true" />
                          {item.name}
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>              <li className="mt-auto">
                <div className="border-t border-gray-700 pt-4">                  <div className="flex items-center gap-x-4 px-3 py-3 text-sm font-medium leading-6 text-gray-300 bg-gray-800/50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="truncate">{user.displayName || user.email}</span>
                  </div>
                  
                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className="group flex w-full gap-x-3 rounded-xl p-3 text-sm leading-6 font-medium text-gray-300 hover:text-white hover:bg-indigo-600/20 transition-all duration-200 mt-2"
                  >
                    {isDark ? (
                      <SunIcon className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" />
                    ) : (
                      <MoonIcon className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" />
                    )}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  
                  <button
                    onClick={signOut}
                    className="group flex w-full gap-x-3 rounded-xl p-3 text-sm leading-6 font-medium text-gray-300 hover:text-white hover:bg-red-600/20 transition-all duration-200 mt-2"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" />
                    Sign out
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 shadow-lg sm:gap-x-6 sm:px-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-white hover:bg-white/20 rounded-lg transition-colors lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-lg font-bold text-white">
            Dasho
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="relative z-50 lg:hidden">
            <div className="fixed inset-0 bg-gray-900/80" />
            <div className="fixed inset-0 flex">
              <div className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <h1 className="text-2xl font-bold text-white">Dasho</h1>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                    isActive
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                  }`}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                      <li className="mt-auto">                        <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-gray-400">
                          <UserIcon className="h-6 w-6" />
                          <span className="truncate">{user.displayName || user.email}</span>
                        </div>
                        
                        {/* Mobile Theme Toggle */}
                        <button
                          onClick={toggleTheme}
                          className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800 mb-2"
                        >
                          {isDark ? (
                            <SunIcon className="h-6 w-6 shrink-0" />
                          ) : (
                            <MoonIcon className="h-6 w-6 shrink-0" />
                          )}
                          {isDark ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        
                        <button
                          onClick={signOut}
                          className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          <ArrowRightOnRectangleIcon className="h-6 w-6 shrink-0" />
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

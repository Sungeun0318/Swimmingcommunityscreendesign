import React from 'react';
import { X, TrendingUp, Waves, Clock, Award, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MonthlyStatsModalProps {
  onClose: () => void;
  stats: {
    totalWorkouts: number;
    totalDistance: string;
    totalTime: string;
    avgPerWeek: number;
    completionRate: number;
  };
}

export function MonthlyStatsModal({ onClose, stats }: MonthlyStatsModalProps) {
  // Weekly workout data for chart
  const weeklyData = [
    { week: '1주차', workouts: 4, distance: 8.5 },
    { week: '2주차', workouts: 5, distance: 11.2 },
    { week: '3주차', workouts: 4, distance: 7.8 },
    { week: '4주차', workouts: 5, distance: 9.0 },
  ];

  // Daily distance data
  const dailyData = [
    { day: '1', distance: 2.0 },
    { day: '3', distance: 1.5 },
    { day: '5', distance: 3.0 },
    { day: '6', distance: 2.5 },
    { day: '8', distance: 2.0 },
    { day: '10', distance: 1.8 },
    { day: '11', distance: 2.2 },
    { day: '13', distance: 3.0 },
    { day: '15', distance: 2.5 },
    { day: '20', distance: 2.8 },
    { day: '22', distance: 2.0 },
    { day: '24', distance: 1.5 },
    { day: '26', distance: 2.5 },
    { day: '27', distance: 3.0 },
    { day: '29', distance: 2.0 },
    { day: '31', distance: 1.8 },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-card w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="flex items-center gap-2 text-white">
            <TrendingUp className="w-6 h-6" />
            <h2 className="text-xl">이번 달 통계</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">총 운동</span>
              </div>
              <p className="text-2xl text-blue-600 dark:text-blue-400">{stats.totalWorkouts}회</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">완료된 세션</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">총 거리</span>
              </div>
              <p className="text-2xl text-green-600 dark:text-green-400">{stats.totalDistance}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">수영 거리</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">총 시간</span>
              </div>
              <p className="text-lg text-purple-600 dark:text-purple-400">{stats.totalTime}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">수영장에서</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">달성률</span>
              </div>
              <p className="text-2xl text-orange-600 dark:text-orange-400">{stats.completionRate}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">목표 달성</p>
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500 dark:text-cyan-400" />
              주간 진행 상황
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                />
                <Bar dataKey="workouts" fill="#3b82f6" name="운동 횟수" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Distance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Waves className="w-5 h-5 text-green-500 dark:text-green-400" />
              일일 거리 추이
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  label={{ value: '날짜', position: 'insideBottom', offset: -5, fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  label={{ value: 'km', angle: -90, position: 'insideLeft', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`${value} km`, '거리']}
                />
                <Line 
                  type="monotone" 
                  dataKey="distance" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Insights */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-cyan-200 dark:border-cyan-800">
            <h3 className="text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              인사이트
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>주평균 <strong>{stats.avgPerWeek}회</strong> 운동 - 훌륭한 꾸준함이에요!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span>달성률 <strong>{stats.completionRate}%</strong> - 계속 해나가세요!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">✓</span>
                <span>가장 많이 수영한 주: <strong>2주차</strong> 11.2km</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
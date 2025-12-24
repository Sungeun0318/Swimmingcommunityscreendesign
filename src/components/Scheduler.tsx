import React, { useState } from 'react';
import { Calendar, TrendingUp, Waves, Clock, Award, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { MonthlyStatsModal } from './MonthlyStatsModal';
import { DayWorkoutModal } from './DayWorkoutModal';
import { AddWorkoutModal } from './AddWorkoutModal';
import { WorkoutDetailModal } from './WorkoutDetailModal';

export function Scheduler() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11)); // December 2024
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedDayWorkout, setSelectedDayWorkout] = useState<{ day: number; workout: any } | null>(null);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [selectedWorkoutDetail, setSelectedWorkoutDetail] = useState<any>(null);

  const monthlyStats = {
    totalWorkouts: 18,
    totalDistance: '32.5km',
    totalTime: '28시간 15분',
    avgPerWeek: 4.5,
    completionRate: 85
  };

  // Mock workout data for calendar
  const workoutDays = [
    { date: 1, distance: '2.0km', completed: true },
    { date: 3, distance: '1.5km', completed: true },
    { date: 5, distance: '3.0km', completed: true },
    { date: 6, distance: '2.5km', completed: true },
    { date: 8, distance: '2.0km', completed: true },
    { date: 10, distance: '1.8km', completed: true },
    { date: 11, distance: '2.2km', completed: true },
    { date: 13, distance: '3.0km', completed: true },
    { date: 15, distance: '2.5km', completed: true },
    { date: 17, distance: '2.0km', completed: false }, // planned but not done
    { date: 19, distance: '1.5km', completed: false },
    { date: 20, distance: '2.8km', completed: true },
    { date: 22, distance: '2.0km', completed: true },
    { date: 24, distance: '1.5km', completed: true },
    { date: 26, distance: '2.5km', completed: true },
    { date: 27, distance: '3.0km', completed: true },
    { date: 29, distance: '2.0km', completed: true },
    { date: 31, distance: '1.8km', completed: true }
  ];

  const upcomingWorkouts = [
    {
      id: 1,
      date: '2024-12-18',
      day: '수요일',
      title: '자유형 지구력 강화',
      distance: '2.5km',
      duration: '45분',
      difficulty: '중급',
      status: 'scheduled'
    },
    {
      id: 2,
      date: '2024-12-20',
      day: '금요일',
      title: '4영법 기술 훈련',
      distance: '2.0km',
      duration: '50분',
      difficulty: '중급-상급',
      status: 'scheduled'
    },
    {
      id: 3,
      date: '2024-12-22',
      day: '일요일',
      title: '장거리 수영',
      distance: '3.5km',
      duration: '60분',
      difficulty: '상급',
      status: 'scheduled'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });

  const getWorkoutForDay = (day: number) => {
    return workoutDays.find(w => w.date === day);
  };

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">스케줄러</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">나의 훈련 일정을 관리하세요</p>
      </div>

      {/* Monthly Stats */}
      <button
        onClick={() => setShowStatsModal(true)}
        className="w-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 rounded-2xl p-5 text-white hover:shadow-lg transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            이번 달 통계
          </h3>
          <div className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            {monthlyStats.completionRate}% 달성
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-white/70 text-xs mb-1">총 운동</div>
            <div className="text-xl">{monthlyStats.totalWorkouts}회</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-white/70 text-xs mb-1">총 거리</div>
            <div className="text-xl">{monthlyStats.totalDistance}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-white/70 text-xs mb-1">총 시간</div>
            <div className="text-sm">{monthlyStats.totalTime}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-white/70 text-xs mb-1">주평균</div>
            <div className="text-xl">{monthlyStats.avgPerWeek}회</div>
          </div>
        </div>
      </button>

      {/* Calendar */}
      <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Calendar className="w-5 h-5 text-blue-500" />
            {monthName}
          </h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
            <div key={day} className="text-center text-xs text-gray-500 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for first week */}
          {Array.from({ length: firstDay }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const workout = getWorkoutForDay(day);
            const isToday = day === 16; // Mock today as 16th

            return (
              <div
                key={day}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm relative ${
                  isToday ? 'bg-blue-100 ring-2 ring-blue-500' : ''
                } ${
                  workout?.completed ? 'bg-green-100' : workout ? 'bg-orange-100' : 'hover:bg-gray-50'
                } cursor-pointer transition-colors`}
                onClick={() => {
                  if (workout) {
                    setSelectedDayWorkout({ day, workout });
                  }
                }}
              >
                <span className={`${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                  {day}
                </span>
                {workout && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2">
                    {workout.completed ? (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 rounded" />
            <span className="text-gray-600">완료</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-100 rounded" />
            <span className="text-gray-600">예정</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-100 rounded ring-2 ring-blue-500" />
            <span className="text-gray-600">오늘</span>
          </div>
        </div>
      </div>

      {/* Upcoming Workouts */}
      <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-gray-900 dark:text-gray-100 mb-4">
          <Award className="w-5 h-5 text-purple-500 dark:text-purple-400" />
          다가오는 훈련
        </h3>

        <div className="space-y-3">
          {upcomingWorkouts.map(workout => (
            <div key={workout.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-cyan-500 transition-colors bg-white dark:bg-gray-800">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {workout.date.split('-')[2]}일 {workout.day}
                  </div>
                  <h4 className="text-gray-900 dark:text-gray-100">{workout.title}</h4>
                </div>
                <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs">
                  {workout.difficulty}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Waves className="w-4 h-4" />
                  <span>{workout.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{workout.duration}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 bg-blue-500 dark:bg-cyan-500 text-white rounded-lg text-sm hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors">
                  시작하기
                </button>
                <button
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-sm hover:border-blue-300 dark:hover:border-cyan-500 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors"
                  onClick={() => setSelectedWorkoutDetail(workout)}
                >
                  상세보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Workout Button - Fixed Floating Action Button */}
      <button
        className="fixed bottom-20 right-4 z-40 p-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        onClick={() => setShowAddWorkout(true)}
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modals */}
      {showStatsModal && <MonthlyStatsModal onClose={() => setShowStatsModal(false)} stats={monthlyStats} />}
      {selectedDayWorkout && (
        <DayWorkoutModal
          onClose={() => setSelectedDayWorkout(null)}
          day={selectedDayWorkout.day}
          workout={selectedDayWorkout.workout}
        />
      )}
      {showAddWorkout && <AddWorkoutModal onClose={() => setShowAddWorkout(false)} onSave={(workout) => {
        // Handle saving the workout
        console.log('New workout:', workout);
        setShowAddWorkout(false);
      }} />}
      {selectedWorkoutDetail && (
        <WorkoutDetailModal onClose={() => setSelectedWorkoutDetail(null)} workout={selectedWorkoutDetail} />
      )}
    </div>
  );
}
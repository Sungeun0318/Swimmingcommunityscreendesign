import React from 'react';
import { X, Waves, Clock, Award, Calendar, MapPin, TrendingUp } from 'lucide-react';

interface WorkoutStep {
  step: number;
  description: string;
  distance: string;
  sets: number;
  cycle: string;
  intensity: string;
}

interface Workout {
  id: number;
  date: string;
  day: string;
  title: string;
  distance: string;
  duration: string;
  difficulty: string;
  status: string;
  description?: string;
  steps?: WorkoutStep[];
}

interface WorkoutDetailModalProps {
  workout: Workout;
  onClose: () => void;
  onStart?: () => void;
}

export function WorkoutDetailModal({ workout, onClose, onStart }: WorkoutDetailModalProps) {
  // Default workout steps if not provided
  const workoutSteps: WorkoutStep[] = workout.steps || [
    { step: 1, description: '워밍업: 자유형, 편하게', distance: '200m', sets: 1, cycle: '3:00', intensity: '60%' },
    { step: 2, description: '메인세트: 자유형', distance: '100m', sets: 10, cycle: '1:30', intensity: '80%' },
    { step: 3, description: '드릴: 킥 연습', distance: '50m', sets: 4, cycle: '1:00', intensity: '70%' },
    { step: 4, description: '스피드: 자유형 전력', distance: '50m', sets: 6, cycle: '1:15', intensity: '90%' },
    { step: 5, description: '쿨다운: 자유형 편하게', distance: '300m', sets: 1, cycle: 'Easy', intensity: '50%' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-card w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="flex items-center justify-between">
            <div className="text-white flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl">{workout.title}</h2>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {workout.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{workout.date.split('-')[2]} {workout.day}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="w-5 h-5 text-blue-500 dark:text-cyan-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">총 거리</span>
              </div>
              <div className="text-2xl text-blue-600 dark:text-cyan-400">{workout.distance}</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">총 시간</span>
              </div>
              <div className="text-2xl text-green-600 dark:text-green-400">{workout.duration}</div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">총 훈련 갯수</span>
              </div>
              <div className="text-2xl text-purple-600 dark:text-purple-400">
                {workoutSteps.reduce((sum, step) => sum + step.sets, 0)}세트
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-100 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">총 사이클</span>
              </div>
              <div className="text-2xl text-orange-600 dark:text-orange-400">
                {workoutSteps.length}회
              </div>
            </div>
          </div>

          {/* Workout Program Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-xl">
              <h4 className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Waves className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                훈련 프로그램
              </h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-500 dark:bg-cyan-600 text-white">
                    <th className="px-3 py-2 text-center border-r border-blue-400 dark:border-cyan-500">#</th>
                    <th className="px-3 py-2 text-left border-r border-blue-400 dark:border-cyan-500">훈련명</th>
                    <th className="px-3 py-2 text-center border-r border-blue-400 dark:border-cyan-500">거리</th>
                    <th className="px-3 py-2 text-center border-r border-blue-400 dark:border-cyan-500">갯수</th>
                    <th className="px-3 py-2 text-center border-r border-blue-400 dark:border-cyan-500">사이클</th>
                    <th className="px-3 py-2 text-center">강도</th>
                  </tr>
                </thead>
                <tbody>
                  {workoutSteps.map((step, index) => (
                    <tr 
                      key={step.step}
                      className={`${
                        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                      } hover:bg-blue-50 dark:hover:bg-cyan-900/20 transition-colors`}
                    >
                      <td className="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-700">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 dark:bg-cyan-500 text-white rounded-full text-xs">
                          {step.step}
                        </span>
                      </td>
                      <td className="px-3 py-3 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                        {step.description}
                      </td>
                      <td className="px-3 py-3 text-center text-gray-800 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                        {step.distance}
                      </td>
                      <td className="px-3 py-3 text-center text-gray-800 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                        {step.sets > 1 ? step.sets : '-'}
                      </td>
                      <td className="px-3 py-3 text-center text-gray-600 dark:text-gray-400 text-xs border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                        {step.cycle}
                      </td>
                      <td className="px-3 py-3 text-center whitespace-nowrap">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          parseInt(step.intensity) >= 80
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : parseInt(step.intensity) >= 70
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        }`}>
                          {step.intensity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <h4 className="text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              훈련 팁
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>훈련 내내 일관된 영법 기술을 유지하세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>메인 세트 중에는 호흡 리듬을 꾸준히 유지하세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>수분을 충분히 섭취하고 강도 높은 세트 사이에 휴식을 취하세요</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onStart?.();
              onClose();
            }}
            className="flex-1 px-6 py-3 bg-blue-500 dark:bg-cyan-500 text-white rounded-xl hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors"
          >
            훈련 시작
          </button>
        </div>
      </div>
    </div>
  );
}
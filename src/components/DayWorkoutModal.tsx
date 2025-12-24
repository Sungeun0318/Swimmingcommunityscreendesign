import React from 'react';
import { X, Waves, Clock, Award, TrendingUp } from 'lucide-react';

interface WorkoutStep {
  step: number;
  type: string;
  stroke: string;
  distance: string;
  sets: number;
  cycle: string;
  intensity: string;
}

interface DayWorkout {
  date: number;
  distance: string;
  completed: boolean;
  title?: string;
  duration?: string;
  difficulty?: string;
  steps?: WorkoutStep[];
}

interface DayWorkoutModalProps {
  day: number;
  workout: DayWorkout;
  onClose: () => void;
}

export function DayWorkoutModal({ day, workout, onClose }: DayWorkoutModalProps) {
  // If workout has no detailed steps, create default ones
  const workoutSteps: WorkoutStep[] = workout.steps || [
    { step: 1, type: 'Warm-up', stroke: 'Free', distance: '200m', sets: 1, cycle: '3:00', intensity: '60%' },
    { step: 2, type: 'Main Set', stroke: 'Free', distance: '100m', sets: 10, cycle: '1:30', intensity: '80%' },
    { step: 3, type: 'Cool Down', stroke: 'Free', distance: '300m', sets: 1, cycle: 'Easy', intensity: '50%' }
  ];

  const workoutTitle = workout.title || 'Freestyle Endurance Training';
  const workoutDuration = workout.duration || '45min';
  const workoutDifficulty = workout.difficulty || 'Intermediate';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-card w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
          workout.completed 
            ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
            : 'bg-gradient-to-br from-orange-500 to-amber-600'
        }`}>
          <div className="flex items-center justify-between">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl">{day}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  workout.completed 
                    ? 'bg-green-900/30 backdrop-blur-sm' 
                    : 'bg-orange-900/30 backdrop-blur-sm'
                }`}>
                  {workout.completed ? 'Completed' : 'Scheduled'}
                </span>
              </div>
              <p className="text-white/90 text-sm">December 2024</p>
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
          {/* Workout Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-xl p-4">
            <h3 className="text-lg mb-2">{workoutTitle}</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>{workoutDifficulty}</span>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-1">
                <Waves className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Total Distance</span>
              </div>
              <div className="text-blue-600 dark:text-cyan-400">{workout.distance}</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-green-500 dark:text-green-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Duration</span>
              </div>
              <div className="text-green-600 dark:text-green-400">{workoutDuration}</div>
            </div>
          </div>

          {/* Workout Details Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-xl">
              <h4 className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Waves className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                Training Program
              </h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-500 dark:bg-cyan-600 text-white">
                    <th className="px-3 py-2 text-center border-r border-blue-400 dark:border-cyan-500">#</th>
                    <th className="px-3 py-2 text-left border-r border-blue-400 dark:border-cyan-500">Type</th>
                    <th className="px-3 py-2 text-left border-r border-blue-400 dark:border-cyan-500">Stroke</th>
                    <th className="px-3 py-2 text-center border-r border-blue-400 dark:border-cyan-500">Distance</th>
                    <th className="px-3 py-2 text-center border-r border-blue-400 dark:border-cyan-500">Sets</th>
                    <th className="px-3 py-2 text-center border-r border-blue-400 dark:border-cyan-500">Rest</th>
                    <th className="px-3 py-2 text-center">Intensity</th>
                  </tr>
                </thead>
                <tbody>
                  {workoutSteps.map((step, index) => (
                    <tr 
                      key={step.step}
                      className={`${
                        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                      } ${
                        step.type === 'Rest' ? 'bg-orange-50 dark:bg-orange-900/20' : ''
                      } hover:bg-blue-50 dark:hover:bg-cyan-900/20 transition-colors`}
                    >
                      <td className="px-3 py-2 text-center border-r border-gray-200 dark:border-gray-700">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 dark:bg-cyan-500 text-white rounded-full text-xs">
                          {step.step}
                        </span>
                      </td>
                      <td className="px-3 py-2 border-r border-gray-200 dark:border-gray-700">
                        <span className="inline-block px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded text-xs whitespace-nowrap">
                          {step.type}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-blue-600 dark:text-cyan-400 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                        {step.stroke}
                      </td>
                      <td className="px-3 py-2 text-center text-gray-800 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                        {step.distance}
                      </td>
                      <td className="px-3 py-2 text-center text-gray-800 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                        {step.sets > 1 ? step.sets : '-'}
                      </td>
                      <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400 text-xs border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">
                        {step.cycle}
                      </td>
                      <td className="px-3 py-2 text-center whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs ${
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

          {/* Actions */}
          {!workout.completed && (
            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-blue-500 dark:bg-cyan-500 text-white rounded-xl hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors">
                Start Workout
              </button>
              <button className="px-4 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:border-blue-300 dark:hover:border-cyan-400 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors">
                Edit
              </button>
            </div>
          )}

          {workout.completed && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <TrendingUp className="w-5 h-5" />
                <span>Workout completed successfully!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

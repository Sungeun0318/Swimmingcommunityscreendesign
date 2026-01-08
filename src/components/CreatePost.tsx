import React, { useState } from 'react';
import { X, Waves, Clock, Plus, Trash2, Award, MessageSquare } from 'lucide-react';

interface CreatePostProps {
  onClose: () => void;
}

interface WorkoutStep {
  step: number;
  description: string;
  distance: string;
  sets: number;
  cycle: string;
  intensity: string;
}

export function CreatePost({ onClose }: CreatePostProps) {
  const [title, setTitle] = useState('');
  const [totalDistance, setTotalDistance] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [description, setDescription] = useState('');
  const [workoutSteps, setWorkoutSteps] = useState<WorkoutStep[]>([
    { step: 1, description: '워밍업: 자유형, 편하게', distance: '200m', sets: 1, cycle: '3:00', intensity: '60%' }
  ]);

  const handleSubmit = () => {
    // Handle post submission
    console.log('Posting workout program...');
    onClose();
  };

  const addWorkoutStep = () => {
    const newStep: WorkoutStep = {
      step: workoutSteps.length + 1,
      description: '메인세트: 자유형',
      distance: '100m',
      sets: 10,
      cycle: '1:30',
      intensity: '80%'
    };
    setWorkoutSteps([...workoutSteps, newStep]);
  };

  const removeWorkoutStep = (stepNumber: number) => {
    const updated = workoutSteps
      .filter((ws) => ws.step !== stepNumber)
      .map((ws, index) => ({ ...ws, step: index + 1 }));
    setWorkoutSteps(updated);
  };

  const updateWorkoutStep = (stepNumber: number, key: keyof WorkoutStep, value: any) => {
    setWorkoutSteps(workoutSteps.map((ws) => (ws.step === stepNumber ? { ...ws, [key]: value } : ws)));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-card w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">훈련 프로그램 공유</h2>
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
          {/* Program Title */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              프로그램 제목 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 자유형 지구력 향상 프로그램 (레벨 2)"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="w-5 h-5 text-blue-500 dark:text-cyan-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">총 거리</span>
              </div>
              <input
                type="text"
                value={totalDistance}
                onChange={(e) => setTotalDistance(e.target.value)}
                placeholder="1500m"
                className="w-full text-2xl text-blue-600 dark:text-cyan-400 bg-transparent outline-none placeholder-blue-300 dark:placeholder-cyan-600"
              />
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">총 시간</span>
              </div>
              <input
                type="text"
                value={totalTime}
                onChange={(e) => setTotalTime(e.target.value)}
                placeholder="28:30"
                className="w-full text-2xl text-green-600 dark:text-green-400 bg-transparent outline-none placeholder-green-300 dark:placeholder-green-600"
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <h4 className="text-gray-900 dark:text-gray-100">프로그램 설명</h4>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="이 훈련 프로그램의 목적과 주요 포인트를 설명하세요..."
              className="w-full h-24 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none resize-none"
            />
          </div>

          {/* Workout Program Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-xl flex items-center justify-between">
              <h4 className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Waves className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                훈련 프로그램 *
              </h4>
              <button
                type="button"
                onClick={addWorkoutStep}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 dark:bg-cyan-500 text-white rounded-lg text-xs hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors"
              >
                <Plus className="w-3 h-3" />
                추가
              </button>
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
                    <th className="px-3 py-2 text-center border-r border-blue-400 dark:border-cyan-500">강도</th>
                    <th className="px-3 py-2 text-center w-8"></th>
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
                      <td className="px-3 py-3 border-r border-gray-200 dark:border-gray-700">
                        <input
                          type="text"
                          value={step.description}
                          onChange={(e) => updateWorkoutStep(step.step, 'description', e.target.value)}
                          placeholder="예: 메인세트: 자유형"
                          className="w-full bg-transparent text-gray-900 dark:text-gray-100 outline-none placeholder-gray-400"
                        />
                      </td>
                      <td className="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-700">
                        <input
                          type="text"
                          value={step.distance}
                          onChange={(e) => updateWorkoutStep(step.step, 'distance', e.target.value)}
                          placeholder="100m"
                          className="w-full bg-transparent text-gray-800 dark:text-gray-300 outline-none text-center placeholder-gray-400"
                        />
                      </td>
                      <td className="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-700">
                        <input
                          type="number"
                          value={step.sets}
                          onChange={(e) => updateWorkoutStep(step.step, 'sets', parseInt(e.target.value) || 1)}
                          className="w-full bg-transparent text-gray-800 dark:text-gray-300 outline-none text-center"
                        />
                      </td>
                      <td className="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-700">
                        <input
                          type="text"
                          value={step.cycle}
                          onChange={(e) => updateWorkoutStep(step.step, 'cycle', e.target.value)}
                          placeholder="1:30"
                          className="w-full bg-transparent text-gray-600 dark:text-gray-400 outline-none text-center text-xs placeholder-gray-400"
                        />
                      </td>
                      <td className="px-3 py-3 text-center border-r border-gray-200 dark:border-gray-700">
                        <input
                          type="text"
                          value={step.intensity}
                          onChange={(e) => updateWorkoutStep(step.step, 'intensity', e.target.value)}
                          placeholder="80%"
                          className={`w-full bg-transparent outline-none text-center text-xs ${
                            parseInt(step.intensity) >= 80
                              ? 'text-red-600 dark:text-red-400'
                              : parseInt(step.intensity) >= 70
                              ? 'text-orange-600 dark:text-orange-400'
                              : 'text-green-600 dark:text-green-400'
                          }`}
                        />
                      </td>
                      <td className="px-3 py-3 text-center">
                        {workoutSteps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeWorkoutStep(step.step)}
                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
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
              공유 팁
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>명확한 프로그램 제목으로 다른 수영인들의 관심을 끌어보세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>각 세트의 강도와 목적을 정확하게 표시하세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                <span>프로그램 설명에 난이도와 추천 대상을 포함하세요</span>
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
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title || workoutSteps.length === 0}
            className={`flex-1 px-6 py-3 rounded-xl transition-colors ${
              !title || workoutSteps.length === 0
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 dark:bg-cyan-500 text-white hover:bg-blue-600 dark:hover:bg-cyan-600'
            }`}
          >
            게시하기
          </button>
        </div>
      </div>
    </div>
  );
}
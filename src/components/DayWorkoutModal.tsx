import React, { useState } from 'react';
import { X, Waves, Clock, Award, TrendingUp, Edit, Trash2, MessageSquare, Share2, Camera, Image as ImageIcon, Plus } from 'lucide-react';

interface WorkoutStep {
  step: number;
  description: string;
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
  memo?: string;
  photos?: string[];
}

interface DayWorkoutModalProps {
  day: number;
  workout: DayWorkout;
  onClose: () => void;
  onEdit?: (workout: DayWorkout) => void;
  onDelete?: (day: number) => void;
  onShare?: (workout: DayWorkout) => void;
}

export function DayWorkoutModal({ day, workout, onClose, onEdit, onDelete, onShare }: DayWorkoutModalProps) {
  const [memo, setMemo] = useState(workout.memo || '');
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [photos, setPhotos] = useState<string[]>(workout.photos || []);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // If workout has no detailed steps, create default ones
  const workoutSteps: WorkoutStep[] = workout.steps || [
    { step: 1, description: '워밍업: 자유형, 편하게', distance: '200m', sets: 1, cycle: '3:00', intensity: '60%' },
    { step: 2, description: '메인세트: 자유형', distance: '100m', sets: 10, cycle: '1:30', intensity: '80%' },
    { step: 3, description: '쿨다운: 자유형 편하게', distance: '300m', sets: 1, cycle: 'Easy', intensity: '50%' }
  ];

  const workoutTitle = workout.title || '자유형 지구력 훈련';
  const workoutDuration = workout.duration || '45분';
  const workoutDifficulty = workout.difficulty || '중급';

  const handleSaveMemo = () => {
    setIsEditingMemo(false);
    console.log('Saving memo:', memo);
  };

  const handleAddPhoto = () => {
    const demoPhotos = [
      'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1592409438460-f0fa6e8a4059?w=400&h=300&fit=crop',
    ];
    const randomPhoto = demoPhotos[Math.floor(Math.random() * demoPhotos.length)];
    setPhotos([...photos, randomPhoto]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(day);
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
        <div className="bg-white dark:bg-card w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
            workout.completed 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-orange-500 to-amber-600'
          }`}>
            <div className="flex items-center justify-between">
              <div className="text-white flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl">{day}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    workout.completed 
                      ? 'bg-green-900/30 backdrop-blur-sm' 
                      : 'bg-orange-900/30 backdrop-blur-sm'
                  }`}>
                    {workout.completed ? '완료' : '예정'}
                  </span>
                </div>
                <p className="text-white/90 text-sm">2024년 12월</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => onEdit?.(workout)}
                className="flex-1 flex flex-col items-center gap-1 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <Edit className="w-6 h-6" />
                <span className="text-sm">수정</span>
              </button>
              <button
                onClick={() => onShare?.(workout)}
                className="flex-1 flex flex-col items-center gap-1 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <Share2 className="w-6 h-6" />
                <span className="text-sm">공유</span>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-20 flex flex-col items-center gap-1 p-4 bg-white/10 hover:bg-red-500/20 rounded-xl transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span className="text-sm">삭제</span>
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
                <div className="text-2xl text-green-600 dark:text-green-400">{workoutDuration}</div>
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

            {/* Photos Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-gray-500" />
                  사진 첨부
                </h4>
                <button
                  onClick={handleAddPhoto}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 dark:bg-cyan-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </button>
              </div>
              {photos.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
                  <ImageIcon className="w-12 h-12 mb-2" />
                  <p className="text-sm">첨부된 사진이 없습니다</p>
                </div>
              )}
            </div>

            {/* Memo Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  메모
                </h4>
                {!isEditingMemo && (
                  <button
                    onClick={() => setIsEditingMemo(true)}
                    className="text-sm text-blue-500 dark:text-cyan-400 hover:text-blue-600 dark:hover:text-cyan-300"
                  >
                    {memo ? '수정' : '추가'}
                  </button>
                )}
              </div>
              {isEditingMemo ? (
                <div className="space-y-3">
                  <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="훈련에 대한 메모를 남겨보세요... (예: 오늘 컨디션 좋았음, 어깨 통증 있음)"
                    className="w-full h-24 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveMemo}
                      className="flex-1 py-2 bg-blue-500 dark:bg-cyan-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors text-sm"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingMemo(false);
                        setMemo(workout.memo || '');
                      }}
                      className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : memo ? (
                <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
                  {memo}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  메모를 추가하여 훈련에 대한 기록을 남겨보세요
                </p>
              )}
            </div>

            {/* Workout Details Table */}
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

            {/* Actions */}
            {!workout.completed && (
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-blue-500 dark:bg-cyan-500 text-white rounded-xl hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors">
                  훈련 시작
                </button>
              </div>
            )}

            {workout.completed && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <TrendingUp className="w-5 h-5" />
                  <span>훈련을 성공적으로 완료했습니다!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card rounded-2xl p-6 max-w-sm w-full animate-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-gray-100">훈련 삭제</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">정말 삭제하시겠습니까?</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              이 작업은 되돌릴 수 없습니다. 훈련 기록, 메모, 사진이 모두 삭제됩니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
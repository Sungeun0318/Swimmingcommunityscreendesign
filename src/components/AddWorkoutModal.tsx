import React, { useState } from 'react';
import { X, Calendar, Clock, Waves, Award, Plus, Minus } from 'lucide-react';

interface AddWorkoutModalProps {
  onClose: () => void;
  onSave: (workout: any) => void;
}

export function AddWorkoutModal({ onClose, onSave }: AddWorkoutModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('중급');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    const workout = {
      id: Date.now(),
      title,
      date,
      time,
      difficulty,
      notes,
      status: 'scheduled'
    };
    onSave(workout);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-card w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">프로그램 작성</h2>
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
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              훈련 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 자유형 지구력 훈련"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                날짜
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                시간
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              난이도
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['초급', '중급', '고급', '엘리트'].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    difficulty === level
                      ? 'bg-blue-500 dark:bg-cyan-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Templates */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              빠른 템플릿
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setTitle('자유형 지구력');
                  setDifficulty('중급');
                }}
                className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-left hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <div className="text-sm text-blue-700 dark:text-blue-400">🏊 자유형</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">지구력 중심</div>
              </button>
              <button
                onClick={() => {
                  setTitle('개인혼영 훈련');
                  setDifficulty('고급');
                }}
                className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl text-left hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <div className="text-sm text-purple-700 dark:text-purple-400">🌊 개인혼영</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">4가지 영법</div>
              </button>
              <button
                onClick={() => {
                  setTitle('스프린트 훈련');
                  setDifficulty('고급');
                }}
                className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl text-left hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
              >
                <div className="text-sm text-orange-700 dark:text-orange-400">⚡ 스프린트</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">속도 훈련</div>
              </button>
              <button
                onClick={() => {
                  setTitle('기술 드릴');
                  setDifficulty('초급');
                }}
                className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-left hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <div className="text-sm text-green-700 dark:text-green-400">🎯 기술</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">기술 향상</div>
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              메모 (선택)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="이 훈련에 대한 메모를 추가하세요..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!title || !date}
            className={`flex-1 px-4 py-3 rounded-xl transition-colors ${
              !title || !date
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 dark:bg-cyan-500 text-white hover:bg-blue-600 dark:hover:bg-cyan-600'
            }`}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
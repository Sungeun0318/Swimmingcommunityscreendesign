import React from 'react';
import { X, LogOut, AlertCircle } from 'lucide-react';

interface LogoutConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({ onClose, onConfirm }: LogoutConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LogOut className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">로그아웃</h2>
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
        <div className="p-6 space-y-5">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <AlertCircle className="w-12 h-12 text-orange-600 dark:text-orange-400" />
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <h3 className="text-xl text-gray-900 dark:text-gray-100">
              정말 로그아웃 하시겠어요?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              다시 로그인하려면 이메일과 비밀번호를 입력해야 합니다
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              💡 <strong>로그아웃 시 유의사항</strong><br />
              • 저장되지 않은 훈련 기록은 유지됩니다<br />
              • 출석 체크 기록은 유지됩니다<br />
              • 다시 로그인하면 모든 데이터를 확인할 수 있습니다
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

interface ReportPostModalProps {
  onClose: () => void;
  postId: number;
  postAuthor: string;
}

export function ReportPostModal({ onClose, postId, postAuthor }: ReportPostModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reportReasons = [
    { id: 'spam', label: '스팸 또는 광고', icon: '📢' },
    { id: 'inappropriate', label: '부적절한 콘텐츠', icon: '🚫' },
    { id: 'harassment', label: '괴롭힘 또는 혐오 발언', icon: '😡' },
    { id: 'false-info', label: '잘못된 정보', icon: '❌' },
    { id: 'copyright', label: '저작권 침해', icon: '©️' },
    { id: 'other', label: '기타', icon: '💬' }
  ];

  const handleSubmit = () => {
    console.log('Report submitted:', { postId, reason: selectedReason, customReason });
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-500 to-orange-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">게시물 신고</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">{postAuthor}님의 게시물</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isSubmitted ? (
            <div className="space-y-6">
              {/* Warning */}
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
                <p className="text-sm text-orange-800 dark:text-orange-300">
                  ⚠️ 신고는 신중하게 해주세요. 허위 신고는 제재 대상이 될 수 있습니다.
                </p>
              </div>

              {/* Reason Selection */}
              <div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-3">신고 사유를 선택하세요</h3>
                <div className="space-y-2">
                  {reportReasons.map((reason) => (
                    <button
                      key={reason.id}
                      onClick={() => setSelectedReason(reason.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        selectedReason === reason.id
                          ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="text-2xl">{reason.icon}</div>
                      <span className="text-left text-gray-900 dark:text-gray-100">{reason.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Reason for "Other" */}
              {selectedReason === 'other' && (
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                    상세 사유를 입력해주세요
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="신고 사유를 자세히 설명해주세요..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!selectedReason || (selectedReason === 'other' && !customReason.trim())}
                className="w-full py-3.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                신고 제출
              </button>

              {/* Cancel Button */}
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center py-8">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                  <CheckCircle className="relative w-20 h-20 text-green-500 dark:text-green-400" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h3 className="text-2xl text-gray-900 dark:text-gray-100">
                  신고가 접수되었습니다
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  신속하게 검토하여 조치하겠습니다
                </p>
              </div>

              {/* Info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-left">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">처리 과정:</p>
                <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                  <li>신고 접수 및 확인</li>
                  <li>콘텐츠 검토 (1-3일 소요)</li>
                  <li>위반 시 게시물 삭제 및 제재</li>
                  <li>결과 알림 (필요시)</li>
                </ol>
              </div>

              {/* Auto-hide Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💡 신고가 3회 이상 누적되면 게시물이 자동으로 숨김 처리됩니다.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                확인
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

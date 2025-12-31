import React, { useState } from 'react';
import { X, AlertTriangle, Trash2, Check, Shield } from 'lucide-react';

interface DeleteAccountModalProps {
  onClose: () => void;
}

type DeleteType = 'immediate' | 'delayed' | null;

export function DeleteAccountModal({ onClose }: DeleteAccountModalProps) {
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [deleteType, setDeleteType] = useState<DeleteType>(null);
  const [confirmText, setConfirmText] = useState('');
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [additionalReason, setAdditionalReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteReasons = [
    '더 이상 수영을 하지 않아요',
    '다른 앱을 사용하게 되었어요',
    '개인정보가 걱정돼요',
    '사용하기 불편해요',
    '원하는 기능이 없어요',
    '잠시 쉬고 싶어요'
  ];

  const toggleReason = (reason: string) => {
    setSelectedReasons(prev =>
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDeleting(false);
    setStep('success');

    setTimeout(() => {
      onClose();
      // Here you would actually log out the user
    }, 3000);
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
        <div className="bg-white dark:bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-8 animate-in slide-in-from-bottom duration-300">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                <Check className="relative w-16 h-16 text-green-500" />
              </div>
            </div>
            <h3 className="text-xl text-gray-900 dark:text-gray-100">
              {deleteType === 'immediate' ? '탈퇴가 완료되었습니다' : '탈퇴 신청이 완료되었습니다'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {deleteType === 'immediate' 
                ? '그동안 이용해주셔서 감사합니다'
                : '7일 후 자동으로 탈퇴가 완료됩니다'
              }
            </p>
            {deleteType === 'delayed' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-left">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💡 7일 이내에 다시 로그인하면<br />
                  탈퇴 신청이 자동으로 취소됩니다
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
        <div className="bg-white dark:bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-white" />
                <h2 className="text-xl text-white">최종 확인</h2>
              </div>
              <button
                onClick={() => setStep('select')}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Warning Box */}
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 dark:border-red-700 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-red-900 dark:text-red-100 font-semibold">
                    {deleteType === 'immediate' ? '즉시 삭제됩니다' : '7일 후 삭제됩니다'}
                  </h4>
                  <ul className="text-sm text-red-800 dark:text-red-300 space-y-1">
                    <li>• 모든 훈련 기록이 삭제됩니다</li>
                    <li>• 레벨, XP, 배지가 모두 사라집니다</li>
                    <li>• 작성한 게시물과 댓글이 삭제됩니다</li>
                    <li>• 저장한 훈련 프로그램이 삭제됩니다</li>
                    <li>• 팔로워/팔로잉 정보가 삭제됩니다</li>
                    {deleteType === 'immediate' && (
                      <li className="font-semibold">• 복구가 불가능합니다</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {deleteType === 'delayed' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💡 <strong>7일 유예 기간 동안:</strong><br />
                  • 언제든지 로그인하여 탈퇴를 취소할 수 있습니다<br />
                  • 모든 데이터는 그대로 유지됩니다<br />
                  • 7일 후 자동으로 영구 삭제됩니다
                </p>
              </div>
            )}

            {/* Confirmation Input */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                정말 탈퇴하시려면 "<strong className="text-red-600 dark:text-red-400">탈퇴하기</strong>"를 입력하세요
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="탈퇴하기"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep('select')}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={confirmText !== '탈퇴하기' || isDeleting}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isDeleting ? '처리 중...' : '탈퇴하기'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trash2 className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">회원 탈퇴</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">
            탈퇴 방법을 선택하세요
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Warning Message */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-yellow-900 dark:text-yellow-100 font-semibold mb-1">
                  잠깐만요!
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  탈퇴하시기 전에 한 번 더 생각해보세요. 모든 데이터가 삭제되며 복구할 수 없습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Reasons */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3">
              탈퇴 사유를 선택해주세요 (선택사항)
            </label>
            <div className="space-y-2">
              {deleteReasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => toggleReason(reason)}
                  className={`w-full p-3 rounded-lg border transition-all text-left text-sm ${
                    selectedReasons.includes(reason)
                      ? 'border-blue-500 dark:border-cyan-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedReasons.includes(reason)
                        ? 'border-blue-500 dark:border-cyan-500 bg-blue-500 dark:bg-cyan-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selectedReasons.includes(reason) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    {reason}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Reason */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              추가로 하실 말씀이 있나요? (선택사항)
            </label>
            <textarea
              value={additionalReason}
              onChange={(e) => setAdditionalReason(e.target.value)}
              placeholder="소중한 의견을 남겨주세요. 더 나은 서비스를 만드는 데 도움이 됩니다."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none text-sm"
            />
          </div>

          {/* Delete Type Selection */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3">
              탈퇴 방법 선택 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {/* Immediate Delete */}
              <button
                onClick={() => setDeleteType('immediate')}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  deleteType === 'immediate'
                    ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    deleteType === 'immediate'
                      ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-gray-100 font-semibold mb-1">
                      즉시 탈퇴
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      지금 바로 계정과 모든 데이터를 삭제합니다
                    </p>
                    <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                      <AlertTriangle className="w-3 h-3" />
                      <span>복구 불가능</span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Delayed Delete */}
              <button
                onClick={() => setDeleteType('delayed')}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  deleteType === 'delayed'
                    ? 'border-blue-500 dark:border-cyan-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    deleteType === 'delayed'
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-gray-100 font-semibold mb-1">
                      7일 후 탈퇴 (권장)
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      7일 동안 생각할 시간을 가집니다
                    </p>
                    <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                      <Check className="w-3 h-3" />
                      <span>7일 이내 로그인 시 자동 취소</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              💡 <strong>탈퇴 대신 이런 방법도 있어요:</strong><br />
              • 알림 끄기로 부담 줄이기<br />
              • 비공개 계정으로 전환하기<br />
              • 잠시 앱 삭제 후 다시 설치하기
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
              onClick={() => setStep('confirm')}
              disabled={!deleteType}
              className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              다음 단계로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

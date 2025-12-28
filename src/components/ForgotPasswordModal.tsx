import React, { useState } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

export function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset password for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">비밀번호 찾기</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">이메일로 비밀번호 재설정 링크를 보내드립니다</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  가입하신 이메일 주소를 입력하세요
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  입력하신 이메일로 비밀번호 재설정 링크가 전송됩니다.
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💡 이메일을 받지 못하신 경우, 스팸 메일함을 확인해주세요.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                재설정 링크 보내기
              </button>

              {/* Back to Login */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                <button type="button" onClick={onClose} className="text-blue-600 dark:text-cyan-400 hover:underline">
                  로그인으로 돌아가기
                </button>
              </p>
            </form>
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
                <h3 className="text-xl text-gray-900 dark:text-gray-100">이메일을 보냈습니다!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="text-blue-600 dark:text-cyan-400">{email}</strong>로<br />
                  비밀번호 재설정 링크를 전송했습니다.
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-left">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">다음 단계:</p>
                <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                  <li>이메일 받은편지함을 확인하세요</li>
                  <li>비밀번호 재설정 링크를 클릭하세요</li>
                  <li>새로운 비밀번호를 설정하세요</li>
                </ol>
              </div>

              {/* Resend Button */}
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm text-blue-600 dark:text-cyan-400 hover:underline"
              >
                이메일을 받지 못하셨나요? 다시 보내기
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

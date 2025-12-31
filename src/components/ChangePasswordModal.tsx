import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

interface ChangePasswordModalProps {
  onClose: () => void;
}

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: '약함', color: 'bg-red-500' };
    if (strength <= 3) return { strength, label: '보통', color: 'bg-yellow-500' };
    if (strength <= 4) return { strength, label: '강함', color: 'bg-green-500' };
    return { strength, label: '매우 강함', color: 'bg-blue-500' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);
  const passwordsMatch = formData.newPassword && formData.newPassword === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.currentPassword || !formData.newPassword || !passwordsMatch) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSuccess(true);

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (success) {
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
              비밀번호가 변경되었습니다
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              새 비밀번호로 로그인해주세요
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">비밀번호 변경</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">
            새로운 비밀번호를 설정하세요
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              현재 비밀번호 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                placeholder="현재 비밀번호를 입력하세요"
                className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              새 비밀번호 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="새 비밀번호를 입력하세요"
                className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Strength */}
            {formData.newPassword && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {passwordStrength.label}
                  </span>
                </div>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li className={formData.newPassword.length >= 8 ? 'text-green-600 dark:text-green-400' : ''}>
                    {formData.newPassword.length >= 8 ? '✓' : '○'} 8자 이상
                  </li>
                  <li className={/[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword) ? 'text-green-600 dark:text-green-400' : ''}>
                    {/[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword) ? '✓' : '○'} 대소문자 포함
                  </li>
                  <li className={/[0-9]/.test(formData.newPassword) ? 'text-green-600 dark:text-green-400' : ''}>
                    {/[0-9]/.test(formData.newPassword) ? '✓' : '○'} 숫자 포함
                  </li>
                  <li className={/[^a-zA-Z0-9]/.test(formData.newPassword) ? 'text-green-600 dark:text-green-400' : ''}>
                    {/[^a-zA-Z0-9]/.test(formData.newPassword) ? '✓' : '○'} 특수문자 포함
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="새 비밀번호를 다시 입력하세요"
                className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Match Indicator */}
            {formData.confirmPassword && (
              <div className="mt-2">
                {passwordsMatch ? (
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <Check className="w-4 h-4" />
                    <span>비밀번호가 일치합니다</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>비밀번호가 일치하지 않습니다</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              💡 <strong>안전한 비밀번호 만들기</strong><br />
              • 최소 8자 이상<br />
              • 대문자, 소문자, 숫자, 특수문자 조합<br />
              • 다른 사이트와 다른 비밀번호 사용<br />
              • 정기적인 비밀번호 변경 권장
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!formData.currentPassword || !formData.newPassword || !passwordsMatch || isSubmitting}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? '변경 중...' : '변경하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

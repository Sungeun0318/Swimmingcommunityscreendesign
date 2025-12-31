import React, { useState } from 'react';
import { X, Mail, Send, Check, MessageSquare, Bug, Lightbulb, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

type ContactType = 'general' | 'bug' | 'feature' | 'account';

export function ContactModal({ onClose }: ContactModalProps) {
  const [contactType, setContactType] = useState<ContactType>('general');
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const contactTypes = [
    {
      id: 'general' as ContactType,
      title: '일반 문의',
      icon: <MessageSquare className="w-5 h-5" />,
      description: '서비스 이용, 기능 설명 등',
      color: 'blue'
    },
    {
      id: 'bug' as ContactType,
      title: '버그 제보',
      icon: <Bug className="w-5 h-5" />,
      description: '오류, 버그 신고',
      color: 'red'
    },
    {
      id: 'feature' as ContactType,
      title: '기능 제안',
      icon: <Lightbulb className="w-5 h-5" />,
      description: '새로운 기능 아이디어',
      color: 'yellow'
    },
    {
      id: 'account' as ContactType,
      title: '계정 문의',
      icon: <AlertCircle className="w-5 h-5" />,
      description: '계정 관련 문제',
      color: 'purple'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.subject || !formData.message) return;

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
              문의가 접수되었습니다
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              빠른 시일 내에 이메일로 답변드리겠습니다
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedType = contactTypes.find(t => t.id === contactType);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">문의하기</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">
            무엇을 도와드릴까요?
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Contact Type */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3">
              문의 유형 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {contactTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setContactType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    contactType === type.id
                      ? 'border-blue-500 dark:border-cyan-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className={`p-2 rounded-lg inline-flex mb-2 ${
                    type.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                    type.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                    type.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                    'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  }`}>
                    {type.icon}
                  </div>
                  <h4 className="text-sm text-gray-900 dark:text-gray-100 mb-1">
                    {type.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {type.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              이메일 주소 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="답변 받을 이메일 주소"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="문의 제목을 입력하세요"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              문의 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="문의하실 내용을 자세히 작성해주세요"
              rows={8}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {formData.message.length} / 1000자
            </p>
          </div>

          {/* Info Boxes based on type */}
          {contactType === 'bug' && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <p className="text-sm text-red-800 dark:text-red-300">
                🐛 <strong>버그 제보 시 포함해주세요:</strong><br />
                • 발생한 문제의 상세 설명<br />
                • 문제가 발생한 화면/기능<br />
                • 재현 방법 (단계별)<br />
                • 스크린샷 (가능하다면)
              </p>
            </div>
          )}

          {contactType === 'feature' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                💡 <strong>기능 제안 시 포함해주세요:</strong><br />
                • 제안하는 기능의 상세 설명<br />
                • 어떤 문제를 해결하는지<br />
                • 기대되는 효과<br />
                • 참고할 만한 사례 (있다면)
              </p>
            </div>
          )}

          {contactType === 'account' && (
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
              <p className="text-sm text-purple-800 dark:text-purple-300">
                🔐 <strong>계정 문의 시 포함해주세요:</strong><br />
                • 계정 이메일 또는 사용자명<br />
                • 발생한 문제의 상세 설명<br />
                • 문제 발생 시점<br />
                ⚠️ 보안을 위해 비밀번호는 절대 포함하지 마세요
              </p>
            </div>
          )}

          {/* Contact Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <h4 className="text-sm text-blue-900 dark:text-blue-200 font-semibold mb-2">
              📧 직접 이메일 보내기
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
              {contactType === 'general' && 'support@swimcommunity.com'}
              {contactType === 'bug' && 'bug-report@swimcommunity.com'}
              {contactType === 'feature' && 'feature@swimcommunity.com'}
              {contactType === 'account' && 'account@swimcommunity.com'}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              평균 응답 시간: 영업일 기준 1-2일
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
              disabled={!formData.email || !formData.subject || !formData.message || isSubmitting}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                '전송 중...'
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  문의 보내기
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

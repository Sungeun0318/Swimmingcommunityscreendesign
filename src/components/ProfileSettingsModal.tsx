import React, { useState } from 'react';
import { X, Lock, HelpCircle, Mail, FileText, Award, LogOut, Trash2, ChevronRight, Bell, Moon, Sun } from 'lucide-react';
import { ChangePasswordModal } from './ChangePasswordModal';
import { HelpModal } from './HelpModal';
import { ContactModal } from './ContactModal';
import { TermsModal } from './TermsModal';
import { CoachVerificationModal } from './CoachVerificationModal';
import { LogoutConfirmModal } from './LogoutConfirmModal';
import { DeleteAccountModal } from './DeleteAccountModal';

interface ProfileSettingsModalProps {
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

type ModalType = 'password' | 'help' | 'contact' | 'terms' | 'coach' | 'logout' | 'delete' | null;

export function ProfileSettingsModal({ onClose, isDarkMode, onToggleDarkMode }: ProfileSettingsModalProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [notificationSettings, setNotificationSettings] = useState({
    likes: true,
    comments: true,
    follows: true,
    posts: true,
    system: true
  });

  const settingsSections = [
    {
      title: '계정',
      items: [
        {
          id: 'password' as ModalType,
          icon: <Lock className="w-5 h-5" />,
          label: '비밀번호 변경',
          description: '새로운 비밀번호로 변경',
          color: 'blue'
        },
        {
          id: 'coach' as ModalType,
          icon: <Award className="w-5 h-5" />,
          label: '코치 인증',
          description: 'SNS 연동 또는 서류 제출',
          color: 'purple'
        }
      ]
    },
    {
      title: '알림',
      items: [
        {
          id: 'notifications',
          icon: <Bell className="w-5 h-5" />,
          label: '알림 설정',
          description: '푸시 알림 관리',
          color: 'orange',
          isToggle: true
        }
      ]
    },
    {
      title: '모양',
      items: [
        {
          id: 'theme',
          icon: isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />,
          label: '다크 모드',
          description: isDarkMode ? '다크 모드 켜짐' : '라이트 모드 켜짐',
          color: 'gray',
          isToggle: true,
          toggleValue: isDarkMode,
          onToggle: onToggleDarkMode
        }
      ]
    },
    {
      title: '지원',
      items: [
        {
          id: 'help' as ModalType,
          icon: <HelpCircle className="w-5 h-5" />,
          label: '도움말',
          description: 'FAQ 및 사용 가이드',
          color: 'green'
        },
        {
          id: 'contact' as ModalType,
          icon: <Mail className="w-5 h-5" />,
          label: '문의하기',
          description: '버그 제보 및 기능 제안',
          color: 'cyan'
        },
        {
          id: 'terms' as ModalType,
          icon: <FileText className="w-5 h-5" />,
          label: '약관 및 정책',
          description: '이용약관, 개인정보처리방침',
          color: 'indigo'
        }
      ]
    },
    {
      title: '계정 관리',
      items: [
        {
          id: 'logout' as ModalType,
          icon: <LogOut className="w-5 h-5" />,
          label: '로그아웃',
          description: '현재 계정에서 로그아웃',
          color: 'orange'
        },
        {
          id: 'delete' as ModalType,
          icon: <Trash2 className="w-5 h-5" />,
          label: '회원 탈퇴',
          description: '계정 및 모든 데이터 삭제',
          color: 'red'
        }
      ]
    }
  ];

  const handleItemClick = (id: string) => {
    if (id === 'notifications' || id === 'theme') {
      // Toggle items don't open modals
      return;
    }
    setActiveModal(id as ModalType);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setActiveModal(null);
    onClose();
    // Here you would actually log out the user
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      gray: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
      red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
        <div className="bg-white dark:bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-white">설정</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-white/80 text-sm mt-1">
              계정 및 앱 설정 관리
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {settingsSections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 px-2">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className="w-full p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-cyan-500 transition-all text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`p-2 rounded-lg ${getColorClasses(item.color)}`}>
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                                {item.label}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          {item.isToggle && item.onToggle ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                item.onToggle();
                              }}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                item.toggleValue
                                  ? 'bg-blue-500 dark:bg-cyan-500'
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            >
                              <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                  item.toggleValue ? 'translate-x-6' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          ) : item.isToggle ? (
                            <div className="text-gray-400">
                              <ChevronRight className="w-5 h-5" />
                            </div>
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* App Version */}
              <div className="text-center pt-4 pb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  버전 1.0.0
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  © 2025 Swim Community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'password' && (
        <ChangePasswordModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'help' && (
        <HelpModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'contact' && (
        <ContactModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'terms' && (
        <TermsModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'coach' && (
        <CoachVerificationModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'logout' && (
        <LogoutConfirmModal
          onClose={() => setActiveModal(null)}
          onConfirm={handleLogout}
        />
      )}
      {activeModal === 'delete' && (
        <DeleteAccountModal onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}

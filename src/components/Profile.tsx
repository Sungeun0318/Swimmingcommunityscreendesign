import React from 'react';
import { ChevronRight, Crown, CreditCard, Lock, HelpCircle, FileText, MessageSquare, UserX, Receipt, LogOut, UserMinus, Moon, Sun, User, Mail, Phone, Calendar, Bell, Heart, Trophy, MessageCircle, Users, Award } from 'lucide-react';
import { PremiumSubscriptionModal } from './PremiumSubscriptionModal';
import { CoachVerificationModal } from './CoachVerificationModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { HelpModal } from './HelpModal';
import { ContactModal } from './ContactModal';
import { TermsModal } from './TermsModal';
import { LogoutConfirmModal } from './LogoutConfirmModal';
import { DeleteAccountModal } from './DeleteAccountModal';

interface ProfileProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Profile({ isDarkMode, onToggleDarkMode }: ProfileProps) {
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<'profile' | 'notifications'>('profile');
  const [showPremiumModal, setShowPremiumModal] = React.useState(false);
  const [showCoachVerificationModal, setShowCoachVerificationModal] = React.useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = React.useState(false);
  const [showHelpModal, setShowHelpModal] = React.useState(false);
  const [showContactModal, setShowContactModal] = React.useState(false);
  const [showTermsModal, setShowTermsModal] = React.useState(false);
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = React.useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = React.useState(false);

  const user = {
    name: '김수영',
    email: 'kimswimmer@email.com',
    phone: '010-1234-5678',
    birthDate: '1995.03.15',
    avatar: 'https://images.unsplash.com/photo-1598821835763-4d757e7224e6?w=200&h=200&fit=crop',
    club: '서울수영클럽',
    isPremium: false
  };

  const settingSections = [
    {
      title: '계정',
      items: [
        { icon: Crown, label: '프리미엄 구독', description: '광고 없이 모든 기능 이용', color: 'text-yellow-600 dark:text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30', action: 'premium' },
        { icon: Award, label: '코치 인증', description: '전문 코치 인증으로 신뢰도 UP', color: 'text-blue-600 dark:text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30', action: 'coach-verification' },
        { icon: Lock, label: '비밀번호 변경', description: '계정 보안 설정', color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-800', action: 'password' }
      ]
    },
    {
      title: '지원',
      items: [
        { icon: HelpCircle, label: '도움말', description: '자주 묻는 질문', color: 'text-green-600 dark:text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30', action: 'help' },
        { icon: MessageSquare, label: '문의하기', description: '1:1 문의 및 제안', color: 'text-purple-600 dark:text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/30', action: 'contact' },
        { icon: FileText, label: '약관 및 정책', description: '이용약관, 개인정보처리방침', color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-800', action: 'terms' }
      ]
    }
  ];

  const handleSettingClick = (action: string) => {
    console.log(`Setting clicked: ${action}`);
    // 여기서 각 설정 페이지로 이동하거나 모달을 열 수 있습니다
    if (action === 'premium') {
      setShowPremiumModal(true);
    } else if (action === 'coach-verification') {
      setShowCoachVerificationModal(true);
    } else if (action === 'password') {
      setShowChangePasswordModal(true);
    } else if (action === 'help') {
      setShowHelpModal(true);
    } else if (action === 'contact') {
      setShowContactModal(true);
    } else if (action === 'terms') {
      setShowTermsModal(true);
    }
  };

  const notifications = [
    {
      id: 1,
      type: 'challenge',
      icon: Trophy,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      title: '새로운 챌린지 오픈!',
      message: '서울수영클럽에서 "12월 50km 챌린지"를 시작했습니다.',
      time: '방금',
      read: false
    },
    {
      id: 2,
      type: 'like',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      title: '좋아요',
      message: '김수영 코치님이 회원님의 훈련 프로그램을 좋아합니다.',
      time: '5분 전',
      read: false
    },
    {
      id: 3,
      type: 'comment',
      icon: MessageCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      title: '댓글',
      message: '박지훈님: "이 프로그램 정말 좋네요! 따라해봐야겠어요 👍"',
      time: '1시간 전',
      read: false
    },
    {
      id: 4,
      type: 'achievement',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      title: '트로피 획득!',
      message: '"7일 연속 수영" 트로피를 획득했습니다! 🔥',
      time: '2시간 전',
      read: true
    },
    {
      id: 5,
      type: 'follower',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      title: '새로운 팔로워',
      message: '강수영님이 회원님을 팔로우하기 시작했습니다.',
      time: '1일 전',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Tab Selector */}
      <div className="flex gap-2 bg-white dark:bg-card rounded-2xl p-2 shadow-sm transition-colors duration-300">
        <button
          onClick={() => setActiveSection('profile')}
          className={`flex-1 py-2 px-4 rounded-xl transition-all ${
            activeSection === 'profile'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          프로필
        </button>
        <button
          onClick={() => setActiveSection('notifications')}
          className={`flex-1 py-2 px-4 rounded-xl transition-all relative ${
            activeSection === 'notifications'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          알림
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Profile Section */}
      {activeSection === 'profile' && (
        <>
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 rounded-2xl p-6 text-white transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img 
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-white/30"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  📷
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl mb-1">{user.name}</h2>
                <p className="text-white/80 text-sm">{user.club}</p>
                {user.isPremium && (
                  <div className="mt-2 inline-flex items-center gap-1 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    <Crown className="w-4 h-4 text-yellow-300" />
                    <span>프리미엄 회원</span>
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl py-3 transition-colors flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>프로필 수정</span>
            </button>
          </div>

          {/* Edit Profile Section */}
          {isEditingProfile && (
            <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-colors duration-300 space-y-4">
              <h3 className="text-gray-900 dark:text-gray-100 mb-4">개인정보 수정</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">이름</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <User className="w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">이메일</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">전화번호</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <input 
                      type="tel" 
                      defaultValue={user.phone}
                      className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">생년월일</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      defaultValue={user.birthDate}
                      className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white py-3 rounded-xl hover:opacity-90 transition-opacity">
                    저장
                  </button>
                  <button 
                    onClick={() => setIsEditingProfile(false)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {isDarkMode ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-yellow-600" />}
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-gray-100">다크 모드</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">화면 테마 변경</p>
                </div>
              </div>
              <button
                onClick={onToggleDarkMode}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Settings Sections */}
          {settingSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-colors duration-300">
              <h3 className="text-gray-900 dark:text-gray-100 mb-4">{section.title}</h3>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => handleSettingClick(item.action)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bgColor}`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-gray-900 dark:text-gray-100">{item.label}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Danger Zone */}
          <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-colors duration-300">
            <h3 className="text-gray-900 dark:text-gray-100 mb-4">계정 관리</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowLogoutConfirmModal(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-100 dark:bg-orange-900/30">
                  <LogOut className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-gray-900 dark:text-gray-100">로그아웃</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">현재 계정에서 로그아웃</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => setShowDeleteAccountModal(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/30">
                  <UserMinus className="w-5 h-5 text-red-600 dark:text-red-500" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-red-600 dark:text-red-500">회원 탈퇴</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">모든 데이터가 삭제됩니다</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* App Version */}
          <div className="text-center text-sm text-gray-400 dark:text-gray-500 pb-4">
            <p>Swim Community v1.0.0</p>
            <p className="text-xs mt-1">© 2024 All rights reserved</p>
          </div>
        </>
      )}

      {/* Notifications Section */}
      {activeSection === 'notifications' && (
        <>
          {/* Notifications Header */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 rounded-2xl p-6 text-white transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img 
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-white/30"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  📷
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl mb-1">{user.name}</h2>
                <p className="text-white/80 text-sm">{user.club}</p>
                {user.isPremium && (
                  <div className="mt-2 inline-flex items-center gap-1 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    <Crown className="w-4 h-4 text-yellow-300" />
                    <span>프리미엄 회원</span>
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl py-3 transition-colors flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>프로필 수정</span>
            </button>
          </div>

          {/* Edit Profile Section */}
          {isEditingProfile && (
            <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-colors duration-300 space-y-4">
              <h3 className="text-gray-900 dark:text-gray-100 mb-4">개인정보 수정</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">이름</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <User className="w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">이메일</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">전화번호</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <input 
                      type="tel" 
                      defaultValue={user.phone}
                      className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">생년월일</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      defaultValue={user.birthDate}
                      className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white py-3 rounded-xl hover:opacity-90 transition-opacity">
                    저장
                  </button>
                  <button 
                    onClick={() => setIsEditingProfile(false)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {isDarkMode ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-yellow-600" />}
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-gray-100">다크 모드</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">화면 테마 변경</p>
                </div>
              </div>
              <button
                onClick={onToggleDarkMode}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-colors duration-300">
            <h3 className="text-gray-900 dark:text-gray-100 mb-4">알림</h3>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    notification.read ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.bgColor}`}>
                    <notification.icon className={`w-5 h-5 ${notification.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-gray-900 dark:text-gray-100">{notification.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* App Version */}
          <div className="text-center text-sm text-gray-400 dark:text-gray-500 pb-4">
            <p>Swim Community v1.0.0</p>
            <p className="text-xs mt-1">© 2024 All rights reserved</p>
          </div>
        </>
      )}

      {/* Premium Subscription Modal */}
      {showPremiumModal && (
        <PremiumSubscriptionModal
          onClose={() => setShowPremiumModal(false)}
        />
      )}

      {/* Coach Verification Modal */}
      {showCoachVerificationModal && (
        <CoachVerificationModal
          onClose={() => setShowCoachVerificationModal(false)}
        />
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
        />
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <HelpModal
          onClose={() => setShowHelpModal(false)}
        />
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal
          onClose={() => setShowContactModal(false)}
        />
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <TermsModal
          onClose={() => setShowTermsModal(false)}
        />
      )}

      {/* Logout Confirm Modal */}
      {showLogoutConfirmModal && (
        <LogoutConfirmModal
          onClose={() => setShowLogoutConfirmModal(false)}
          onConfirm={() => {
            console.log('Logging out...');
            setShowLogoutConfirmModal(false);
            // Here you would actually log out the user
          }}
        />
      )}

      {/* Delete Account Modal */}
      {showDeleteAccountModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteAccountModal(false)}
        />
      )}
    </div>
  );
}
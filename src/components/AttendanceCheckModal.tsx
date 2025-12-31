import React, { useState } from 'react';
import { X, Calendar, CheckCircle, Award, Flame } from 'lucide-react';

interface AttendanceCheckModalProps {
  onClose: () => void;
}

export function AttendanceCheckModal({ onClose }: AttendanceCheckModalProps) {
  const [totalAttendance] = useState(23); // 누적 출석
  const [todayChecked, setTodayChecked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const badges = [
    { count: 3, name: '첫걸음', icon: '🌱', unlocked: totalAttendance >= 3 },
    { count: 7, name: '일주일', icon: '⭐', unlocked: totalAttendance >= 7 },
    { count: 14, name: '2주 챔피언', icon: '🏅', unlocked: totalAttendance >= 14 },
    { count: 30, name: '한달 챌린저', icon: '🏆', unlocked: totalAttendance >= 30 },
    { count: 60, name: '두달 마스터', icon: '👑', unlocked: totalAttendance >= 60 },
    { count: 100, name: '백일 레전드', icon: '💎', unlocked: totalAttendance >= 100 }
  ];

  const handleCheckIn = () => {
    setTodayChecked(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const nextBadge = badges.find(b => !b.unlocked);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 relative overflow-hidden">
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: '1s'
                  }}
                >
                  {['🎉', '✨', '⭐', '🌟'][Math.floor(Math.random() * 4)]}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">출석 체크</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">매일 출석하고 뱃지를 모아보세요!</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Today's Check-in */}
          <div className="text-center">
            {!todayChecked ? (
              <button
                onClick={handleCheckIn}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Calendar className="w-16 h-16 text-white" />
                </div>
                <p className="mt-4 text-lg text-gray-900 dark:text-gray-100">출석 체크하기</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">클릭하여 오늘의 출석을 기록하세요</p>
              </button>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                  <CheckCircle className="relative w-20 h-20 text-green-500 dark:text-green-400 mx-auto" />
                </div>
                <div>
                  <h3 className="text-2xl text-gray-900 dark:text-gray-100">출석 완료! 🎉</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    내일도 또 만나요!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Attendance Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="text-center mb-4">
              <div className="text-4xl text-blue-600 dark:text-cyan-400 mb-2">
                {todayChecked ? totalAttendance + 1 : totalAttendance}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">누적 출석 일수</p>
            </div>

            {nextBadge && (
              <div className="text-center pt-4 border-t border-blue-200 dark:border-blue-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">다음 뱃지까지</p>
                <div className="flex items-center justify-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-lg text-gray-900 dark:text-gray-100">
                    {nextBadge.count - (todayChecked ? totalAttendance + 1 : totalAttendance)}일 남음
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Badges Collection */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              출석 뱃지 컬렉션
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.count}
                  className={`relative rounded-xl p-4 text-center transition-all ${
                    badge.unlocked
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-300 dark:border-yellow-600'
                      : 'bg-gray-100 dark:bg-gray-800 opacity-50'
                  }`}
                >
                  {badge.unlocked && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p className={`text-xs mb-1 ${badge.unlocked ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {badge.name}
                  </p>
                  <p className={`text-xs ${badge.unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                    {badge.count}일
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              💡 출석은 하루에 한 번만 인정됩니다. 하루를 쉬어도 누적 출석은 계속 유지되니 걱정하지 마세요!
            </p>
          </div>
        </div>

        {/* Footer Button */}
        {todayChecked && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

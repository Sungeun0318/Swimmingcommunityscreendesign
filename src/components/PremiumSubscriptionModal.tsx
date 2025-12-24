import React, { useState } from 'react';
import { X, Crown, Check, Sparkles, Zap, Star, Shield, TrendingUp, Users, Wifi, Gift } from 'lucide-react';

interface PremiumSubscriptionModalProps {
  onClose: () => void;
}

export function PremiumSubscriptionModal({ onClose }: PremiumSubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      id: 'monthly',
      name: '월간',
      price: '18,000',
      period: '월',
      pricePerDay: '600',
      discount: null,
      popular: false
    },
    {
      id: 'yearly',
      name: '연간',
      price: '150,000',
      period: '년',
      pricePerDay: '411',
      discount: '33% 할인',
      popular: true,
      savings: '66,000'
    }
  ];

  const features = [
    { icon: Sparkles, text: '퀵스타트 훈련', description: '운영자가 제작한 훈련 프로그램', isFree: true },
    { icon: Star, text: '커뮤니티 훈련 실행', description: '다른 사용자가 공유한 훈련 바로 시작', isFree: true },
    { icon: Zap, text: '커스텀 훈련 설정', description: '내가 원하는 시간과 방식으로 자유롭게 설정', isFree: false },
    { icon: TrendingUp, text: '훈련 기록 및 분석', description: '내 훈련 히스토리 저장 및 통계', isFree: true },
    { icon: Users, text: '커뮤니티 열람 및 참여', description: '게시물 작성, 댓글, 공유', isFree: true },
    { icon: Gift, text: '광고 제거', description: '방해 없는 깨끗한 훈련 환경', isFree: false },
    { icon: Wifi, text: '음성 출발 신호 변경', description: '다양한 출발 신호음 선택', isFree: false },
    { icon: Shield, text: '타종 타이머', description: '여러 선수 동시 훈련 모드', isFree: false },
    { icon: Crown, text: '복수선수 모드', description: '팀 훈련에 최적화된 기능', isFree: false },
    { icon: Check, text: '모든 프리미엄 기능', description: '제한 없이 모든 기능 이용', isFree: false }
  ];

  const handleSubscribe = () => {
    console.log(`Subscribing to ${selectedPlan} plan`);
    // Here you would handle the actual payment process
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[95vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header with Crown Animation */}
        <div className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 dark:from-yellow-500 dark:via-amber-600 dark:to-orange-600 p-6 pb-12">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Content */}
          <div className="relative text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 animate-bounce">
              <Crown className="w-12 h-12 text-yellow-100" />
            </div>
            <h2 className="text-3xl mb-2 flex items-center justify-center gap-2">
              프리미엄 가입
              <Sparkles className="w-6 h-6 animate-pulse" />
            </h2>
            <p className="text-white/90 text-sm">당신의 훈련 잠재력을 최대한 활용하세요</p>
          </div>

          {/* Floating Icons */}
          <div className="absolute bottom-4 left-4 opacity-30">
            <Star className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="absolute top-16 right-8 opacity-30">
            <Sparkles className="w-5 h-5 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Plan Selection */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
              플랜 선택
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id as 'monthly' | 'yearly')}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    selectedPlan === plan.id
                      ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg scale-105'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-yellow-300 dark:hover:border-yellow-600'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full shadow-lg flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      베스트
                    </div>
                  )}
                  {plan.discount && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {plan.discount}
                    </div>
                  )}
                  <div className="text-left">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{plan.name}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl text-gray-900 dark:text-gray-100">₩{plan.price}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-500">/{plan.period}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      ₩{plan.pricePerDay}/일
                    </div>
                    {plan.savings && (
                      <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                        ₩{plan.savings} 절약
                      </div>
                    )}
                  </div>
                  {selectedPlan === plan.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-500" />
              무료 vs 프리미엄 비교
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                    feature.isFree
                      ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                      : 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    feature.isFree
                      ? 'bg-gray-200 dark:bg-gray-700'
                      : 'bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30'
                  }`}>
                    <feature.icon className={`w-5 h-5 ${
                      feature.isFree
                        ? 'text-gray-600 dark:text-gray-400'
                        : 'text-yellow-600 dark:text-yellow-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-gray-900 dark:text-gray-100">{feature.text}</span>
                      {feature.isFree ? (
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                          무료
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded-full flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          프리미엄
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</div>
                  </div>
                  {feature.isFree ? (
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  ) : (
                    <Check className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white dark:border-gray-800" />
                ))}
              </div>
              <div>
                <div className="text-gray-900 dark:text-gray-100 flex items-center gap-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-1">4.9/5</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">12,000명 이상의 수영인</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              "프리미엄 멤버십이 제 훈련 루틴을 완전히 바꿔놨어요. 프로 코치의 독점 콘텐츠는 정말 가치가 있어요!"
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">- 김수영, 경영 선수</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-card space-y-3">
          {/* Total */}
          <div className="flex items-center justify-between px-2">
            <div className="text-gray-600 dark:text-gray-400">
              {selectedPlan === 'yearly' ? '연간 플랜' : '월간 플랜'}
            </div>
            <div>
              <div className="text-2xl text-gray-900 dark:text-gray-100">
                ₩{plans.find(p => p.id === selectedPlan)?.price}
              </div>
              <div className="text-xs text-right text-gray-500 dark:text-gray-500">
                {selectedPlan === 'yearly' ? '연간 결제' : '월간 결제'}
              </div>
            </div>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            className="w-full py-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 dark:from-yellow-500 dark:via-amber-600 dark:to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Crown className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="text-lg">지금 구독하기</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </button>

          {/* Terms */}
          <p className="text-xs text-center text-gray-500 dark:text-gray-500">
            구독 시{' '}
            <button className="text-blue-600 dark:text-blue-400 hover:underline">서비스 이용약관</button>
            {' '}및{' '}
            <button className="text-blue-600 dark:text-blue-400 hover:underline">개인정보처리방침</button>
            {' '}에 동의하게 됩니다
          </p>
        </div>
      </div>
    </div>
  );
}
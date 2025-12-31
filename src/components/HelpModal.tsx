import React, { useState } from 'react';
import { X, HelpCircle, ChevronRight, Search, MessageCircle, Book, Video, Mail } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

type HelpCategory = {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: {
    question: string;
    answer: string;
  }[];
};

export function HelpModal({ onClose }: HelpModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const helpCategories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: '시작하기',
      icon: <Book className="w-5 h-5" />,
      items: [
        {
          question: '회원가입은 어떻게 하나요?',
          answer: '앱 하단의 "프로필" 탭에서 회원가입을 진행할 수 있습니다. 이메일 또는 소셜 로그인(구글, 카카오)을 통해 간편하게 가입하실 수 있습니다.'
        },
        {
          question: '프로필은 어떻게 설정하나요?',
          answer: '프로필 탭 > 우측 상단 설정 아이콘 > 프로필 편집에서 닉네임, 프로필 사진, 자기소개 등을 수정할 수 있습니다.'
        },
        {
          question: '훈련 프로그램은 어디서 찾나요?',
          answer: '하단의 "훈련" 탭에서 다양한 수영 훈련 프로그램을 찾을 수 있습니다. 레벨별, 목적별로 필터링하여 본인에게 맞는 훈련을 선택하세요.'
        }
      ]
    },
    {
      id: 'features',
      title: '주요 기능',
      icon: <Video className="w-5 h-5" />,
      items: [
        {
          question: '스케줄러는 어떻게 사용하나요?',
          answer: '스케줄러 탭에서 오늘 한 운동과 앞으로 할 운동을 기록할 수 있습니다. 훈련을 추가하고, 완료 체크를 하면 자동으로 통계가 기록됩니다.'
        },
        {
          question: '퀵스타트 기능이 무엇인가요?',
          answer: '퀵스타트는 이전에 저장한 훈련을 빠르게 시작할 수 있는 기능입니다. 자주 하는 훈련을 저장해두면 한 번의 클릭으로 시작할 수 있습니다.'
        },
        {
          question: '레벨과 XP는 어떻게 올리나요?',
          answer: '훈련 완료, 출석 체크, 피드 공유, 댓글 작성 등 다양한 활동을 통해 XP를 획득할 수 있습니다. 일정 XP에 도달하면 레벨이 올라갑니다.'
        },
        {
          question: '배지는 어떻게 획득하나요?',
          answer: '출석 체크 누적(3/7/14/30/60/100회), 훈련 달성, 챌린지 완료 등 특정 목표를 달성하면 배지를 획득할 수 있습니다.'
        }
      ]
    },
    {
      id: 'community',
      title: '커뮤니티',
      icon: <MessageCircle className="w-5 h-5" />,
      items: [
        {
          question: '게시물은 어떻게 작성하나요?',
          answer: '커뮤니티 탭 하단의 "+" 버튼을 눌러 게시물을 작성할 수 있습니다. 훈련 기록, 사진, 동영상 등을 공유하세요.'
        },
        {
          question: '인기 게시물은 어떻게 선정되나요?',
          answer: '최근 24시간 동안의 좋아요(×1), 댓글(×3), 저장(×5) 점수를 합산하여 인기 게시물이 선정됩니다.'
        },
        {
          question: '부적절한 게시물은 어떻게 신고하나요?',
          answer: '게시물 우측 상단의 "..." 메뉴에서 "신고하기"를 선택할 수 있습니다. 신고가 3회 누적되면 자동으로 숨김 처리됩니다.'
        },
        {
          question: '댓글을 수정/삭제할 수 있나요?',
          answer: '본인이 작성한 댓글은 언제든지 수정하거나 삭제할 수 있습니다. 댓글을 길게 누르면 수정/삭제 옵션이 나타납니다.'
        }
      ]
    },
    {
      id: 'coach',
      title: '코치 인증',
      icon: <HelpCircle className="w-5 h-5" />,
      items: [
        {
          question: '코치 인증은 어떻게 받나요?',
          answer: '프로필 > 설정 > 코치 인증에서 신청할 수 있습니다. SNS 계정 연동 또는 증빙 자료 제출 방식 중 선택하여 인증받을 수 있습니다.'
        },
        {
          question: '코치 인증 레벨의 차이는 무엇인가요?',
          answer: '인증 코치(👤), 헤드 코치(⭐), 마스터 코치(🏆) 3단계로 구분됩니다. 레벨이 높을수록 더 많은 혜택과 노출 우선순위가 부여됩니다.'
        },
        {
          question: 'SNS 인증은 어떤 조건이 필요한가요?',
          answer: '인증 코치는 팔로워 500+ 또는 수영 콘텐츠 30+, 헤드 코치는 2,000+ 또는 100+, 마스터 코치는 5,000+ 또는 200+가 필요합니다.'
        }
      ]
    },
    {
      id: 'account',
      title: '계정 관리',
      icon: <Mail className="w-5 h-5" />,
      items: [
        {
          question: '비밀번호를 잊어버렸어요',
          answer: '로그인 화면에서 "비밀번호 찾기"를 클릭하여 등록된 이메일로 재설정 링크를 받을 수 있습니다.'
        },
        {
          question: '이메일을 변경하고 싶어요',
          answer: '프로필 > 설정 > 계정 정보에서 이메일을 변경할 수 있습니다. 새 이메일로 인증 메일이 발송되며, 인증 완료 후 변경됩니다.'
        },
        {
          question: '회원 탈퇴는 어떻게 하나요?',
          answer: '프로필 > 설정 > 회원 탈퇴에서 진행할 수 있습니다. 즉시 탈퇴 또는 7일 후 탈퇴 중 선택할 수 있습니다.'
        },
        {
          question: '알림 설정을 변경하고 싶어요',
          answer: '프로필 > 설정 > 알림 설정에서 댓글, 좋아요, 팔로우 등 각 항목별로 알림을 켜거나 끌 수 있습니다.'
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const currentCategory = helpCategories.find(cat => cat.id === selectedCategory);

  // Filter items based on search
  const filteredItems = currentCategory?.items.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">도움말</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">
            {selectedCategory ? '자주 묻는 질문' : '궁금한 내용을 찾아보세요'}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedCategory ? (
            /* Category List */
            <div className="space-y-3">
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-4">
                카테고리를 선택하세요
              </h3>
              {helpCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-cyan-500 bg-white dark:bg-gray-800 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        {category.icon}
                      </div>
                      <div>
                        <h4 className="text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {category.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {category.items.length}개 항목
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}

              {/* Contact Support */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
                <h4 className="text-gray-900 dark:text-gray-100 mb-2">
                  💬 원하는 답변을 찾지 못하셨나요?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  문의하기를 통해 직접 질문해주세요
                </p>
                <a
                  href="mailto:support@swimcommunity.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-cyan-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-cyan-700 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  문의하기
                </a>
              </div>
            </div>
          ) : (
            /* FAQ List */
            <div className="space-y-4">
              {/* Back Button */}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                  setExpandedItems(new Set());
                }}
                className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 hover:underline mb-4"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>카테고리로 돌아가기</span>
              </button>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="질문 검색..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Category Title */}
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  {currentCategory?.icon}
                </div>
                <h3 className="text-lg text-gray-900 dark:text-gray-100">
                  {currentCategory?.title}
                </h3>
              </div>

              {/* FAQ Items */}
              {filteredItems && filteredItems.length > 0 ? (
                <div className="space-y-3">
                  {filteredItems.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-blue-600 dark:text-cyan-400 mt-0.5">Q.</span>
                          <span className="text-gray-900 dark:text-gray-100">
                            {item.question}
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                            expandedItems.has(index) ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                      {expandedItems.has(index) && (
                        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                          <div className="flex gap-3">
                            <span className="text-green-600 dark:text-green-400 mt-0.5">A.</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    검색 결과가 없습니다
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

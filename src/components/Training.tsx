import React, { useState } from 'react';
import { Plus, Zap, Lock, ChevronRight, Trophy } from 'lucide-react';

interface TrainingProps {
  onCreateCustom: () => void;
}

export function Training({ onCreateCustom }: TrainingProps) {
  const [selectedLevel, setSelectedLevel] = useState('초급');

  const levels = ['초급', '중급', '상급', '마스터'];

  const quickStartPrograms = {
    '초급': [
      { 
        week: 1, 
        title: '수영 입문 - 1주차', 
        description: '기본 자세와 호흡 연습', 
        unlocked: true,
        completed: true,
        distance: '1.0km',
        sessions: 3
      },
      { 
        week: 2, 
        title: '수영 입문 - 2주차', 
        description: '자유형 기본 스트로크', 
        unlocked: true,
        completed: false,
        distance: '1.2km',
        sessions: 3
      },
      { 
        week: 3, 
        title: '수영 입문 - 3주차', 
        description: '지구력 향상 기초', 
        unlocked: false,
        completed: false,
        distance: '1.5km',
        sessions: 3
      },
      { 
        week: 4, 
        title: '수영 입문 - 4주차', 
        description: '배영 입문', 
        unlocked: false,
        completed: false,
        distance: '1.8km',
        sessions: 4
      }
    ],
    '중급': [
      { 
        week: 1, 
        title: '중급 훈련 - 1주차', 
        description: '4영법 기초 다지기', 
        unlocked: true,
        completed: true,
        distance: '2.0km',
        sessions: 4
      },
      { 
        week: 2, 
        title: '중급 훈련 - 2주차', 
        description: '지구력 강화', 
        unlocked: true,
        completed: true,
        distance: '2.5km',
        sessions: 4
      },
      { 
        week: 3, 
        title: '중급 훈련 - 3주차', 
        description: '스피드 훈련 시작', 
        unlocked: true,
        completed: false,
        distance: '2.8km',
        sessions: 5
      },
      { 
        week: 4, 
        title: '중급 훈련 - 4주차', 
        description: '혼영(IM) 도전', 
        unlocked: false,
        completed: false,
        distance: '3.0km',
        sessions: 5
      }
    ],
    '상급': [
      { 
        week: 1, 
        title: '상급 훈련 - 1주차', 
        description: '고강도 인터벌', 
        unlocked: true,
        completed: false,
        distance: '3.5km',
        sessions: 5
      },
      { 
        week: 2, 
        title: '상급 훈련 - 2주차', 
        description: '장거리 지구력', 
        unlocked: false,
        completed: false,
        distance: '4.0km',
        sessions: 5
      },
      { 
        week: 3, 
        title: '상급 훈련 - 3주차', 
        description: '페이스 조절 훈련', 
        unlocked: false,
        completed: false,
        distance: '4.5km',
        sessions: 6
      },
      { 
        week: 4, 
        title: '상급 훈련 - 4주차', 
        description: '레이스 시뮬레이션', 
        unlocked: false,
        completed: false,
        distance: '5.0km',
        sessions: 6
      }
    ],
    '마스터': [
      { 
        week: 1, 
        title: '마스터 훈련 - 1주차', 
        description: '전문가 수준 기술 훈련', 
        unlocked: false,
        completed: false,
        distance: '5.5km',
        sessions: 6
      },
      { 
        week: 2, 
        title: '마스터 훈련 - 2주차', 
        description: '최대 강도 훈련', 
        unlocked: false,
        completed: false,
        distance: '6.0km',
        sessions: 6
      },
      { 
        week: 3, 
        title: '마스터 훈련 - 3주차', 
        description: '경기력 향상', 
        unlocked: false,
        completed: false,
        distance: '6.5km',
        sessions: 7
      },
      { 
        week: 4, 
        title: '마스터 훈련 - 4주차', 
        description: '피크 퍼포먼스', 
        unlocked: false,
        completed: false,
        distance: '7.0km',
        sessions: 7
      }
    ]
  };

  const currentPrograms = quickStartPrograms[selectedLevel as keyof typeof quickStartPrograms];

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">훈련</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">나만의 프로그램을 만들거나 퀵스타트로 시작하세요</p>
      </div>

      {/* Create Custom Program */}
      <button
        onClick={onCreateCustom}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-2xl p-6 hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2">
              <Plus className="w-6 h-6" />
              <h3 className="text-xl">커스텀 훈련 작성</h3>
            </div>
            <p className="text-sm text-white/80">나만의 훈련 프로그램을 직접 만들어보세요</p>
          </div>
          <ChevronRight className="w-6 h-6" />
        </div>
      </button>

      {/* Quick Start Section */}
      <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-500" />
          <h3 className="text-gray-900 dark:text-card-foreground">퀵스타트 프로그램</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-muted-foreground mb-4">
          단계별로 레벨업하는 구조화된 프로그램입니다. 이번 주 훈련을 모두 완료하면 다음 주차가 해금됩니다!
        </p>

        {/* Level Selector */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedLevel === level
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Program List */}
        <div className="space-y-3">
          {currentPrograms.map((program, index) => (
            <div
              key={program.week}
              className={`relative border-2 rounded-xl p-4 transition-all ${
                program.unlocked
                  ? program.completed
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
                    : 'border-blue-300 dark:border-blue-700 bg-white dark:bg-card hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60'
              }`}
            >
              {/* Week Badge */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    program.completed
                      ? 'bg-green-500 text-white'
                      : program.unlocked
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                  }`}>
                    {program.completed ? '✓' : program.week}
                  </div>
                  <div>
                    <h4 className={`${program.unlocked ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-500'}`}>
                      {program.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{program.description}</p>
                  </div>
                </div>

                {!program.unlocked && (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
                {program.completed && (
                  <Trophy className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              {/* Program Details */}
              <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mt-3">
                <span className="flex items-center gap-1">
                  📍 {program.distance}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  🏊 주 {program.sessions}회
                </span>
              </div>

              {/* Action Button */}
              {program.unlocked && !program.completed && (
                <button className="w-full mt-3 py-2 bg-blue-500 dark:bg-cyan-500 text-white rounded-lg text-sm hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors">
                  시작하기
                </button>
              )}

              {program.completed && (
                <div className="mt-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm text-center">
                  완료!
                </div>
              )}

              {/* Progress Line to Next Week */}
              {index < currentPrograms.length - 1 && (
                <div className="absolute left-6 -bottom-3 w-0.5 h-3 bg-gray-300 dark:bg-gray-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

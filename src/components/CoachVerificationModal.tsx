import React, { useState } from 'react';
import { X, Award, Upload, Mail, Check, Clock, CheckCircle, Camera, Instagram, Youtube, Share2, FileText } from 'lucide-react';

interface CoachVerificationModalProps {
  onClose: () => void;
}

type VerificationStep = 'select-level' | 'select-method' | 'sns-form' | 'document-form' | 'submitted';
type CoachLevel = 'coach' | 'head-coach' | 'master-coach';
type VerificationMethod = 'sns' | 'documents' | null;

export function CoachVerificationModal({ onClose }: CoachVerificationModalProps) {
  const [step, setStep] = useState<VerificationStep>('select-level');
  const [selectedLevel, setSelectedLevel] = useState<CoachLevel>('coach');
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod>(null);
  const [formData, setFormData] = useState({
    clubName: '',
    clubEmail: '',
    experience: '',
    instagramUrl: '',
    youtubeUrl: '',
    instagramFollowers: '',
    youtubeSubscribers: '',
    emailVerified: false
  });
  const [uploadedFiles, setUploadedFiles] = useState<{
    doc1?: File;
    doc2?: File;
    doc3?: File;
  }>({});

  const coachLevels = [
    {
      id: 'coach' as CoachLevel,
      title: '인증 코치',
      badge: '👤',
      requirements: [
        'SNS 계정 연동 OR 증빙 자료 1개',
        '클럽 소속 증명',
        '기본 정보 입력'
      ],
      benefits: [
        '"인증 코치" 뱃지 부여',
        '피드에서 강조 표시',
        '신뢰도 향상'
      ],
      duration: '1-2일 소요',
      snsRequirements: '팔로워 500+ OR 수영 콘텐츠 30+',
      documentRequirements: '증빙 자료 1개 이상'
    },
    {
      id: 'head-coach' as CoachLevel,
      title: '헤드 코치',
      badge: '⭐',
      requirements: [
        'SNS 계정 연동 OR 증빙 자료 2개',
        '3년 이상 지도 경력',
        '클럽 공식 인증'
      ],
      benefits: [
        '"헤드 코치" 골드 뱃지',
        '프로필 우선 노출',
        '프리미엄 기능 일부 무료'
      ],
      duration: '2-4일 소요',
      snsRequirements: '팔로워 2,000+ OR 수영 콘텐츠 100+',
      documentRequirements: '증빙 자료 2개 이상'
    },
    {
      id: 'master-coach' as CoachLevel,
      title: '마스터 코치',
      badge: '🏆',
      requirements: [
        'SNS 계정 연동 OR 증빙 자료 3개',
        '7년 이상 지도 경력',
        '대회 실적 또는 특별 경력'
      ],
      benefits: [
        '"마스터 코치" 플래티넘 뱃지',
        '최상위 노출',
        '프리미엄 기능 전체 무료'
      ],
      duration: '3-7일 소요',
      snsRequirements: '팔로워 5,000+ OR 수영 콘텐츠 200+',
      documentRequirements: '증빙 자료 3개 이상'
    }
  ];

  const handleFileUpload = (type: 'doc1' | 'doc2' | 'doc3', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = () => {
    console.log('Verification submitted:', { selectedLevel, selectedMethod, formData, uploadedFiles });
    setStep('submitted');
  };

  const currentLevel = coachLevels.find(l => l.id === selectedLevel);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">코치 인증</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">
            {step === 'select-level' && '인증 레벨을 선택하세요'}
            {step === 'select-method' && '인증 방법을 선택하세요'}
            {step === 'sns-form' && 'SNS 계정을 연동하세요'}
            {step === 'document-form' && '증빙 자료를 제출하세요'}
            {step === 'submitted' && '인증 신청이 완료되었습니다'}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Select Level */}
          {step === 'select-level' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl text-gray-900 dark:text-gray-100 mb-2">
                  어떤 레벨로 인증하시겠어요?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  귀하의 경력에 맞는 레벨을 선택해주세요
                </p>
              </div>

              {coachLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                    selectedLevel === level.id
                      ? 'border-blue-500 dark:border-cyan-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{level.badge}</div>
                    <div className="flex-1">
                      <h4 className="text-lg text-gray-900 dark:text-gray-100 mb-1">{level.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <Clock className="inline w-3 h-3 mr-1" />
                        {level.duration}
                      </p>

                      <div className="space-y-2 mb-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">📋 요구사항:</p>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {level.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <span className="text-blue-500">•</span> {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300">🎁 혜택:</p>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {level.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <span className="text-green-500">✓</span> {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              <button
                onClick={() => setStep('select-method')}
                className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                다음 단계로
              </button>
            </div>
          )}

          {/* Step 2: Select Method */}
          {step === 'select-method' && (
            <div className="space-y-6">
              {/* Selected Level */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{currentLevel?.badge}</div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">신청 중인 레벨</p>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{currentLevel?.title}</p>
                  </div>
                  <button
                    onClick={() => setStep('select-level')}
                    className="ml-auto text-sm text-blue-600 dark:text-cyan-400 hover:underline"
                  >
                    변경
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl text-gray-900 dark:text-gray-100 mb-2">
                  인증 방법을 선택하세요
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  둘 중 하나만 선택해도 인증 신청이 가능합니다
                </p>
              </div>

              {/* SNS Method */}
              <button
                onClick={() => {
                  setSelectedMethod('sns');
                  setStep('sns-form');
                }}
                className="w-full p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-cyan-500 bg-white dark:bg-gray-800 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl text-white">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      🌟 SNS 계정 연동 (간편 인증)
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      인스타그램, 유튜브 등 수영 관련 SNS 활동으로 인증
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                        <strong>{currentLevel?.title}</strong> 요구사항:
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {currentLevel?.snsRequirements}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <Instagram className="w-4 h-4" />
                        인스타그램
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <Youtube className="w-4 h-4" />
                        유튜브
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Document Method */}
              <button
                onClick={() => {
                  setSelectedMethod('documents');
                  setStep('document-form');
                }}
                className="w-full p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-cyan-500 bg-white dark:bg-gray-800 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      📄 증빙 자료 제출 (전통적 인증)
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      자격증, 경력증명서, 대회 실적 등 문서로 인증
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                        <strong>{currentLevel?.title}</strong> 요구사항:
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {currentLevel?.documentRequirements}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                      자격증, 재직증명서, 대회실적, 추천서 등
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setStep('select-level')}
                className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                이전
              </button>
            </div>
          )}

          {/* Step 3-A: SNS Form */}
          {step === 'sns-form' && (
            <div className="space-y-6">
              {/* Selected Level */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{currentLevel?.badge}</div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">신청 중인 레벨</p>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{currentLevel?.title}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 px-3 py-1 rounded-lg">
                    <Share2 className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                    <span className="text-sm text-pink-600 dark:text-pink-400">SNS 인증</span>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  소속 클럽/수영장 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.clubName}
                  onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                  placeholder="예: 서울수영클럽"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  연락 가능한 이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.clubEmail}
                  onChange={(e) => setFormData({ ...formData, clubEmail: e.target.value })}
                  placeholder="coach@example.com"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  지도 경력 (년) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="5"
                  min="0"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Instagram */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-pink-200 dark:border-pink-800">
                <div className="flex items-center gap-2 mb-3">
                  <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  <h4 className="text-gray-900 dark:text-gray-100">인스타그램 계정</h4>
                </div>
                <input
                  type="text"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/your_account"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 mb-2"
                />
                <input
                  type="number"
                  value={formData.instagramFollowers}
                  onChange={(e) => setFormData({ ...formData, instagramFollowers: e.target.value })}
                  placeholder="팔로워 수 (예: 1500)"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  💡 수영 관련 콘텐츠가 있는 계정을 입력해주세요
                </p>
              </div>

              {/* YouTube */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-4 border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 mb-3">
                  <Youtube className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <h4 className="text-gray-900 dark:text-gray-100">유튜브 채널 (선택)</h4>
                </div>
                <input
                  type="text"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/@your_channel"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 mb-2"
                />
                <input
                  type="number"
                  value={formData.youtubeSubscribers}
                  onChange={(e) => setFormData({ ...formData, youtubeSubscribers: e.target.value })}
                  placeholder="구독자 수 (예: 3000)"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  💡 유튜브 채널이 있다면 추가 가산점이 부여됩니다
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  🔍 운영자가 입력하신 SNS 계정을 확인합니다<br />
                  • 계정 실제 존재 여부<br />
                  • 수영 관련 콘텐츠 확인<br />
                  • 팔로워/구독자 수 확인<br />
                  • 활동 지속성 확인
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('select-method')}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  이전
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.clubName || !formData.clubEmail || !formData.experience || !formData.instagramUrl}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  제출하기
                </button>
              </div>
            </div>
          )}

          {/* Step 3-B: Document Form */}
          {step === 'document-form' && (
            <div className="space-y-6">
              {/* Selected Level */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{currentLevel?.badge}</div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">신청 중인 레벨</p>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{currentLevel?.title}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-blue-600 dark:text-blue-400">문서 인증</span>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  소속 클럽/수영장 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.clubName}
                  onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                  placeholder="예: 서울수영클럽"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  연락 가능한 이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.clubEmail}
                  onChange={(e) => setFormData({ ...formData, clubEmail: e.target.value })}
                  placeholder="coach@example.com"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  지도 경력 (년) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="5"
                  min="0"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Info about documents */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-4 border border-yellow-200 dark:border-yellow-800">
                <h4 className="text-gray-900 dark:text-gray-100 font-semibold mb-2">
                  📄 증빙 자료 안내
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  다음 중 {selectedLevel === 'coach' ? '1가지' : selectedLevel === 'head-coach' ? '2가지' : '3가지'} 이상의 증빙 자료를 업로드해주세요:
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">1️⃣</span>
                    <div>
                      <strong>지도자 자격증</strong>
                      <p className="text-xs text-gray-600 dark:text-gray-400">생활체육/전문스포츠/유소년/장애인 지도사 등</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">2️⃣</span>
                    <div>
                      <strong>재직/경력 증명서</strong>
                      <p className="text-xs text-gray-600 dark:text-gray-400">클럽 발행 재직증명서, 경력증명서</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">3️⃣</span>
                    <div>
                      <strong>대회 실적</strong>
                      <p className="text-xs text-gray-600 dark:text-gray-400">선수 지도 실적, 대회 수상 내역, 상장 등</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">4️⃣</span>
                    <div>
                      <strong>SNS/컨텐츠 실적</strong>
                      <p className="text-xs text-gray-600 dark:text-gray-400">유튜브, 인스타그램 등 수영 컨텐츠 활동 (캡처)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">5️⃣</span>
                    <div>
                      <strong>추천서</strong>
                      <p className="text-xs text-gray-600 dark:text-gray-400">클럽 대표, 다른 인증 코치의 추천서</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">6️⃣</span>
                    <div>
                      <strong>기타 증빙</strong>
                      <p className="text-xs text-gray-600 dark:text-gray-400">교육 이수증, 세미나 참석 증명 등</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Document Upload 1 */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  증빙 자료 #1 <span className="text-red-500">*</span>
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-cyan-500 transition-colors bg-gray-50 dark:bg-gray-800">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploadedFiles.doc1 ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {uploadedFiles.doc1.name}
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          자격증, 경력증명서 등
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          JPG, PNG, PDF (최대 5MB)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload('doc1', e)}
                  />
                </label>
              </div>

              {/* Document Upload 2 */}
              {(selectedLevel === 'head-coach' || selectedLevel === 'master-coach') && (
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                    증빙 자료 #2 <span className="text-red-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-cyan-500 transition-colors bg-gray-50 dark:bg-gray-800">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploadedFiles.doc2 ? (
                        <>
                          <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {uploadedFiles.doc2.name}
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            대회 실적, SNS 컨텐츠 등
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            JPG, PNG, PDF (최대 5MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('doc2', e)}
                    />
                  </label>
                </div>
              )}

              {/* Document Upload 3 */}
              {selectedLevel === 'master-coach' && (
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                    증빙 자료 #3 <span className="text-red-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-cyan-500 transition-colors bg-gray-50 dark:bg-gray-800">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploadedFiles.doc3 ? (
                        <>
                          <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {uploadedFiles.doc3.name}
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            추천서, 수상 경력 등
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            JPG, PNG, PDF (최대 5MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('doc3', e)}
                    />
                  </label>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💡 업로드하신 파일은 운영자가 직접 검토합니다<br />
                  • 파일은 최대 5MB까지 업로드 가능합니다<br />
                  • 개인정보는 일부 가려서 제출하셔도 됩니다<br />
                  • 검토 결과는 이메일로 안내됩니다
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('select-method')}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  이전
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.clubName || !formData.clubEmail || !formData.experience || !uploadedFiles.doc1}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  제출하기
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Submitted */}
          {step === 'submitted' && (
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
                <h3 className="text-2xl text-gray-900 dark:text-gray-100">
                  인증 신청 완료!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentLevel?.title} 인증 신청이 접수되었습니다
                </p>
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
                  {selectedMethod === 'sns' ? (
                    <>
                      <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-blue-600 dark:text-blue-400">SNS 계정 인증</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-blue-600 dark:text-blue-400">문서 제출 인증</span>
                    </>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-4xl">{currentLevel?.badge}</div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400">신청 레벨</p>
                    <p className="text-xl text-gray-900 dark:text-gray-100">{currentLevel?.title}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>예상 검토 시간: {currentLevel?.duration}</span>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-left">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-semibold">📋 다음 단계:</p>
                <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal list-inside">
                  <li>
                    <span className="font-medium text-gray-700 dark:text-gray-300">신청 접수</span>
                    <p className="ml-5 text-xs text-gray-500 dark:text-gray-500">제출하신 정보를 확인합니다</p>
                  </li>
                  <li>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {selectedMethod === 'sns' ? 'SNS 계정 검토' : '서류 검토'}
                    </span>
                    <p className="ml-5 text-xs text-gray-500 dark:text-gray-500">
                      {selectedMethod === 'sns' 
                        ? '계정 활동 내역과 팔로워 수를 확인합니다' 
                        : '제출하신 서류의 진위를 확인합니다'}
                    </p>
                  </li>
                  <li>
                    <span className="font-medium text-gray-700 dark:text-gray-300">승인 결과 알림</span>
                    <p className="ml-5 text-xs text-gray-500 dark:text-gray-500">이메일로 결과를 안내합니다</p>
                  </li>
                  <li>
                    <span className="font-medium text-gray-700 dark:text-gray-300">뱃지 부여</span>
                    <p className="ml-5 text-xs text-gray-500 dark:text-gray-500">프로필에 인증 뱃지가 표시됩니다</p>
                  </li>
                </ol>
              </div>

              {/* Contact Support */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💬 문의사항이 있으신가요?<br />
                  <a href="mailto:coach-verify@swimcommunity.com" className="font-semibold hover:underline">
                    coach-verify@swimcommunity.com
                  </a>
                  으로 연락주세요
                </p>
              </div>

              {/* Close Button */}
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
    </div>
  );
}

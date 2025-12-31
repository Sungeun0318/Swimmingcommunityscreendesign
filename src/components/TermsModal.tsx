import React, { useState } from 'react';
import { X, FileText, ChevronRight } from 'lucide-react';

interface TermsModalProps {
  onClose: () => void;
}

type TermsType = 'terms' | 'privacy' | 'community' | null;

export function TermsModal({ onClose }: TermsModalProps) {
  const [selectedType, setSelectedType] = useState<TermsType>(null);

  const termsList = [
    {
      id: 'terms' as TermsType,
      title: '서비스 이용약관',
      lastUpdated: '2025년 1월 1일',
      icon: '📋'
    },
    {
      id: 'privacy' as TermsType,
      title: '개인정보 처리방침',
      lastUpdated: '2025년 1월 1일',
      icon: '🔒'
    },
    {
      id: 'community' as TermsType,
      title: '커뮤니티 가이드라인',
      lastUpdated: '2025년 1월 1일',
      icon: '👥'
    }
  ];

  const renderTermsContent = () => {
    switch (selectedType) {
      case 'terms':
        return (
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">제1조 (목적)</h3>
              <p className="text-sm leading-relaxed">
                본 약관은 수영 커뮤니티(이하 "회사")가 제공하는 수영 훈련 및 커뮤니티 서비스(이하 "서비스")의 이용과 관련하여 
                회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">제2조 (정의)</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>"서비스"란 회사가 제공하는 수영 훈련 프로그램, 스케줄러, 커뮤니티 기능 등을 의미합니다.</li>
                  <li>"회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 말합니다.</li>
                  <li>"코치"란 회사의 인증 절차를 거쳐 코치 권한을 부여받은 회원을 말합니다.</li>
                  <li>"콘텐츠"란 회원이 서비스에 게시한 글, 사진, 동영상 등 모든 정보를 말합니다.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">제3조 (약관의 효력 및 변경)</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.</p>
                <p>2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</p>
                <p>3. 약관이 변경되는 경우 회사는 변경사항을 서비스 내 공지사항을 통해 공지합니다.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">제4조 (서비스의 제공)</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>회사는 다음과 같은 서비스를 제공합니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>수영 훈련 프로그램 제공 및 관리</li>
                  <li>훈련 스케줄러 및 기록 관리</li>
                  <li>커뮤니티 게시판 및 소셜 기능</li>
                  <li>레벨, XP, 배지 등 동기부여 시스템</li>
                  <li>코치 인증 및 관련 서비스</li>
                  <li>기타 회사가 추가 개발하거나 제휴계약 등을 통해 제공하는 서비스</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">제5조 (회원가입)</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>1. 회원가입은 이용자가 약관의 내용에 동의하고 회원가입 신청을 한 후 회사가 이를 승낙함으로써 체결됩니다.</p>
                <p>2. 회사는 다음 각 호에 해당하는 경우 회원가입을 거부할 수 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>실명이 아니거나 타인의 정보를 도용한 경우</li>
                  <li>허위 정보를 기재한 경우</li>
                  <li>기타 회원가입을 승낙하는 것이 서비스 운영에 현저히 지장이 있다고 판단되는 경우</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">제6조 (회원의 의무)</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>회원은 다음 행위를 하여서는 안 됩니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>타인의 정보 도용</li>
                  <li>회사가 게시한 정보의 변경</li>
                  <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                  <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                  <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">제7조 (서비스 이용의 제한 및 중지)</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>회사는 다음 각 호의 경우 서비스 이용을 제한하거나 중지할 수 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>서비스용 설비의 보수 등 공사로 인한 부득이한 경우</li>
                  <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
                  <li>국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 때</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">제8조 (면책조항)</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
                <p>2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</p>
                <p>3. 회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않습니다.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">제9조 (분쟁의 해결)</h3>
              <p className="text-sm leading-relaxed">
                본 약관과 관련하여 분쟁이 발생한 경우, 회사의 본사 소재지를 관할하는 법원을 합의관할법원으로 합니다.
              </p>
            </section>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mt-6">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>부칙</strong><br />
                본 약관은 2025년 1월 1일부터 시행됩니다.
              </p>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">1. 개인정보의 수집 및 이용 목적</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>회사는 다음의 목적을 위해 개인정보를 처리합니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>회원 가입 및 관리:</strong> 회원 가입의사 확인, 회원제 서비스 제공, 본인확인</li>
                  <li><strong>서비스 제공:</strong> 훈련 프로그램 제공, 스케줄 관리, 커뮤니티 기능 제공</li>
                  <li><strong>마케팅 및 광고:</strong> 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 정보 제공</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">2. 수집하는 개인정보 항목</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p><strong>필수 항목:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>이메일 주소</li>
                  <li>비밀번호 (암호화 저장)</li>
                  <li>닉네임</li>
                </ul>
                <p className="mt-3"><strong>선택 항목:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>프로필 사진</li>
                  <li>생년월일</li>
                  <li>성별</li>
                  <li>수영 레벨</li>
                  <li>SNS 계정 정보 (코치 인증 시)</li>
                </ul>
                <p className="mt-3"><strong>자동 수집 항목:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>서비스 이용 기록</li>
                  <li>접속 로그</li>
                  <li>쿠키</li>
                  <li>접속 IP 정보</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">3. 개인정보의 보유 및 이용기간</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 
                단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>회원 탈퇴 시:</strong> 부정 이용 방지를 위해 30일간 보관 후 파기</li>
                  <li><strong>관련 법령에 의한 보존:</strong>
                    <ul className="list-circle list-inside ml-6 mt-1">
                      <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                      <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
                      <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
                      <li>웹사이트 방문 기록: 3개월 (통신비밀보호법)</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">4. 개인정보의 파기 절차 및 방법</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p><strong>파기 절차:</strong> 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 관련 법령에 따라 일정기간 저장된 후 파기됩니다.</p>
                <p><strong>파기 방법:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>전자적 파일 형태: 복구 및 재생되지 않도록 기술적 방법을 이용하여 완전히 삭제</li>
                  <li>종이에 출력된 개인정보: 분쇄기로 분쇄하거나 소각</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">5. 개인정보의 제3자 제공</h3>
              <p className="text-sm leading-relaxed">
                회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 
                다만, 아래의 경우에는 예외로 합니다:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">6. 이용자의 권리</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>개인정보 열람 요구</li>
                  <li>개인정보 정정 요구</li>
                  <li>개인정보 삭제 요구</li>
                  <li>개인정보 처리 정지 요구</li>
                </ul>
                <p className="mt-2">권리 행사는 개인정보보호법 시행규칙에 따라 서면, 전화, 이메일 등을 통해 하실 수 있습니다.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">7. 개인정보 보호책임자</h3>
              <div className="text-sm leading-relaxed bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <p><strong>개인정보 보호책임자</strong></p>
                <ul className="space-y-1 mt-2">
                  <li>이름: 홍길동</li>
                  <li>직책: 개인정보보호팀장</li>
                  <li>이메일: privacy@swimcommunity.com</li>
                  <li>전화: 02-1234-5678</li>
                </ul>
              </div>
            </section>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mt-6">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>부칙</strong><br />
                본 방침은 2025년 1월 1일부터 시행됩니다.
              </p>
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">1. 커뮤니티 기본 원칙</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>우리 커뮤니티는 모든 수영 애호가들이 안전하고 즐겁게 소통할 수 있는 공간입니다. 
                다음의 기본 원칙을 지켜주세요:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>존중:</strong> 모든 회원을 존중하고 배려합니다</li>
                  <li><strong>정직:</strong> 허위 정보나 과장된 정보를 게시하지 않습니다</li>
                  <li><strong>안전:</strong> 개인정보를 보호하고 안전한 환경을 만듭니다</li>
                  <li><strong>건설적:</strong> 긍정적이고 건설적인 대화를 나눕니다</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">2. 금지 행위</h3>
              <div className="text-sm leading-relaxed space-y-3">
                <div>
                  <p className="font-semibold mb-1">❌ 금지되는 콘텐츠:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>욕설, 비방, 혐오 발언</li>
                    <li>성적인 내용, 음란물</li>
                    <li>폭력적이거나 잔인한 내용</li>
                    <li>불법 정보 또는 범죄 조장</li>
                    <li>타인의 개인정보 무단 공개</li>
                    <li>저작권을 침해하는 콘텐츠</li>
                    <li>상업적 광고 및 스팸</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-1">❌ 금지되는 행위:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>타인 사칭 및 허위 정보 유포</li>
                    <li>도배 및 반복 게시</li>
                    <li>타 회원 괴롭힘 및 스토킹</li>
                    <li>시스템 악용 및 해킹 시도</li>
                    <li>부적절한 닉네임 사용</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">3. 게시물 작성 가이드</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p><strong>✅ 환영하는 콘텐츠:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>수영 훈련 기록 및 후기</li>
                  <li>기술 향상 팁 및 조언</li>
                  <li>대회 참가 후기</li>
                  <li>수영 장비 리뷰</li>
                  <li>동기부여가 되는 스토리</li>
                  <li>건설적인 질문과 토론</li>
                </ul>
                <p className="mt-3"><strong>💡 좋은 게시물 작성법:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>명확하고 구체적인 제목 사용</li>
                  <li>읽기 쉽게 문단 나누기</li>
                  <li>관련 사진이나 영상 첨부</li>
                  <li>해시태그 적절히 활용</li>
                  <li>출처 명시 (다른 곳에서 가져온 정보인 경우)</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">4. 댓글 작성 가이드</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>존중하는 언어 사용</li>
                  <li>건설적인 피드백 제공</li>
                  <li>다른 의견도 인정하기</li>
                  <li>개인 공격 금지</li>
                  <li>주제와 관련된 댓글 작성</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">5. 코치 인증 회원의 책임</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>코치 인증을 받은 회원은 추가적인 책임이 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>정확하고 안전한 훈련 정보 제공</li>
                  <li>전문적이고 윤리적인 행동</li>
                  <li>회원들에게 모범이 되는 태도</li>
                  <li>허위 경력이나 자격 표시 금지</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">6. 신고 및 제재</h3>
              <div className="text-sm leading-relaxed space-y-3">
                <div>
                  <p className="font-semibold mb-1">📢 신고 방법:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>게시물 우측 상단 메뉴에서 "신고하기" 선택</li>
                    <li>신고 사유를 명확히 작성</li>
                    <li>익명으로 신고 가능</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-1">⚠️ 제재 조치:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>1차 위반:</strong> 경고 및 해당 콘텐츠 삭제</li>
                    <li><strong>2차 위반:</strong> 7일 이용 정지</li>
                    <li><strong>3차 위반:</strong> 30일 이용 정지</li>
                    <li><strong>중대한 위반:</strong> 영구 이용 정지</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                  <p className="text-red-800 dark:text-red-300 text-sm">
                    <strong>⚡ 즉시 영구 정지 대상:</strong><br />
                    • 불법 행위<br />
                    • 심각한 괴롭힘<br />
                    • 아동 학대 관련 콘텐츠<br />
                    • 시스템 해킹 시도
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">7. 인기 게시물 선정 기준</h3>
              <div className="text-sm leading-relaxed space-y-2">
                <p>공정한 인기 게시물 선정을 위한 기준:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>24시간 롤링 카운팅 방식</li>
                  <li>좋아요 ×1점, 댓글 ×3점, 저장 ×5점</li>
                  <li>신고 3회 누적 시 자동 제외</li>
                  <li>가이드라인 위반 게시물 제외</li>
                </ul>
              </div>
            </section>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mt-6">
              <p className="text-sm text-green-800 dark:text-green-300">
                <strong>💙 함께 만드는 건강한 커뮤니티</strong><br />
                우리 모두가 서로를 존중하고 배려할 때, 더 나은 수영 커뮤니티를 만들 수 있습니다. 
                함께 즐겁게 수영하고 성장해요! 🏊‍♂️
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mt-4">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>부칙</strong><br />
                본 가이드라인은 2025년 1월 1일부터 시행됩니다.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white dark:bg-card w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">
                {selectedType ? termsList.find(t => t.id === selectedType)?.title : '약관 및 정책'}
              </h2>
            </div>
            <button
              onClick={() => {
                if (selectedType) {
                  setSelectedType(null);
                } else {
                  onClose();
                }
              }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">
            {selectedType 
              ? `최종 업데이트: ${termsList.find(t => t.id === selectedType)?.lastUpdated}`
              : '약관을 선택하여 확인하세요'
            }
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedType ? (
            /* Terms List */
            <div className="space-y-3">
              {termsList.map((term) => (
                <button
                  key={term.id}
                  onClick={() => setSelectedType(term.id)}
                  className="w-full p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-cyan-500 bg-white dark:bg-gray-800 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{term.icon}</div>
                      <div>
                        <h4 className="text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
                          {term.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          최종 업데이트: {term.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Terms Content */
            <div>
              <button
                onClick={() => setSelectedType(null)}
                className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 hover:underline mb-6"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>목록으로 돌아가기</span>
              </button>
              
              {renderTermsContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

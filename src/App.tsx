import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ruleTexts = {
  stack: "- Stack: Vite, React 18, TypeScript, Tailwind CSS\n- 명확한 버전을 명시하여 구버전 코드 제안을 차단합니다.",
  style: "- Style: Arrow functions, PascalCase for components\n- 팀의 코딩 컨벤션을 명시하여 일관성을 유지합니다.",
  constraint: "- Rules: Use 'try-catch', No 'any' type\n- 보안과 에러 처리 규칙을 강제합니다."
};

const simulations = {
  workspace: '<div class="bg-indigo-600 text-white p-3 rounded-lg mb-2 text-sm">@workspace 프로젝트 구조 알려줘</div><div class="bg-white p-3 rounded-lg border text-sm shadow-sm">분석 결과, Next.js 프로젝트입니다. 주요 로직은 /src 폴더에 있습니다.</div>',
  file: '<div class="bg-teal-600 text-white p-3 rounded-lg mb-2 text-sm">#file:api.ts 이 파일 참고해서 POST 요청 만들어줘</div><div class="bg-white p-3 rounded-lg border text-sm shadow-sm">api.ts의 Axios 인스턴스를 사용하여 새로운 POST 함수를 생성합니다.</div>',
  selection: '<div class="bg-amber-600 text-white p-3 rounded-lg mb-2 text-sm">#selection 이 함수 리팩토링해줘</div><div class="bg-white p-3 rounded-lg border text-sm shadow-sm">드래그한 코드의 가독성을 위해 화살표 함수로 변경하고 불필요한 변수를 제거했습니다.</div>'
};

export default function App() {
  const [activeTab, setActiveTab] = useState('tab-rules');

  return (
    <div className="bg-background min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Header />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-10 min-h-[500px]">
          {activeTab === 'tab-rules' && <RulesTab />}
          {activeTab === 'tab-context' && <ContextTab />}
          {activeTab === 'tab-commands' && <CommandsTab />}
          {activeTab === 'tab-routine' && <RoutineTab />}
        </main>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
          <span className="text-primary">VS Code + Copilot</span> 가이드
        </h1>
        <p className="text-slate-500 text-lg">AI 협업의 핵심 가이드와 Gemini 실습 도구</p>
      </div>
      <div className="mt-4 md:mt-0 flex gap-2">
        <div className="bg-indigo-100 text-primary py-2 px-4 rounded-full text-sm font-semibold tracking-wide border border-indigo-200 shadow-inner">
          🚀 입문자 전용
        </div>
      </div>
    </header>
  );
}

function Navigation({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const tabs = [
    { id: 'tab-rules', label: '📜 1. 헌법 설정' },
    { id: 'tab-context', label: '🧠 2. 맥락 유지' },
    { id: 'tab-commands', label: '⌨️ 3. 명령어' },
    { id: 'tab-routine', label: '🔄 4. 협업 루틴' },
  ];

  return (
    <nav className="flex flex-wrap gap-2 mb-8" aria-label="Tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 font-medium rounded-lg transition-colors ${
            activeTab === tab.id
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

function RulesTab() {
  const [activeRule, setActiveRule] = useState<'stack' | 'style' | 'constraint'>('stack');

  const chartData = {
    labels: ['기술 스택', '스타일', '제약 사항'],
    datasets: [{
      data: [30, 40, 30],
      backgroundColor: ['#4F46E5', '#0F766E', '#F59E0B'],
      borderWidth: 0
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const } },
    cutout: '70%'
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">1. 프로젝트의 헌법: .github/copilot-instructions.md</h2>
        <p className="text-slate-600">지침서는 간결하고 명확해야 합니다. 아래 차트는 지침서의 이상적인 구성 비율입니다.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="relative w-full max-w-[400px] mx-auto h-[300px] max-h-[350px]">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="space-y-4">
          <button onClick={() => setActiveRule('stack')} className="w-full text-left p-4 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 transition-colors">
            <span className="font-bold text-primary">⚙️ 기술 스택</span>
          </button>
          <button onClick={() => setActiveRule('style')} className="w-full text-left p-4 rounded-lg border border-teal-200 bg-teal-50 hover:bg-teal-100 transition-colors">
            <span className="font-bold text-secondary">🖌️ 코딩 스타일</span>
          </button>
          <button onClick={() => setActiveRule('constraint')} className="w-full text-left p-4 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors">
            <span className="font-bold text-amber-700">🛡️ 핵심 제약 사항</span>
          </button>
          <div className="mt-4 bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm shadow-inner overflow-x-auto whitespace-pre-wrap">
            {ruleTexts[activeRule]}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">2. 끊김 없는 개발: 맥락 유지 전략</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h3 className="font-bold mb-2">📄 CONTEXT.md 활용</h3>
          <p className="text-sm text-slate-600">작업 종료 전 현재 상태를 파일로 기록하여 AI가 기억 상실에 걸리는 것을 방지하세요.</p>
        </div>
        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
          <h3 className="font-bold mb-2">🌿 Git 커밋 활용</h3>
          <p className="text-sm text-slate-600">작은 단위로 자주 커밋하여 AI가 Diff를 통해 맥락을 파악하게 만드세요.</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold mb-2">⏱️ 채팅 히스토리</h3>
          <p className="text-sm text-slate-600">VS Code의 시계 아이콘을 눌러 이전 대화 내역을 다시 불러오세요.</p>
        </div>
      </div>
    </div>
  );
}

function CommandsTab() {
  const [activeCommand, setActiveCommand] = useState<'workspace' | 'file' | 'selection' | null>(null);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">3. 실시간 협업 명령어 (Context Symbols)</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 space-y-3">
          <button onClick={() => setActiveCommand('workspace')} className="w-full text-left p-4 border rounded-xl hover:bg-slate-50">@workspace</button>
          <button onClick={() => setActiveCommand('file')} className="w-full text-left p-4 border rounded-xl hover:bg-slate-50">#file</button>
          <button onClick={() => setActiveCommand('selection')} className="w-full text-left p-4 border rounded-xl hover:bg-slate-50">#selection</button>
        </div>
        <div className="w-full md:w-2/3 bg-slate-50 rounded-xl p-6 min-h-[200px]">
          {activeCommand ? (
            <div dangerouslySetInnerHTML={{ __html: simulations[activeCommand] }} />
          ) : (
            <div className="text-slate-500">좌측 명령어를 클릭해 보세요.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function RoutineTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">4. 효율적인 4단계 협업 루틴</h2>
      <div className="space-y-4">
        <div className="p-4 border-l-4 border-primary bg-slate-50">1. 환경 설정: 지침서 작성</div>
        <div className="p-4 border-l-4 border-secondary bg-slate-50">2. 질문하기: @workspace 활용</div>
        <div className="p-4 border-l-4 border-accent bg-slate-50">3. 검토 및 기록: TODO.md 업데이트</div>
        <div className="p-4 border-l-4 border-slate-800 bg-slate-50">4. 피드백 루프: AI 교정 및 지침 보완</div>
      </div>
    </div>
  );
}

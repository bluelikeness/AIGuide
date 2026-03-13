import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { GoogleGenAI } from '@google/genai';

ChartJS.register(ArcElement, Tooltip, Legend);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
          {activeTab === 'tab-gemini' && <GeminiTab />}
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
        <div className="bg-amber-100 text-amber-700 py-2 px-4 rounded-full text-sm font-semibold tracking-wide border border-amber-200 shadow-inner">
          ✨ Gemini 활성화
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
    { id: 'tab-gemini', label: '✨ Gemini AI 도구', isSpecial: true },
  ];

  return (
    <nav className="flex flex-wrap gap-2 mb-8" aria-label="Tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 font-medium rounded-lg transition-colors ${
            activeTab === tab.id
              ? tab.isSpecial
                ? 'bg-indigo-600 text-white font-bold border-2 border-indigo-600'
                : 'bg-primary text-white shadow-md'
              : tab.isSpecial
                ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold border-2 border-indigo-200'
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

function GeminiTab() {
  const [stack, setStack] = useState('');
  const [customRule, setCustomRule] = useState('');
  const [instructionsOutput, setInstructionsOutput] = useState('결과가 여기에 표시됩니다.');
  const [isGeneratingInstructions, setIsGeneratingInstructions] = useState(false);

  const [notes, setNotes] = useState('');
  const [contextOutput, setContextOutput] = useState('요약된 내용이 여기에 표시됩니다.');
  const [isGeneratingContext, setIsGeneratingContext] = useState(false);

  async function callGemini(prompt: string, systemPrompt: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
        }
      });
      return response.text || "답변을 가져오지 못했습니다.";
    } catch (error) {
      return "오류가 발생했습니다: " + (error instanceof Error ? error.message : String(error));
    }
  }

  const handleGenerateInstructions = async () => {
    if (!stack) {
      setInstructionsOutput("기술 스택을 먼저 입력해 주세요.");
      return;
    }
    setIsGeneratingInstructions(true);
    setInstructionsOutput("Gemini가 지침을 작성하고 있습니다...");

    const systemPrompt = "너는 10년차 시니어 개발자이자 AI 협업 전문가야. 사용자가 입력한 기술 스택과 규칙을 바탕으로 GitHub Copilot을 위한 최적화된 '.github/copilot-instructions.md' 내용을 작성해줘. 아주 간결하고 명확한 불렛 포인트 형식이어야 하며 토큰을 절약하도록 핵심만 담아야 해.";
    const userPrompt = `기술 스택: ${stack}\n추가 규칙: ${customRule}\n위 내용을 바탕으로 최고의 지침 파일을 만들어줘.`;

    const result = await callGemini(userPrompt, systemPrompt);
    setInstructionsOutput(result);
    setIsGeneratingInstructions(false);
  };

  const handleSummarizeContext = async () => {
    if (!notes) {
      setContextOutput("요약할 내용을 입력해 주세요.");
      return;
    }
    setIsGeneratingContext(true);
    setContextOutput("Gemini가 맥락을 요약하고 있습니다...");

    const systemPrompt = "너는 개발자의 생산성을 돕는 비서야. 개발자가 입력한 어수선한 작업 메모나 채팅 기록을 분석해서 'CONTEXT.md' 형식으로 요약해줘. 포함될 내용: 1. 현재 진행 상황, 2. 직전까지 발생한 문제/해결책, 3. 다음 단계 가이드. 아주 명확하고 직관적으로 작성해.";
    const userPrompt = `최근 작업 내역:\n${notes}\n위 내용을 AI가 다음에 바로 알아들을 수 있도록 요약해줘.`;

    const result = await callGemini(userPrompt, systemPrompt);
    setContextOutput(result);
    setIsGeneratingContext(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('복사되었습니다!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-indigo-800 mb-2 flex items-center gap-2">
          ✨ Gemini 실습 도구
        </h2>
        <p className="text-slate-600">가이드에서 배운 내용을 실제로 적용해 보세요. Gemini AI가 당신의 프로젝트 설정을 돕습니다.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Tool 1 */}
        <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
          <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            📜 최적화 지침서 생성
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-indigo-700 mb-1 uppercase">기술 스택 (예: React, TS, Tailwind)</label>
              <input 
                type="text" 
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="w-full p-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-primary outline-none" 
                placeholder="예: Next.js 14, TypeScript, Prisma" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-indigo-700 mb-1 uppercase">팀의 특별한 규칙 (없으면 비워두세요)</label>
              <input 
                type="text" 
                value={customRule}
                onChange={(e) => setCustomRule(e.target.value)}
                className="w-full p-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-primary outline-none" 
                placeholder="예: 한글 주석 필수, 화살표 함수 선언" 
              />
            </div>
            <button 
              onClick={handleGenerateInstructions} 
              disabled={isGeneratingInstructions}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {isGeneratingInstructions ? (
                <><span className="loading-spinner"></span> 생성 중...</>
              ) : (
                <>✨ 지침 생성하기</>
              )}
            </button>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-indigo-400">RESULT: .github/copilot-instructions.md</span>
              <button onClick={() => copyToClipboard(instructionsOutput)} className="text-xs text-primary hover:underline">복사하기</button>
            </div>
            <div className="bg-white p-4 rounded-xl border border-indigo-100 text-sm font-mono text-slate-700 min-h-[120px] whitespace-pre-wrap">
              {instructionsOutput}
            </div>
          </div>
        </div>

        {/* Tool 2 */}
        <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
          <h3 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
            🧠 맥락 요약 (CONTEXT.md)
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-teal-700 mb-1 uppercase">오늘 한 일 또는 최근 채팅 내용</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 p-3 rounded-lg border border-teal-200 focus:ring-2 focus:ring-secondary outline-none resize-none" 
                placeholder="AI와 대화한 내용이나 오늘 구현한 기능을 자유롭게 입력하세요."
              ></textarea>
            </div>
            <button 
              onClick={handleSummarizeContext} 
              disabled={isGeneratingContext}
              className="w-full bg-secondary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-teal-800 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {isGeneratingContext ? (
                <><span className="loading-spinner"></span> 요약 중...</>
              ) : (
                <>✨ 맥락 요약하기</>
              )}
            </button>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-teal-400">RESULT: CONTEXT.md (Current Session)</span>
              <button onClick={() => copyToClipboard(contextOutput)} className="text-xs text-secondary hover:underline">복사하기</button>
            </div>
            <div className="bg-white p-4 rounded-xl border border-teal-100 text-sm font-mono text-slate-700 min-h-[120px] whitespace-pre-wrap">
              {contextOutput}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

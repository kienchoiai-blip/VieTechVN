import React, { useState } from 'react';
import { Header } from './components/Header';
import { SelectionForm } from './components/SelectionForm';
import { ResultView } from './components/ResultView';
import { SelectionState, GenerationStatus } from './types';
import { generateInitiative } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [result, setResult] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleGenerate = async (data: SelectionState) => {
    setStatus(GenerationStatus.GENERATING);
    setErrorMsg('');
    try {
      const generatedContent = await generateInitiative(data);
      setResult(generatedContent);
      setStatus(GenerationStatus.SUCCESS);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Có lỗi xảy ra.");
      setStatus(GenerationStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(GenerationStatus.IDLE);
    setResult('');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Intro Banner */}
        {status === GenerationStatus.IDLE && (
          <div className="text-center mb-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Viết Sáng Kiến Kinh Nghiệm <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Trong Vài Cú Click
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Không cần soạn thảo văn bản phức tạp. Công cụ chuyên dụng cho giáo viên giúp tạo đề tài chất lượng cao, chuẩn format giáo dục.
            </p>
          </div>
        )}

        {/* Content Area */}
        <div className="relative">
            {status === GenerationStatus.IDLE || status === GenerationStatus.GENERATING || status === GenerationStatus.ERROR ? (
                <SelectionForm onSubmit={handleGenerate} isGenerating={status === GenerationStatus.GENERATING} />
            ) : (
                <ResultView content={result} onReset={handleReset} />
            )}

            {/* Error Message Toast */}
            {status === GenerationStatus.ERROR && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-center max-w-2xl mx-auto animate-in slide-in-from-bottom-2">
                    <span className="font-medium mr-2">Lỗi:</span> {errorMsg}
                    <button onClick={() => setStatus(GenerationStatus.IDLE)} className="ml-4 text-sm underline hover:text-red-900">Thử lại</button>
                </div>
            )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="font-semibold text-lg">NHÀ PHÁT TRIỂN: <span className="text-blue-600 font-bold uppercase">KIÊN CHƠI AI</span></p>
          <p className="mt-2 text-gray-400">Được phát triển để hỗ trợ cộng đồng giáo viên Việt Nam.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
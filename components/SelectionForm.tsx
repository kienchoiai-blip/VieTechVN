import React, { useState, useEffect } from 'react';
import { SelectionState, SubjectMapping } from '../types';
import { EDUCATION_LEVELS, GRADES, SUBJECTS, TOPIC_CATEGORIES, SUGGESTED_ISSUES } from '../constants';
import { CheckCircle2, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';

interface Props {
  onSubmit: (data: SelectionState) => void;
  isGenerating: boolean;
}

export const SelectionForm: React.FC<Props> = ({ onSubmit, isGenerating }) => {
  const [level, setLevel] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [topicCategory, setTopicCategory] = useState<string>('');
  const [specificIssue, setSpecificIssue] = useState<string>('');
  const [customIssue, setCustomIssue] = useState<string>('');
  const [useCustomIssue, setUseCustomIssue] = useState<boolean>(false);

  // Reset dependent fields when parent changes
  useEffect(() => { setGrade(''); setSubject(''); }, [level]);
  useEffect(() => { setSpecificIssue(''); setCustomIssue(''); }, [topicCategory]);

  const isValid = level && grade && subject && topicCategory && (useCustomIssue ? customIssue.length > 5 : specificIssue);

  const handleSubmit = () => {
    if (isValid) {
      onSubmit({
        level: EDUCATION_LEVELS.find(l => l.id === level)?.label || level,
        grade,
        subject,
        topicCategory: TOPIC_CATEGORIES.find(t => t.id === topicCategory)?.label || topicCategory,
        specificIssue: useCustomIssue ? customIssue : specificIssue
      });
    }
  };

  const SectionTitle = ({ step, title }: { step: number; title: string }) => (
    <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mr-3">
        {step}
      </span>
      {title}
    </h3>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-8 space-y-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <div className="flex">
            <div className="flex-shrink-0">
              <Sparkles className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Chỉ cần chọn các mục bên dưới, AI sẽ tự động viết toàn bộ bản sáng kiến kinh nghiệm cho thầy/cô.
              </p>
            </div>
          </div>
        </div>

        {/* Step 1: Education Level */}
        <div>
          <SectionTitle step={1} title="Thầy/Cô đang giảng dạy cấp học nào?" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ml-11">
            {EDUCATION_LEVELS.map((item) => (
              <button
                key={item.id}
                onClick={() => setLevel(item.id)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  level === item.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-500 bg-white'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50 bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Grade & Subject (Conditional) */}
        {level && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <SectionTitle step={2} title="Chọn Lớp và Môn học/Lĩnh vực" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-11">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lớp / Độ tuổi</label>
                <div className="relative">
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm cursor-pointer appearance-none"
                  >
                    <option value="">-- Chọn lớp --</option>
                    {GRADES[level]?.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Môn học / Mảng công tác</label>
                <div className="relative">
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm cursor-pointer appearance-none"
                    >
                      <option value="">-- Chọn môn --</option>
                      {SUBJECTS[level]?.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronRight className="h-4 w-4 rotate-90" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Topic Category */}
        {grade && subject && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <SectionTitle step={3} title="Thầy/Cô muốn giải quyết vấn đề gì?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-11">
              {TOPIC_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTopicCategory(cat.id)}
                  className={`p-3 text-left rounded-lg border text-sm transition-all flex items-center justify-between ${
                    topicCategory === cat.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm bg-white'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50 bg-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  {topicCategory === cat.id && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Specific Issue */}
        {topicCategory && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <SectionTitle step={4} title="Chi tiết vấn đề (Thực trạng)" />
            <div className="ml-11 space-y-4">
              {!useCustomIssue ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 mb-2">Chọn một thực trạng phổ biến:</p>
                  {SUGGESTED_ISSUES[topicCategory]?.map((issue, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSpecificIssue(issue)}
                      className={`w-full p-3 text-left rounded-lg border text-sm transition-all ${
                        specificIssue === issue
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500 bg-white'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50 bg-white'
                      }`}
                    >
                      {issue}
                    </button>
                  ))}
                  <button
                    onClick={() => { setUseCustomIssue(true); setSpecificIssue(''); }}
                    className="text-sm text-blue-600 hover:underline mt-2 flex items-center font-medium"
                  >
                    + Nhập vấn đề khác của tôi
                  </button>
                </div>
              ) : (
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả ngắn gọn vấn đề của lớp thầy/cô:</label>
                   <textarea
                    value={customIssue}
                    onChange={(e) => setCustomIssue(e.target.value)}
                    placeholder="Ví dụ: Học sinh lớp tôi rất lười làm bài tập về nhà môn Toán..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 h-24 bg-white shadow-sm"
                   />
                   <button
                    onClick={() => { setUseCustomIssue(false); setCustomIssue(''); }}
                    className="text-sm text-gray-500 hover:text-gray-700 mt-2"
                  >
                    Quay lại danh sách gợi ý
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Action */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!isValid || isGenerating}
            className={`flex items-center space-x-2 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-0.5 ${
              isValid && !isGenerating
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang viết sáng kiến...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Tạo Sáng Kiến Ngay</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
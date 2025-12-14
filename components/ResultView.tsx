import React from 'react';
import { Download, RefreshCw, FileText, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
  onReset: () => void;
}

export const ResultView: React.FC<Props> = ({ content, onReset }) => {
  
  const handleDownload = () => {
    // Create a Blob containing the content
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Sang_kien_kinh_nghiem.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button 
          onClick={onReset}
          className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Tạo sáng kiến khác
        </button>
        
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Tải xuống (.txt)</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center">
            <FileText className="text-blue-600 w-5 h-5 mr-2" />
            <h2 className="font-bold text-gray-800">Kết quả Sáng kiến Kinh nghiệm</h2>
        </div>
        <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh] prose prose-blue prose-lg max-w-none">
           {/* Custom Markdown Styling for Document look */}
           <ReactMarkdown
            components={{
                h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-900 uppercase mb-8" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-indigo-800 border-b border-indigo-100 pb-2 mt-8 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-700" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed text-justify" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />
            }}
           >
            {content}
           </ReactMarkdown>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm pb-8">
        * Nội dung được tạo bởi AI. Thầy/Cô vui lòng đọc lại và chỉnh sửa cho phù hợp với thực tế địa phương.
      </div>
    </div>
  );
};
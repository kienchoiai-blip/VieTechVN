import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-full">
            <GraduationCap size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Trợ Lý Sáng Kiến</h1>
            <p className="text-blue-100 text-sm opacity-90">Dành cho Giáo viên Việt Nam</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-sm font-medium bg-white/10 px-4 py-2 rounded-full">
          <BookOpen size={16} />
          <span>Hỗ trợ chuyên môn AI</span>
        </div>
      </div>
    </header>
  );
};
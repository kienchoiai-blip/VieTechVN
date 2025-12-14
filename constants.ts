import { OptionItem } from './types';

export const EDUCATION_LEVELS: OptionItem[] = [
  { id: 'mam_non', label: 'Mầm non' },
  { id: 'tieu_hoc', label: 'Tiểu học' },
  { id: 'thcs', label: 'Trung học cơ sở' },
  { id: 'thpt', label: 'Trung học phổ thông' },
];

export const GRADES: Record<string, string[]> = {
  mam_non: ['Lớp Nhà trẻ', 'Lớp Mẫu giáo bé (3-4 tuổi)', 'Lớp Mẫu giáo nhỡ (4-5 tuổi)', 'Lớp Mẫu giáo lớn (5-6 tuổi)'],
  tieu_hoc: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
  thcs: ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'],
  thpt: ['Lớp 10', 'Lớp 11', 'Lớp 12'],
};

export const SUBJECTS: Record<string, string[]> = {
  mam_non: [
    'Phát triển ngôn ngữ',
    'Phát triển thể chất',
    'Phát triển nhận thức',
    'Phát triển thẩm mỹ',
    'Phát triển tình cảm - xã hội',
    'Kỹ năng sống'
  ],
  tieu_hoc: [
    'Công tác chủ nhiệm',
    'Toán',
    'Tiếng Việt',
    'Đạo đức',
    'Tự nhiên và Xã hội',
    'Khoa học',
    'Lịch sử & Địa lý',
    'Tin học',
    'Tiếng Anh',
    'Hoạt động trải nghiệm'
  ],
  thcs: [
    'Công tác chủ nhiệm',
    'Ngữ văn',
    'Toán học',
    'Khoa học tự nhiên',
    'Lịch sử và Địa lý',
    'Giáo dục công dân',
    'Tiếng Anh',
    'Tin học',
    'Công nghệ'
  ],
  thpt: [
    'Công tác chủ nhiệm',
    'Ngữ văn',
    'Toán học',
    'Vật lý',
    'Hóa học',
    'Sinh học',
    'Lịch sử',
    'Địa lý',
    'Giáo dục Kinh tế và Pháp luật',
    'Tiếng Anh'
  ]
};

export const TOPIC_CATEGORIES: OptionItem[] = [
  { id: 'teaching_method', label: 'Đổi mới phương pháp dạy học' },
  { id: 'student_management', label: 'Công tác quản lý lớp & Học sinh cá biệt' },
  { id: 'it_application', label: 'Ứng dụng Công nghệ thông tin' },
  { id: 'skill_development', label: 'Rèn luyện kỹ năng cho học sinh' },
  { id: 'interest_motivation', label: 'Tạo hứng thú học tập' },
];

// Predefined specific issues to minimize typing
export const SUGGESTED_ISSUES: Record<string, string[]> = {
  teaching_method: [
    'Học sinh còn thụ động, chưa tích cực phát biểu',
    'Phương pháp giảng dạy truyền thống gây nhàm chán',
    'Học sinh gặp khó khăn khi làm việc nhóm',
    'Khả năng vận dụng kiến thức vào thực tế còn hạn chế',
    'Nội dung bài học quá dài, khó truyền tải hết trong tiết học'
  ],
  student_management: [
    'Lớp học còn ồn ào, mất trật tự',
    'Có nhiều học sinh cá biệt, chưa ngoan',
    'Học sinh chưa có ý thức giữ gìn vệ sinh chung',
    'Sự phối hợp giữa gia đình và nhà trường chưa chặt chẽ',
    'Học sinh nghiện game, lơ là việc học'
  ],
  it_application: [
    'Giáo án điện tử chưa sinh động, trực quan',
    'Chưa khai thác hiệu quả các phần mềm dạy học',
    'Học sinh chưa biết cách tra cứu tài liệu trên mạng an toàn',
    'Việc kiểm tra đánh giá online còn gặp khó khăn'
  ],
  skill_development: [
    'Học sinh viết chữ chưa đẹp, trình bày cẩu thả',
    'Kỹ năng giao tiếp và thuyết trình còn yếu',
    'Kỹ năng giải quyết vấn đề chưa linh hoạt',
    'Kỹ năng tính toán nhanh còn hạn chế'
  ],
  interest_motivation: [
    'Học sinh sợ học môn này, cảm thấy áp lực',
    'Không khí lớp học trầm lắng',
    'Học sinh chỉ học vẹt, thiếu tư duy sáng tạo',
    'Chưa có các trò chơi học tập hấp dẫn'
  ]
};
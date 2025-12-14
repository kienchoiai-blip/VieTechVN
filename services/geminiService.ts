import { GoogleGenAI } from "@google/genai";
import { SelectionState } from "../types";

const getSystemInstruction = () => `
Bạn là một Chuyên gia Giáo dục hàng đầu tại Việt Nam với 20 năm kinh nghiệm viết "Sáng kiến kinh nghiệm" (SKKN).
Nhiệm vụ của bạn là hỗ trợ giáo viên viết các đề tài sáng kiến kinh nghiệm chất lượng cao, thực tế và chuẩn sư phạm.

VĂN PHONG & ĐỊNH DẠNG:
- Ngôn ngữ: Tiếng Việt chuẩn mực, trang trọng, mang tính hàn lâm sư phạm.
- Cấu trúc: Rõ ràng, mạch lạc, chia thành các phần I, II, III lớn.
- Nội dung: Phải cụ thể, đưa ra các biện pháp thực tế, có thể áp dụng ngay.

CẤU TRÚC BẮT BUỘC CỦA BÀI VIẾT:
1. TÊN ĐỀ TÀI: (Viết in hoa, ngắn gọn, súc tích)
2. PHẦN I: ĐẶT VẤN ĐỀ
   - Lý do chọn đề tài (Cơ sở lý luận & Cơ sở thực tiễn).
   - Thực trạng vấn đề trước khi áp dụng sáng kiến.
3. PHẦN II: GIẢI QUYẾT VẤN ĐỀ
   - Các biện pháp thực hiện (Đây là phần quan trọng nhất, cần liệt kê ít nhất 3-4 biện pháp cụ thể, chi tiết).
   - Ví dụ minh họa (nếu có).
4. PHẦN III: KẾT QUẢ ĐẠT ĐƯỢC
   - Hiệu quả sau khi áp dụng (So sánh trước và sau).
   - Số liệu giả định minh họa sự tiến bộ.
5. PHẦN IV: KẾT LUẬN VÀ KIẾN NGHỊ
`;

export const generateInitiative = async (data: SelectionState): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key chưa được cấu hình.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
  Hãy viết một bản Sáng kiến kinh nghiệm chi tiết dựa trên các thông tin sau:
  - Cấp học: ${data.level}
  - Lớp: ${data.grade}
  - Môn học/Lĩnh vực: ${data.subject}
  - Nhóm vấn đề: ${data.topicCategory}
  - Vấn đề cụ thể cần giải quyết: "${data.specificIssue}"
  
  Yêu cầu đặc biệt: Tập trung sâu vào các giải pháp sáng tạo để giải quyết vấn đề "${data.specificIssue}" cho học sinh ${data.grade}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7, // Balance creativity and structure
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "Xin lỗi, không thể tạo nội dung lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại.");
  }
};
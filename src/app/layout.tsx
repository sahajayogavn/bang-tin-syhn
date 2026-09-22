import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Bảng Tin Sahaja Yoga Hà Nội - Lịch Sự Kiện, Lớp Học & Đêm Nhạc",
  description: "Bảng tin tổng hợp các chương trình biểu diễn nghệ thuật, lớp học thiền nhập môn miễn phí, thiền ngoài trời và sinh hoạt tập thể Sahaja Yoga tại Hà Nội.",
  keywords: ["Sahaja Yoga Hà Nội", "Thiền Hà Nội", "Lớp thiền miễn phí", "Đêm nhạc cổ điển Ấn Độ", "SEAT Tour 2026", "Kundalini"],
  openGraph: {
    title: "Bảng Tin Sahaja Yoga Hà Nội",
    description: "Cập nhật lịch biểu diễn âm nhạc, khóa học thiền định và sự kiện cộng đồng tại Hà Nội",
    type: "website",
    locale: "vi_VN",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

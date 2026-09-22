# 🌸 Bảng Tin Sự Kiện Sahaja Yoga Hà Nội

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Trang bảng tin cập nhật tức thời các chương trình biểu diễn nghệ thuật âm nhạc tâm linh quốc tế, khóa học thiền nhập môn miễn phí, buổi thiền cộng đồng ngoài trời và sinh hoạt định kỳ tại các quận/huyện trên toàn thành phố Hà Nội.

Dữ liệu sự kiện được đồng bộ trực tiếp từ **Google Sheet**, giúp Ban tổ chức và các Điều phối viên có thể cập nhật lịch trình dễ dàng mà không cần phải can thiệp vào mã nguồn.

---

## 🌟 Tính Năng Nổi Bật

- **Responsive & Thẩm Mỹ Cao**: Thiết kế giao diện hiện đại, tối ưu 100% trên điện thoại di động, máy tính bảng và màn hình lớn.
- **Phân Loại & Lọc Đa Chiều theo Địa Bàn Hà Nội**:
  - Lọc theo **Chủ đề**: *Biểu Diễn & Nghệ Thuật, Khóa Học Thiền, Thiền Ngoài Trời, Workshop Chuyên Đề, Sinh Hoạt Hàng Tuần*.
  - Lọc theo **Quận/Huyện**: *Hoàn Kiếm, Cầu Giấy, Tây Hồ, Đống Đa, Hà Đông, Hai Bà Trưng, Ba Đình, v.v.*
  - **Tìm kiếm tức thì**: Tìm kiếm theo tên chương trình, địa chỉ, người phụ trách hoặc từ khóa nội dung.
- **Kết Nối Google Sheet Không Cần Backend Phức Tạp**: Hỗ trợ đọc trực tiếp file Google Sheet qua liên kết công khai (bằng cơ chế tự động chuyển đổi CSV Export).
- **Thẻ Sự Kiện Chi Tiết & Modal Đăng Ký**: Hiển thị đầy đủ thông tin thời gian, bản đồ chỉ đường (Google Maps), hotline liên hệ, học phí/vé (miễn phí) và liên kết đăng ký tham gia.
- **Chia Sẻ Nhanh**: Tích hợp nút sao chép link sự kiện để chia sẻ nhanh vào nhóm Zalo, Facebook, Telegram.

---

## 📋 Hướng Dẫn Cấu Trúc Bảng Dữ Liệu Google Sheet

Để thêm hoặc chỉnh sửa sự kiện hiển thị trên website, bạn chỉ cần tạo 1 file Google Sheet và đặt tên các cột ở **Dòng 1 (Tiêu đề)** như sau:

| Tên Cột (Khuyến nghị) | Tên Tiếng Việt thay thế | Bắt buộc | Mô tả nội dung | Ví dụ mẫu |
| :--- | :--- | :---: | :--- | :--- |
| `title` | `Tên chương trình` | **Có** | Tên chính của chương trình/sự kiện | *Đêm Nhạc Thiền Cổ Điển Ấn Độ SEAT Tour 2026* |
| `subtitle` | `Phụ đề` | Không | Mô tả ngắn gọn dưới tiêu đề | *Trải nghiệm Khai mở Luân xa & Âm nhạc Ragas* |
| `category` | `Phân loại` | Không | Mã hoặc tên thể loại (`bieu-dien`, `khoa-hoc`, `thien-cong-dong`, `workshop`, `sinh-hoat`) | *bieu-dien* |
| `categoryLabel` | `Tên phân loại` | Không | Tên hiển thị của thể loại trên thẻ | *Biểu Diễn Nghệ Thuật* |
| `startDate` | `Ngày bắt đầu` | **Có** | Ngày diễn ra (hoặc chuỗi ngày) | *2026-10-18* hoặc *18/10/2026* |
| `endDate` | `Ngày kết thúc` | Không | Ngày kết thúc nếu khóa học dài ngày | *2026-11-10* |
| `time` | `Khung giờ` | Không | Giờ diễn ra chương trình | *19:30 - 21:30* |
| `locationName` | `Địa điểm` | **Có** | Tên tòa nhà/địa điểm tổ chức | *Nhà Hát Lớn Hà Nội* |
| `district` | `Quận/Huyện` | **Có** | Quận hoặc huyện tại Hà Nội (Dùng để lọc khu vực) | *Hoàn Kiếm* |
| `address` | `Địa chỉ chi tiết` | Không | Số nhà, tên phố, phường cụ thể | *Số 1 Tràng Tiền, Hoàn Kiếm, Hà Nội* |
| `mapUrl` | `Link Google Maps` | Không | Đường link ghim vị trí trên Google Maps | *https://maps.google.com/?q=...* |
| `fee` | `Học phí / Vé` | Không | Chi phí tham gia (mặc định Miễn phí 100%) | *Miễn phí 100%* |
| `targetAudience` | `Đối tượng tham gia`| Không | Thành phần người tham dự | *Dành cho người mới bắt đầu* |
| `registrationUrl` | `Link đăng ký` | Không | Link biểu mẫu Google Form hoặc trang đăng ký | *https://sahajayogavietnam.org/dang-ky* |
| `contactPhone` | `Hotline` | Không | Số điện thoại giải đáp thắc mắc | *0988 123 456* |
| `contactName` | `Người liên hệ` | Không | Tên người hoặc ban phụ trách | *Ban Tổ Chức Tour Hà Nội* |
| `bannerUrl` | `Link ảnh banner` | Không | Đường link ảnh minh họa của sự kiện | *https://images.unsplash.com/...* |
| `highlightTag` | `Thẻ nổi bật` | Không | Nhãn đỏ làm nổi bật sự kiện | *SỰ KIỆN LỚN* / *HOT* |
| `description` | `Mô tả chi tiết` | Không | Bài viết giới thiệu nội dung chương trình | *Nội dung chi tiết chương trình...* |

### Cách chia sẻ Google Sheet:
1. Mở file Google Sheet của bạn trên trình duyệt.
2. Bấm nút **Chia sẻ** (Share) ở góc trên bên phải.
3. Trong mục *Quyền truy cập chung*, chuyển thành **Bất kỳ ai có đường liên kết** (Anyone with the link) với quyền **Người xem** (Viewer).
4. Sao chép đường liên kết và dán vào nút **"Cấu hình Google Sheet"** trên góc phải website, hoặc đặt vào biến môi trường `NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL` trong file `.env.local`.

---

## 🚀 Cài Đặt & Khởi Chạy Dự Án

### Yêu Cầu Môi Trường
- Node.js 18.18.0 trở lên
- npm, pnpm hoặc yarn

### Cài đặt dependencies
```bash
git clone https://github.com/sahajayogavn/bang-tin-syhn.git
cd bang-tin-syhn
npm install
```

### Thiết lập biến môi trường (Tùy chọn)
Tạo file `.env.local` từ mẫu:
```bash
cp .env.example .env.local
```
Điền link Google Sheet vào file `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
```

### Chạy ở môi trường Development
```bash
npm run dev
```
Mở trình duyệt tại: [http://localhost:3000](http://localhost:3000)

### Đóng gói Production
```bash
npm run build
npm start
```

---

## 📁 Cấu Trúc Dự Án

```
bang-tin-syhn/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── events/
│   │   │       └── route.ts     # API fetch & parse Google Sheet sang JSON
│   │   ├── globals.css          # Tailwind CSS style
│   │   ├── layout.tsx           # SEO Metadata & Font chữ
│   │   └── page.tsx             # Giao diện Bảng tin chính & Bộ lọc
│   ├── components/
│   │   ├── EventCard.tsx        # Component thẻ sự kiện
│   │   ├── EventDetailModal.tsx # Modal xem chi tiết sự kiện
│   │   └── SheetConfigModal.tsx # Modal dán link Google Sheet trực tiếp
│   ├── data/
│   │   └── mockEvents.ts        # Dữ liệu sự kiện mẫu khởi tạo
│   ├── lib/
│   │   └── sheets.ts            # Xử lý parse Google Sheet & CSV
│   └── types/
│       └── event.ts             # TypeScript definitions cho sự kiện
├── public/                      # Static assets
├── README.md                    # Hướng dẫn dự án
├── LICENSE                      # Giấy phép MIT
└── package.json
```

---

## 🤝 Đóng Góp Phát Triển

Dự án này là mã nguồn mở phục vụ cho cộng đồng thiền định Sahaja Yoga Việt Nam:
1. Fork repository
2. Tạo nhánh tính năng (`git checkout -b feature/tinh-nang-moi`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng lọc theo thời gian'`)
4. Push lên nhánh (`git push origin feature/tinh-nang-moi`)
5. Mở Pull Request trên GitHub

---

## 📄 Bản Quyền (License)

Phát hành theo giấy phép [MIT License](LICENSE).

# 🌸 Bảng Tin Điều Phối & Sự Kiện Sahaja Yoga Hà Nội

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Trang bảng tin truyền thông và điều phối nội bộ dành cho Ban Tổ Chức và các nhóm thiền sinh Sahaja Yoga tại thủ đô Hà Nội. 

Website tập trung vào **hiển thị nhanh các sự kiện quan trọng (Đã / Đang / Sắp diễn ra)** với khả năng **bấm xem chi tiết (Expand/Collapse)**, kết hợp **bảng Kanban theo dõi công việc triển khai** (có tính năng liên kết phụ thuộc giữa các task `dependsOn`) và hiển thị thông tin người phụ trách kèm số điện thoại liên hệ trực tiếp.

---

## 🌟 Các Tính Năng Trọng Tâm

1. **Bảng Tin Sự Kiện Nội Bộ (Expand/Collapse)**:
   - Phân loại rõ nét trạng thái thời gian: **Sắp diễn ra**, **Đang diễn ra**, **Đã hoàn thành**.
   - Bấm vào bất kỳ sự kiện nào để mở rộng (expand) kế hoạch chi tiết, mục tiêu, phân công hậu cần mà không bị chuyển trang.
   - Thẻ hiển thị ngay mức độ ưu tiên (`ƯU TIÊN HÀNG ĐẦU`, `QUAN TRỌNG`), quận/huyện diễn ra và thông tin người phụ trách chính + hotline.

2. **Bảng Kanban Công Việc & Liên Kết Task (`dependsOn`)**:
   - 4 cột trạng thái: **Cần làm (To-Do)** ➜ **Đang triển khai (In Progress)** ➜ **Chờ duyệt / Nghiệm thu (Review)** ➜ **Đã hoàn thành (Done)**.
   - **Liên kết task này với task kia**: Hiển thị rõ task nào phụ thuộc vào task nào (ví dụ: *Task in ấn poster & chạy truyền thông* phụ thuộc vào *Task có giấy phép biểu diễn của Sở VH&TT* và *Hợp đồng thuê khán phòng*).
   - Hiển thị người phụ trách, số điện thoại để gọi trực tiếp và sản phẩm bàn giao (Deliverable).
   - Bộ lọc chọn theo từng sự kiện cụ thể hoặc xem toàn bộ công việc của Hà Nội.

3. **Tích Hợp Google Sheet Nhanh Chóng**:
   - Đọc dữ liệu trực tiếp từ Google Sheet mà không cần cấu hình cơ sở dữ liệu phức tạp.
   - Có nút **"Gắn link Google Sheet"** trực tiếp trên thanh menu website để ban tổ chức dán link và đồng bộ ngay.

---

## 📋 Hướng Dẫn Cấu Trúc Bảng Dữ Liệu Google Sheet

Khi tạo file Google Sheet, bạn đặt tên các cột ở **Dòng 1 (Hàng tiêu đề)** như sau:

| Tên Cột đề xuất | Tên Tiếng Việt thay thế | Bắt buộc | Nội dung cần điền | Ví dụ mẫu |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `Mã sự kiện` | Không | Mã định danh sự kiện | `hn-seat-tour-2026` |
| `title` | `Tên sự kiện` | **Có** | Tiêu đề chính sự kiện | *Đại Nhạc Hội Thiền Cổ Điển SEAT Tour 2026* |
| `timeStatus` | `Tiến độ` / `Thời gian` | **Có** | `upcoming` (sắp tới), `ongoing` (đang làm), `past` (đã qua) | *upcoming* hoặc *Sắp diễn ra* |
| `startDate` | `Ngày bắt đầu` | **Có** | Ngày diễn ra | *18/10/2026* |
| `endDate` | `Ngày kết thúc` | Không | Ngày kết thúc (nếu kéo dài) | *10/11/2026* |
| `time` | `Giờ diễn ra` | Không | Khung giờ cụ thể | *19:30 - 21:30* |
| `locationName` | `Địa điểm` | **Có** | Tên địa điểm/hội trường | *Cung Văn Hóa Lao Động Hữu Nghị Việt Xô* |
| `district` | `Quận/Huyện` | **Có** | Quận tại Hà Nội | *Hoàn Kiếm* |
| `address` | `Địa chỉ` | Không | Địa chỉ số nhà, đường phố | *91 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội* |
| `coordinator` | `Người phụ trách` | **Có** | Người điều phối chính sự kiện | *Tuấn Minh* |
| `coordinatorPhone` | `SĐT người phụ trách` | Không | Hotline để gọi trực tiếp | *0912 888 999* |
| `importance` | `Mức độ quan trọng` | Không | `critical`, `high`, `normal` | *critical* |
| `badge` | `Thẻ nổi bật` | Không | Nhãn tóm tắt nổi bật | *TRỌNG TÂM QUỐC GIA* |
| `summary` | `Tóm tắt sự kiện` | Không | Tóm tắt 1-2 câu về sự kiện | *Chương trình âm nhạc biểu diễn 1.000 khán giả...* |
| `details` | `Nội dung chi tiết` | Không | Toàn bộ kế hoạch, mục tiêu, kịch bản (khi bấm expand ra xem) | *1. Mục tiêu... 2. Nội dung... 3. Hậu cần...* |
| `checklistSummary`| `Tình trạng công việc`| Không | Tóm tắt tiến độ ngắn gọn | *Đã ký HĐ địa điểm • Đang xin giấy phép Sở VH* |

---

## 🚀 Khởi Chạy Dự Án

### Chạy Local
```bash
git clone https://github.com/sahajayogavn/bang-tin-syhn.git
cd bang-tin-syhn
npm install
npm run dev -- -p 3005
```
Mở trình duyệt: [http://localhost:3005](http://localhost:3005)

### Build Production
```bash
npm run build
npm start
```

---

## 📄 Bản Quyền (License)

Dự án được phát hành theo giấy phép [MIT License](LICENSE).

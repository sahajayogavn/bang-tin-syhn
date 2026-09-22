import { SYEvent, SYTask } from '../types/event';

export const INITIAL_TASKS: SYTask[] = [
  // Tasks cho hn-seat-tour-2026
  {
    id: 'TASK-01',
    eventId: 'hn-seat-tour-2026',
    title: 'Nộp hồ sơ xin cấp phép biểu diễn nghệ thuật quốc tế',
    description: 'Nộp hồ sơ gồm danh sách nghệ sĩ nước ngoài (Áo, Ý, Ấn Độ), nội dung bài hát và kịch bản lên Sở VH&TT Hà Nội theo Nghị định 144.',
    assignee: 'Tuấn Minh',
    assigneePhone: '0912 888 999',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-09-30',
    dependsOn: [],
    deliverable: 'Giấy tiếp nhận hồ sơ Sở VH&TT HN'
  },
  {
    id: 'TASK-02',
    eventId: 'hn-seat-tour-2026',
    title: 'Ký hợp đồng thuê khán phòng Nhà Hát & đặt cọc',
    description: 'Chốt hợp đồng âm thanh, ánh sáng, máy chiếu và khu vực đón tiếp khách VIP.',
    assignee: 'Hồng Nhung',
    assigneePhone: '0988 333 444',
    status: 'done',
    priority: 'high',
    dueDate: '2026-09-20',
    dependsOn: [],
    deliverable: 'Hợp đồng thuê địa điểm đã ký'
  },
  {
    id: 'TASK-03',
    eventId: 'hn-seat-tour-2026',
    title: 'Thiết kế Poster, Banner & Thư mời đại biểu',
    description: 'Thiết kế bộ nhận diện SEAT Tour 2026 chuẩn brand Sahaja Yoga, in ấn thư mời cứng cho các đối tác văn hóa.',
    assignee: 'Đức Huy',
    assigneePhone: '0977 111 222',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-10-05',
    dependsOn: ['TASK-02'], // Link: Cần chốt địa điểm trước
    deliverable: 'File Figma + Maket in ấn'
  },
  {
    id: 'TASK-04',
    eventId: 'hn-seat-tour-2026',
    title: 'Chạy chiến dịch truyền thông & mở link đăng ký vé miễn phí',
    description: 'Đăng bài fanpage, gửi email cho cộng đồng và mở form đăng ký giữ chỗ trực tuyến.',
    assignee: 'Phương Lan',
    assigneePhone: '0904 555 666',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-10-07',
    dependsOn: ['TASK-01', 'TASK-03'], // Link: Cần xong Giấy phép & Thiết kế
    deliverable: 'Link form Google Form & Bài ghim Fanpage'
  },
  {
    id: 'TASK-05',
    eventId: 'hn-seat-tour-2026',
    title: 'Sắp xếp khách sạn & đưa đón đoàn nghệ sĩ quốc tế',
    description: 'Đặt phòng cho 12 nghệ sĩ quốc tế, xe 29 chỗ đưa đón sân bay Nội Bài và lịch trình ăn uống thanh tịnh.',
    assignee: 'Khánh Linh',
    assigneePhone: '0936 777 888',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-10-12',
    dependsOn: ['TASK-01'], // Link: Sau khi duyệt visa & cấp phép
    deliverable: 'Bảng xác nhận phòng & lịch trình xe đón'
  },
  {
    id: 'TASK-06',
    eventId: 'hn-seat-tour-2026',
    title: 'Tập huấn đội ngũ Tình nguyện viên đón tiếp & Trải nghiệm Luân xa',
    description: 'Phân công 25 tình nguyện viên hỗ trợ check-in, hướng dẫn chỗ ngồi và bàn trải nghiệm Kundalini sau biểu diễn.',
    assignee: 'Thanh Hằng',
    assigneePhone: '0912 345 678',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-10-15',
    dependsOn: ['TASK-04'], // Link: Sau khi có danh sách đăng ký
    deliverable: 'Bảng phân công vị trí TNV'
  },

  // Tasks cho hn-khoa-hoc-thang10
  {
    id: 'TASK-11',
    eventId: 'hn-khoa-hoc-thang10',
    title: 'Biên soạn tài liệu 4 buổi học nhập môn & in ấn tờ gấp',
    description: 'Cập nhật giáo trình 3 kênh năng lượng, 7 luân xa và kỹ thuật ngâm chân nước muối.',
    assignee: 'Bác Tuấn',
    assigneePhone: '0936 111 222',
    status: 'done',
    priority: 'high',
    dueDate: '2026-09-18',
    dependsOn: [],
    deliverable: 'Tài liệu PDF & 200 bản in màu'
  },
  {
    id: 'TASK-12',
    eventId: 'hn-khoa-hoc-thang10',
    title: 'Setup phòng thiền & hệ thống âm thanh Cầu Giấy',
    description: 'Chuẩn bị thảm ngồi, loa kiểm âm cho nhạc Ragas và chậu ngâm chân thực hành.',
    assignee: 'Việt Anh',
    assigneePhone: '0982 444 555',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2026-10-15',
    dependsOn: ['TASK-11'],
    deliverable: 'Phòng thiền hoàn thiện sẵn sàng đón người mới'
  },
  {
    id: 'TASK-13',
    eventId: 'hn-khoa-hoc-thang10',
    title: 'Gửi SMS & Zalo nhắc lịch cho học viên đã đăng ký',
    description: 'Nhắn tin địa chỉ cụ thể, hướng dẫn gửi xe và trang phục thoải mái trước ngày khai giảng.',
    assignee: 'Thanh Hằng',
    assigneePhone: '0912 345 678',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-10-19',
    dependsOn: ['TASK-12'],
    deliverable: 'Báo cáo 100% học viên đã nhận tin nhắn'
  },

  // Tasks cho hn-tong-ket-quy3
  {
    id: 'TASK-21',
    eventId: 'hn-tong-ket-quy3',
    title: 'Tổng hợp số liệu người mới trải nghiệm quý 3/2026',
    description: 'Thống kê lượng người tham gia các lớp nhập môn tại Hà Nội và tỷ lệ duy trì sinh hoạt định kỳ.',
    assignee: 'Tuấn Minh',
    assigneePhone: '0912 888 999',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-09-15',
    dependsOn: [],
    deliverable: 'Báo cáo Google Slides tổng kết quý'
  }
];

export const INITIAL_EVENTS: SYEvent[] = [
  {
    id: 'hn-seat-tour-2026',
    title: 'Đại Nhạc Hội Thiền Cổ Điển SEAT Tour 2026 & Trải Nghiệm Khai Mở Năng Lượng Kundalini',
    timeStatus: 'upcoming',
    timeStatusLabel: 'Sắp diễn ra',
    startDate: '18/10/2026',
    time: '19:30 - 21:30 (Tối Chủ Nhật)',
    locationName: 'Cung Văn Hóa Lao Động Hữu Nghị Việt Xô (Hội trường lớn)',
    address: '91 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
    district: 'Hoàn Kiếm',
    coordinator: 'Tuấn Minh (Trưởng Ban Tổ Chức)',
    coordinatorPhone: '0912 888 999',
    importance: 'critical',
    badge: 'TRỌNG TÂM QUỐC GIA',
    summary: 'Chương trình biểu diễn âm nhạc tâm linh quốc tế quy mô 1.000 khán giả với sự tham gia của các nghệ sĩ Áo, Ý, Ấn Độ và Việt Nam, kết hợp trải nghiệm Giác Ngộ trực tiếp.',
    details: `1. MỤC TIÊU SỰ KIỆN:
- Giới thiệu nghệ thuật âm nhạc cổ điển Ragas Ấn Độ và những rung động thanh lọc tâm trí đến đông đảo công chúng Hà Nội.
- Đem lại trải nghiệm Giác Ngộ Tự Thân (Self-Realization) trực tiếp và hoàn toàn miễn phí cho trên 1.000 khán giả.
- Kết nối các thiền sinh và bạn yêu thiền trên toàn miền Bắc.

2. CÁC NỘI DUNG CHÍNH:
- 18:30 - 19:30: Đón tiếp đại biểu, phát tờ gấp và trải nghiệm sơ khởi tại sảnh.
- 19:30 - 19:50: Lời chào mừng, giới thiệu ý nghĩa triết lý hòa bình của Shri Mataji Nirmala Devi.
- 19:50 - 20:40: Phần trình diễn nhạc cụ truyền thống: Sitar, Harmonium, Tabla và các làn điệu Ragas cổ điển.
- 20:40 - 21:10: Hướng dẫn trải nghiệm Khai mở năng lượng Kundalini tập thể.
- 21:10 - 21:30: Tiết mục đại hợp xướng quốc tế và kết thúc.

3. LƯU Ý ĐIỀU PHỐI NỘI BỘ:
- Đang gấp rút hoàn tất thủ tục cấp phép biểu diễn nghệ sĩ nước ngoài với Sở Văn Hóa & Thể Thao Hà Nội.
- Phân công đội ngũ TNV hỗ trợ đón đoàn nghệ sĩ sân bay Nội Bài ngày 16/10/2026.`,
    checklistSummary: 'Đã ký HĐ địa điểm • Đang xin phép Sở VH&TT • Chuẩn bị in ấn poster & mở đăng ký'
  },
  {
    id: 'hn-khoa-hoc-thang10',
    title: 'Khóa Học Thiền Nhập Môn K42: "Tìm Lại Sự Tĩnh Lặng & Cân Bằng Năng Lượng"',
    timeStatus: 'ongoing',
    timeStatusLabel: 'Đang triển khai',
    startDate: '20/10/2026',
    endDate: '10/11/2026',
    time: '19:00 - 20:30 (Thứ Ba & Thứ Năm hàng tuần)',
    locationName: 'Trung Tâm Sahaja Yoga Cầu Giấy',
    address: 'Tầng 4, Tòa nhà Detech, Số 8 Tôn Thất Thuyết, Mỹ Đình 2, Nam Từ Liêm',
    district: 'Cầu Giấy',
    coordinator: 'Thanh Hằng',
    coordinatorPhone: '0912 345 678',
    importance: 'high',
    badge: 'LỚP ĐỊNH KỲ THÁNG 10',
    summary: 'Chuỗi 4 buổi học nhập môn chuyên sâu dành cho người mới sau sự kiện SEAT Tour, tiếp sức duy trì thiền định mỗi ngày tại nhà.',
    details: `1. KẾ HOẠCH BÀI GIẢNG 4 BUỔI:
- Buổi 1 (20/10): Giới thiệu hệ thống năng lượng tinh tế (3 kênh, 7 luân xa), trải nghiệm Không Suy Nghĩ.
- Buổi 2 (27/10): Kênh Trái (Cảm xúc, quá khứ) & Kỹ thuật thanh lọc yếu tố Lửa/Nến.
- Buổi 3 (03/11): Kênh Phải (Hành động, tương lai) & Kỹ thuật thanh lọc yếu tố Nước/Ngâm chân nước muối.
- Buổi 4 (10/11): Kênh Giữa (Hiện tại, tiến hóa) & Thực hành duy trì rung động mát lành.

2. CÔNG TÁC HẬU CẦN:
- Chuẩn bị đủ 50 bộ chậu ngâm chân + muối sạch cho buổi 3.
- In sẵn 200 cuốn cẩm nang thiền mini phát tận tay học viên.`,
    checklistSummary: 'Đã hoàn tất tài liệu • Đang setup phòng thiền • Dự kiến 60 học viên tham dự'
  },
  {
    id: 'hn-thien-ngoai-troi-hotay',
    title: 'Buổi Thiền Ngoài Trời & Giao Lưu Kết Nối Thanh Lọc Thiên Nhiên Bên Hồ Tây',
    timeStatus: 'upcoming',
    timeStatusLabel: 'Sắp diễn ra',
    startDate: '25/10/2026',
    time: '06:00 - 08:30 (Sáng Chủ Nhật)',
    locationName: 'Bến Hàn Quốc / Vườn hoa ven Hồ Tây',
    address: 'Đường Nguyễn Đình Thi, Bưởi, Tây Hồ, Hà Nội',
    district: 'Tây Hồ',
    coordinator: 'Minh Đức',
    coordinatorPhone: '0904 999 888',
    importance: 'normal',
    badge: 'THIÊN NHIÊN & KẾT NỐI',
    summary: 'Hoạt động dã ngoại đón bình minh, thiền định cùng các nguyên tố tự nhiên (Nước Hồ Tây, Gió mát) và dùng điểm tâm nhẹ.',
    details: `1. LỊCH TRÌNH:
- 06:00: Tập trung tại khu vực bãi cỏ ven hồ.
- 06:15 - 07:15: Thiền buổi sớm đón nắng mai, kết nối nguyên tố Đất và Nước.
- 07:15 - 08:30: Thưởng trà, điểm tâm nhẹ và chia sẻ cảm nhận tu tập.

2. CHUẨN BỊ NỘI BỘ:
- Thiền sinh tự mang theo thảm ngồi hoặc khăn trải.
- Ban hậu cần chuẩn bị trà ấm và bánh ngọt.`,
    checklistSummary: 'Đã khảo sát địa điểm • Chuẩn bị thông báo nhóm Zalo thiền sinh'
  },
  {
    id: 'hn-tong-ket-quy3',
    title: 'Hội Nghị Tổng Kết Hoạt Động Thiền Định Quý 3 & Định Hướng Tour Cuối Năm',
    timeStatus: 'past',
    timeStatusLabel: 'Đã diễn ra',
    startDate: '15/09/2026',
    time: '14:00 - 17:30 (Chiều Thứ Bảy)',
    locationName: 'Trung Tâm Sahaja Yoga Đống Đa',
    address: 'Số 168 Xã Đàn, Nam Đồng, Đống Đa, Hà Nội',
    district: 'Đống Đa',
    coordinator: 'Bác Tuấn',
    coordinatorPhone: '0936 111 222',
    importance: 'normal',
    badge: 'ĐÃ HOÀN TẤT',
    summary: 'Đánh giá các lớp học đã mở trong quý 3, phân công nhân sự các tiểu ban phục vụ sự kiện biểu diễn quốc tế SEAT Tour 2026.',
    details: `1. KẾT QUẢ ĐẠT ĐƯỢC:
- Quý 3 đã mở thành công 3 khóa học với hơn 140 học viên mới tại Cầu Giấy và Đống Đa.
- Thành lập Ban Chỉ Đạo chuẩn bị SEAT Tour 2026 gồm 5 tiểu ban: Cấp phép, Hậu cần, Âm thanh, Truyền thông và Đón tiếp.

2. CÁC NGHỊ QUYẾT ĐÃ THÔNG QUA:
- Ưu tiên 100% nguồn lực cho sự kiện biểu diễn tháng 10/2026.
- Phê duyệt ngân sách dự trù in ấn và thuê địa điểm.`,
    checklistSummary: 'Đã lưu biên bản cuộc họp & gửi slide tổng kết cho các trưởng nhóm'
  }
];

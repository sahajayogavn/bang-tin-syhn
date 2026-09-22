import { SYEvent, SYTask } from '../types/event';

export const INITIAL_EVENTS: SYEvent[] = [
  {
    id: 'seat-tour-2026',
    title: 'SEAT Tour 2026, địa điểm Hà Nội',
    timeStatus: 'upcoming',
    timeStatusLabel: 'Sắp diễn ra',
    startDate: '2026-10-30',
    endDate: '2026-11-03',
    time: 'Cả ngày (Lịch trình lưu diễn)',
    locationName: 'Nhiều địa điểm ở Hà Nội & Hưng Yên',
    address: 'Nhiều địa điểm ở Hà Nội & Hưng Yên',
    district: 'Hà Nội & Hưng Yên',
    coordinator: 'Ngọc Anh',
    coordinatorPhone: '',
    importance: 'critical',
    badge: 'SEAT',
    summary: 'Chương trình lưu diễn âm nhạc tâm linh quốc tế Đông Nam Á (SEAT Tour 2026) với các nghệ sĩ quốc tế tại Hà Nội và Hưng Yên.',
    details: `1. MỤC TIÊU:
- Đón tiếp đoàn nghệ sĩ quốc tế và tổ chức các đêm nhạc thiền cổ điển kết hợp Khai mở Năng lượng Kundalini.
- Phối hợp biểu diễn tại nhiều địa điểm văn hóa, nhà hát tại Hà Nội và Hưng Yên.

2. CÁC HẠNG MỤC TRỌNG YẾU:
- Hoàn thiện hồ sơ xin cấp phép biểu diễn nghệ thuật người nước ngoài (Sở VH&TT Hà Nội).
- Khảo sát và ký hợp đồng địa điểm biểu diễn.
- Đón tiếp, visa, phương tiện di chuyển 29 chỗ và nơi lưu trú cho đoàn nghệ sĩ.
- Truyền thông cộng đồng, phát hành thư mời và đăng ký vé miễn phí.`,
    checklistSummary: 'Đang làm hồ sơ cấp phép Sở VH&TT • Khảo sát địa điểm • Lên danh sách TNV'
  },
  {
    id: 'national-puja-vn-2026',
    title: 'Puja National 2026, TP. Hồ Chí Minh',
    timeStatus: 'upcoming',
    timeStatusLabel: 'Sắp diễn ra',
    startDate: 'Cuối năm 2026',
    time: 'Theo lịch trình Puja',
    locationName: 'TP. Hồ Chí Minh',
    address: 'TP. Hồ Chí Minh',
    district: 'TP. HCM',
    coordinator: 'Collective',
    coordinatorPhone: '',
    importance: 'critical',
    badge: 'PUJA',
    summary: 'Đại lễ Puja Toàn Quốc 2026 quy tụ thiền sinh Sahaja Yoga từ ba miền Bắc - Trung - Nam tại TP. Hồ Chí Minh.',
    details: `1. MỤC TIÊU:
- Tăng cường rung động tập thể quốc gia, đón tiếp các yogi từ các tỉnh thành về tham dự.

2. CÔNG TÁC PHỐI HỢP CỦA HÀ NỘI:
- Lên danh sách đoàn thiền sinh Hà Nội & miền Bắc đăng ký tham dự.
- Phối hợp đặt vé máy bay/tàu và chỗ ở tập trung tại TP.HCM.
- Chuẩn bị các tiết mục dâng hoa, âm nhạc bhajan đóng góp cho đại lễ.`,
    checklistSummary: 'Chuẩn bị thông báo đăng ký đoàn Hà Nội tham dự'
  },
  {
    id: 'havan-puja',
    title: 'Havan & Puja',
    timeStatus: 'upcoming',
    timeStatusLabel: 'Sắp diễn ra',
    startDate: 'Theo lịch tập thể',
    time: 'Buổi sáng',
    locationName: 'Ashram / Địa điểm tập thể',
    address: 'Hà Nội',
    district: 'Hà Nội',
    coordinator: 'Collective',
    coordinatorPhone: '',
    importance: 'high',
    badge: 'PUJA',
    summary: 'Nghi thức Havan thanh lọc lửa thiêng và buổi lễ Puja truyền thống của tập thể Sahaja Yoga Hà Nội.',
    details: `1. NỘI DUNG:
- Chuẩn bị củi gỗ thanh sạch, bơ ghee, thảo mộc samagri cho nghi thức Havan thanh lọc các luân xa.
- Buổi lễ Puja thành kính dâng lên Đức Mẹ Shri Mataji Nirmala Devi.

2. PHÂN CÔNG:
- Ban chuẩn bị vật phẩm lễ (hoa tươi, trái cây, prasadam).
- Ban âm thanh & ca nhạc Bhajan.`,
    checklistSummary: 'Lên lịch ngày tổ chức phù hợp & chuẩn bị vật phẩm Havan'
  },
  {
    id: 'navaratri-2026',
    title: 'Navaratri 2026',
    timeStatus: 'upcoming',
    timeStatusLabel: 'Sắp diễn ra',
    startDate: 'Tháng 10/2026',
    time: '9 đêm liên tục',
    locationName: 'Các trung tâm & Trực tuyến Zoom',
    address: 'Hà Nội',
    district: 'Hà Nội',
    coordinator: 'Collective',
    coordinatorPhone: '',
    importance: 'high',
    badge: 'NAVARATRI',
    summary: 'Đại lễ 9 đêm tôn vinh 9 hình thái Năng Lượng Thần Thánh Shri Durga thanh lọc toàn bộ hệ thống thần kinh tinh tế.',
    details: `1. KẾ HOẠCH:
- Tổ chức thiền tập thể mỗi tối đón nhận rung động của từng khía cạnh năng lượng.
- Đọc bài giảng của Shri Mataji về ý nghĩa của Navaratri và chiến thắng của sự thật.
- Chuẩn bị trang phục truyền thống và các bài hát ngợi ca.`,
    checklistSummary: 'Lên khung giờ thiền 9 đêm & tài liệu bài giảng'
  },
  {
    id: 'seeker-class-vtv-14h30',
    title: 'Lớp seeker 14h30-15h30 Chủ Nhật hàng tuần, 40 Vương Thừa Vũ',
    timeStatus: 'ongoing',
    timeStatusLabel: 'Đang diễn ra',
    startDate: '2026-03-26',
    time: '14:30 - 15:30 (Chủ Nhật hàng tuần)',
    locationName: '40 Vương Thừa Vũ, Thanh Xuân, Hà Nội',
    address: '40 Vương Thừa Vũ, Thanh Xuân, Hà Nội',
    district: 'Thanh Xuân',
    coordinator: 'Bảo Linh',
    coordinatorPhone: '081.447.8038',
    importance: 'normal',
    badge: 'SEEKER',
    summary: 'Lớp thiền nhập môn buổi chiều Chủ Nhật dành cho người mới tìm hiểu về hệ thống năng lượng Kundalini.',
    details: `1. ĐỐI TƯỢNG:
- Người mới bắt đầu, người tìm kiếm chân lý (Seekers).

2. NỘI DUNG BUỔI HỌC:
- Trải nghiệm Khai mở năng lượng (Self-Realization).
- Hướng dẫn nhận biết rung động mát/ấm trên đầu ngón tay.
- Thực hành trạng thái Không Suy Nghĩ (Thoughtless Awareness).`,
    checklistSummary: 'Duy trì đều đặn hàng tuần • Có thiền sinh hỗ trợ trực tiếp'
  },
  {
    id: 'seeker-class-vtv-15h30',
    title: 'Lớp seeker 15h30-17h00 Chủ Nhật hàng tuần, 40 Vương Thừa Vũ',
    timeStatus: 'ongoing',
    timeStatusLabel: 'Đang diễn ra',
    startDate: '2026-03-26',
    time: '15:30 - 17:00 (Chủ Nhật hàng tuần)',
    locationName: '40 Vương Thừa Vũ, Thanh Xuân, Hà Nội',
    address: '40 Vương Thừa Vũ, Thanh Xuân, Hà Nội',
    district: 'Thanh Xuân',
    coordinator: 'Bảo Linh',
    coordinatorPhone: '081.447.8038',
    importance: 'normal',
    badge: 'SEEKER',
    summary: 'Lớp nâng cao kỹ thuật thanh lọc (Footsoaking, Nến) và kiến thức các luân xa cho học viên sau nhập môn.',
    details: `1. NỘI DUNG CHUYÊN SÂU:
- Thực hành kỹ thuật ngâm chân nước muối (Footsoaking) cân bằng Kênh Phải và Kênh Trái.
- Tìm hiểu chuyên sâu từng luân xa: Mooladhara, Swadhishthana, Nabhi, Anahat...
- Nghe trích đoạn bài giảng âm thanh/video có phụ đề tiếng Việt.`,
    checklistSummary: 'Chuẩn bị đầy đủ chậu ngâm chân và tài liệu học tập'
  },
  {
    id: 'seeker-class-hqv-20h',
    title: 'Lớp seeker 20h00-21h00, Số 72 ngõ 106 Hoàng Quốc Việt',
    timeStatus: 'ongoing',
    timeStatusLabel: 'Đang diễn ra',
    startDate: '2026-08-09',
    time: '20:00 - 21:00 (Tối định kỳ)',
    locationName: 'Số 72 ngõ 106 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    address: 'Số 72 ngõ 106 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    district: 'Cầu Giấy',
    coordinator: 'Lê Thi',
    coordinatorPhone: '093.232.8800',
    importance: 'normal',
    badge: 'SEEKER',
    summary: 'Điểm thiền khu vực Cầu Giấy - Bắc Từ Liêm, hỗ trợ người mới trải nghiệm tĩnh lặng và giải tỏa căng thẳng sau giờ làm việc.',
    details: `1. THỜI GIAN & ĐỊA ĐIỂM:
- Số 72 ngõ 106 Hoàng Quốc Việt (có chỗ để xe thuận tiện).
- 20:00 - 21:00 tối.

2. NỘI DUNG:
- Giới thiệu thiền định Sahaja Yoga tự nhiên, không mất phí.
- Hướng dẫn thực hành thiền tập thể buổi tối.`,
    checklistSummary: 'Đang duy trì ổn định mỗi tuần'
  },
  {
    id: 'seeker-class-online-21h',
    title: 'Lớp thực hành thiền online 21h00-21h30 Tối Thứ 3, 5, 7 (Duy trì từ năm 2023)',
    timeStatus: 'ongoing',
    timeStatusLabel: 'Đang diễn ra',
    startDate: '2023-10-10',
    time: '21:00 - 21:30 (Tối Thứ 3, 5, 7 hàng tuần)',
    locationName: 'Trực tuyến qua Zoom / Google Meet',
    address: 'Online / Zoom',
    district: 'Online',
    coordinator: 'Hùng bé',
    coordinatorPhone: '036.666.7975',
    importance: 'normal',
    badge: 'SEEKER',
    summary: 'Phòng thiền trực tuyến 30 phút mỗi tối 3-5-7 giúp học viên cả nước duy trì thói quen thiền định đều đặn trước khi ngủ.',
    details: `1. HÌNH THỨC:
- Mở phòng Zoom định kỳ 20:55, bắt đầu thiền 21:00 - 21:30.
- Dành cho tất cả những ai không có điều kiện đến trung tâm trực tiếp.

2. NỘI DUNG:
- Cùng nâng Kundalini, tạo Bandhan bảo vệ năng lượng.
- Nghe nhạc Ragas hoặc bài hát tĩnh tâm và thiền trong im lặng.`,
    checklistSummary: 'Duy trì liên tục từ tháng 10/2023 đến nay'
  },
  {
    id: 'dich-thuat',
    title: 'Dịch sách và tài liệu Sahaja Yoga',
    timeStatus: 'ongoing',
    timeStatusLabel: 'Đang diễn ra',
    startDate: 'Dự án liên tục',
    time: 'Làm việc linh hoạt theo nhóm',
    locationName: 'Online / Google Drive',
    address: 'Hà Nội',
    district: 'Hà Nội',
    coordinator: 'Bảo Linh',
    coordinatorPhone: '081.447.8038',
    importance: 'normal',
    badge: 'CONTENT',
    summary: 'Dự án dịch thuật, hiệu đính các ấn phẩm sách, cẩm nang hướng dẫn và phụ đề bài giảng của Shri Mataji sang tiếng Việt.',
    details: `1. MỤC TIÊU:
- Hoàn thiện bản dịch các đầu sách nền tảng cho người mới và thiền sinh.
- Biên dịch tài liệu phát tay cho các đợt sự kiện lớn như SEAT Tour.
- Hiệu đính thuật ngữ năng lượng tinh tế chuẩn xác, trong sáng.`,
    checklistSummary: 'Đang dịch các chương sách mới & tờ gấp SEAT Tour'
  },
  {
    id: 'seeker-class-md-20h30',
    title: 'Lớp seeker 20h00-21h00 tại toà nhà Sông Đà, đường Phạm Hùng, Mỹ Đình',
    timeStatus: 'past',
    timeStatusLabel: 'Đã kết thúc',
    startDate: '2026-04-09',
    endDate: '2026-06-12',
    time: '20:00 - 21:00',
    locationName: 'Toà nhà Sông Đà, đường Phạm Hùng, Mỹ Đình, Nam Từ Liêm',
    address: 'Toà nhà Sông Đà, đường Phạm Hùng, Mỹ Đình',
    district: 'Nam Từ Liêm',
    coordinator: 'Vũ Hiền',
    coordinatorPhone: '098.937.2066',
    importance: 'normal',
    badge: 'SEEKER',
    summary: 'Khóa học seeker quý 2/2026 khu vực Mỹ Đình đã hoàn thành tốt đẹp với hơn 30 học viên tốt nghiệp.',
    details: `1. KẾT QUẢ:
- Đã tổ chức thành công chuỗi 10 buổi học thiền nhập môn cho nhân viên văn phòng khu vực Mỹ Đình.
- Đã kết nối các học viên vào các điểm thiền định kỳ tiếp theo tại Hà Nội.`,
    checklistSummary: 'Đã hoàn thành khóa học và bàn giao mặt bằng'
  }
];

export const INITIAL_TASKS: SYTask[] = [
  // ==========================================
  // DỰ ÁN 1: SEAT Tour 2026 (seat-tour-2026)
  // ==========================================
  {
    id: 'SEAT-01',
    eventId: 'seat-tour-2026',
    title: 'Hồ sơ xin cấp phép biểu diễn nghệ thuật người nước ngoài (Sở VH&TT)',
    description: 'Chuẩn bị văn bản đề nghị, danh sách 12 nghệ sĩ nước ngoài (hộ chiếu, quốc tịch), danh mục bài hát/nhạc phẩm Ragas, kịch bản chương trình theo Nghị định 144.',
    assignee: 'Ngọc Anh',
    assigneePhone: '0912.888.999',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-09-30',
    dependsOn: [],
    deliverable: 'Biên nhận nộp hồ sơ hoặc Giấy chấp thuận của Sở VH&TT HN'
  },
  {
    id: 'SEAT-02',
    eventId: 'seat-tour-2026',
    title: 'Khảo sát & chốt hợp đồng địa điểm biểu diễn tại Hà Nội & Hưng Yên',
    description: 'Làm việc với Ban quản lý hội trường (Cung Hữu nghị / Nhà hát), chốt âm thanh, ánh sáng, máy chiếu, khu vực đón tiếp và đặt cọc.',
    assignee: 'Đức Huy',
    assigneePhone: '0977.111.222',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-10-05',
    dependsOn: [],
    deliverable: 'Hợp đồng thuê địa điểm đã ký'
  },
  {
    id: 'SEAT-03',
    eventId: 'seat-tour-2026',
    title: 'Thiết kế bộ nhận diện SEAT Tour 2026 (Poster, Banner, Thư mời)',
    description: 'Thiết kế poster điện tử, backdrop sân khấu, standee chỉ dẫn và mẫu thư mời đại biểu in ấn theo quy chuẩn thương hiệu.',
    assignee: 'Hồng Nhung',
    assigneePhone: '0988.333.444',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-10-08',
    dependsOn: ['SEAT-02'], // Cần có địa điểm cụ thể để đưa lên poster
    deliverable: 'File thiết kế in ấn & maket sân khấu'
  },
  {
    id: 'SEAT-04',
    eventId: 'seat-tour-2026',
    title: 'Chạy truyền thông trực tuyến & mở link đăng ký vé miễn phí',
    description: 'Đăng bài thông báo lên Fanpage, nhóm Zalo cộng đồng, gửi thư mời điện tử và mở form đăng ký giữ chỗ.',
    assignee: 'Thanh Hằng',
    assigneePhone: '0912.345.678',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-10-12',
    dependsOn: ['SEAT-01', 'SEAT-03'], // Phải có cấp phép & poster hoàn chỉnh mới được truyền thông rộng rãi
    deliverable: 'Form đăng ký Google Form & bài truyền thông công khai'
  },
  {
    id: 'SEAT-05',
    eventId: 'seat-tour-2026',
    title: 'Hậu cần: Đặt khách sạn, xe đưa đón 29 chỗ & ăn uống cho đoàn nghệ sĩ',
    description: 'Đặt phòng nghỉ gần địa điểm biểu diễn, thuê xe 29 chỗ đưa đón sân bay Nội Bài và các điểm diễn ở Hưng Yên, chuẩn bị thực đơn ăn thanh tịnh.',
    assignee: 'Khánh Linh',
    assigneePhone: '0936.777.888',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-10-15',
    dependsOn: ['SEAT-01'], // Phụ thuộc vào thủ tục visa & cấp phép biểu diễn
    deliverable: 'Bảng xác nhận đặt phòng & lịch trình xe chạy'
  },
  {
    id: 'SEAT-06',
    eventId: 'seat-tour-2026',
    title: 'Tập huấn đội Tình nguyện viên đón tiếp & Trải nghiệm Luân xa',
    description: 'Họp 20 tình nguyện viên: phân công vị trí check-in, hướng dẫn ghế ngồi khán giả, chuẩn bị khu vực trải nghiệm Kundalini và phát cẩm nang sau giờ diễn.',
    assignee: 'Bảo Linh',
    assigneePhone: '081.447.8038',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-10-25',
    dependsOn: ['SEAT-04'],
    deliverable: 'Bảng phân công nhiệm vụ TNV & danh sách trực ca'
  },

  // ==========================================
  // DỰ ÁN 2: Lớp Seeker 40 Vương Thừa Vũ (seeker-class-vtv-14h30)
  // ==========================================
  {
    id: 'VTV1-01',
    eventId: 'seeker-class-vtv-14h30',
    title: 'Trực phòng thiền & đón tiếp học viên mới Chủ Nhật',
    description: 'Mở cửa trước 15 phút, bật điều hòa, chuẩn bị nước ấm, đón học viên mới và hướng dẫn chỗ ngồi thoải mái.',
    assignee: 'Bảo Linh',
    assigneePhone: '081.447.8038',
    status: 'done',
    priority: 'high',
    dueDate: 'Hàng tuần',
    dependsOn: [],
    deliverable: 'Phòng thiền sẵn sàng trước 14h15'
  },
  {
    id: 'VTV1-02',
    eventId: 'seeker-class-vtv-14h30',
    title: 'In ấn bổ sung tờ gấp "Trải Nghiệm Khai Mở Năng Lượng"',
    description: 'In thêm 100 bản tờ gấp màu giới thiệu 3 kênh, 7 luân xa để phát cho người mới đến lần đầu.',
    assignee: 'Bảo Linh',
    assigneePhone: '081.447.8038',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2026-09-28',
    dependsOn: [],
    deliverable: '100 tờ gấp tại kệ tài liệu 40 VTV'
  },

  // ==========================================
  // DỰ ÁN 3: Lớp Nâng Cao 15h30 Vương Thừa Vũ (seeker-class-vtv-15h30)
  // ==========================================
  {
    id: 'VTV2-01',
    eventId: 'seeker-class-vtv-15h30',
    title: 'Chuẩn bị muối sạch & chậu ngâm chân Footsoaking',
    description: 'Kiểm tra số lượng chậu, mua bổ sung muối hạt sạch và khăn lau chân phục vụ lớp thực hành ngâm chân nước muối.',
    assignee: 'Bảo Linh',
    assigneePhone: '081.447.8038',
    status: 'done',
    priority: 'medium',
    dueDate: 'Hàng tuần',
    dependsOn: [],
    deliverable: '30 bộ chậu + muối sẵn sàng tại góc thực hành'
  },
  {
    id: 'VTV2-02',
    eventId: 'seeker-class-vtv-15h30',
    title: 'Chọn lọc video bài giảng Shri Mataji có phụ đề tiếng Việt',
    description: 'Chuẩn bị sẵn trích đoạn bài giảng 15-20 phút về luân xa Nabhi và kỹ thuật cân bằng năng lượng để phát máy chiếu.',
    assignee: 'Hùng bé',
    assigneePhone: '036.666.7975',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2026-09-27',
    dependsOn: [],
    deliverable: 'Link drive video phụ đề chất lượng cao'
  },

  // ==========================================
  // DỰ ÁN 4: Lớp Hoàng Quốc Việt (seeker-class-hqv-20h)
  // ==========================================
  {
    id: 'HQV-01',
    eventId: 'seeker-class-hqv-20h',
    title: 'Duy trì mở cửa & điều phối lớp học tối tại 72 ngõ 106 HQV',
    description: 'Đón tiếp thiền sinh và người mới khu vực Cầu Giấy, Tây Hồ, hướng dẫn thiền và kiểm tra rung động trên tay.',
    assignee: 'Lê Thi',
    assigneePhone: '093.232.8800',
    status: 'done',
    priority: 'high',
    dueDate: 'Hàng tuần',
    dependsOn: [],
    deliverable: 'Báo cáo số lượng người tham dự sau mỗi buổi'
  },
  {
    id: 'HQV-02',
    eventId: 'seeker-class-hqv-20h',
    title: 'Lập nhóm Zalo hỗ trợ thiền sinh lớp HQV tự thiền tại nhà',
    description: 'Gửi link nhạc thiền, bài đọc mỗi ngày vào nhóm Zalo để hỗ trợ người mới duy trì đều đặn sáng tối.',
    assignee: 'Lê Thi',
    assigneePhone: '093.232.8800',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-08-15',
    dependsOn: ['HQV-01'],
    deliverable: 'Nhóm Zalo lớp HQV hoạt động tích cực'
  },

  // ==========================================
  // DỰ ÁN 5: Lớp Thiền Online Zoom (seeker-class-online-21h)
  // ==========================================
  {
    id: 'ONL-01',
    eventId: 'seeker-class-online-21h',
    title: 'Mở phòng Zoom & chọn nhạc thiền tối 3, 5, 7',
    description: 'Host phòng Zoom lúc 20:55, phát nhạc tĩnh tâm nhẹ nhàng, hướng dẫn bandhan và giữ phòng thiền yên tĩnh.',
    assignee: 'Hùng bé',
    assigneePhone: '036.666.7975',
    status: 'done',
    priority: 'high',
    dueDate: 'Hàng tuần (3-5-7)',
    dependsOn: [],
    deliverable: 'Phòng Zoom hoạt động đều đặn đúng 21h00'
  },
  {
    id: 'ONL-02',
    eventId: 'seeker-class-online-21h',
    title: 'Ghi hình & chia sẻ trích đoạn ngắn lên kênh truyền thông nội bộ',
    description: 'Cắt các đoạn chia sẻ trải nghiệm hay của thiền sinh trong lớp online để truyền cảm hứng cho người mới.',
    assignee: 'Hùng bé',
    assigneePhone: '036.666.7975',
    status: 'in_progress',
    priority: 'low',
    dueDate: '2026-10-01',
    dependsOn: ['ONL-01'],
    deliverable: 'Các video clip ngắn 1-2 phút'
  },

  // ==========================================
  // DỰ ÁN 6: Dịch thuật tài liệu (dich-thuat)
  // ==========================================
  {
    id: 'DT-01',
    eventId: 'dich-thuat',
    title: 'Dịch & biên tập tờ gấp giới thiệu SEAT Tour 2026',
    description: 'Dịch phần giới thiệu nghệ sĩ quốc tế và lời giải thích ngắn gọn về Kundalini cho tờ rơi phát tay tại đêm nhạc.',
    assignee: 'Bảo Linh',
    assigneePhone: '081.447.8038',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-10-02',
    dependsOn: [],
    deliverable: 'Bản thảo dịch tiếng Việt đã duyệt ngữ pháp'
  },
  {
    id: 'DT-02',
    eventId: 'dich-thuat',
    title: 'Hiệu đính sách "Sahaja Yoga - Con Đường Tự Nhiên"',
    description: 'Rà soát lại thuật ngữ luân xa, đối chiếu với nguyên bản tiếng Anh để chuẩn bị tái bản phục vụ thiền sinh.',
    assignee: 'Bảo Linh',
    assigneePhone: '081.447.8038',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2026-11-15',
    dependsOn: [],
    deliverable: 'Bản thảo hoàn thiện 12 chương sách'
  },

  // ==========================================
  // DỰ ÁN 7: Havan & Puja (havan-puja)
  // ==========================================
  {
    id: 'PUJA-01',
    eventId: 'havan-puja',
    title: 'Khảo sát địa điểm ngoài trời thoáng đãng cho nghi thức Havan',
    description: 'Tìm địa điểm có bãi đất trống, an toàn phòng cháy chữa cháy để thực hiện nghi thức thiêu đốt thanh lọc lửa thiêng.',
    assignee: 'Đức Huy',
    assigneePhone: '0977.111.222',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-10-10',
    dependsOn: [],
    deliverable: 'Địa điểm được tập thể thống nhất'
  },
  {
    id: 'PUJA-02',
    eventId: 'havan-puja',
    title: 'Chuẩn bị củi gỗ thanh sạch, bơ Ghee & thảo mộc Samagri',
    description: 'Mua bơ sữa bò nguyên chất tự làm Ghee, gom củi khô sạch không khói và thảo dược Ấn Độ chuyên dụng.',
    assignee: 'Lê Thi',
    assigneePhone: '093.232.8800',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-10-12',
    dependsOn: ['PUJA-01'],
    deliverable: 'Đầy đủ vật phẩm Havan sẵn sàng'
  },

  // ==========================================
  // DỰ ÁN 8: Navaratri 2026 (navaratri-2026)
  // ==========================================
  {
    id: 'NAV-01',
    eventId: 'navaratri-2026',
    title: 'Lên lịch trình thiền 9 đêm Navaratri & danh sách bài giảng',
    description: 'Tổng hợp danh sách các khía cạnh Shakti tương ứng từng đêm, trích bài giảng của Shri Mataji và gửi thông báo cho tập thể.',
    assignee: 'Bảo Linh',
    assigneePhone: '081.447.8038',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-10-01',
    dependsOn: [],
    deliverable: 'Lịch trình chi tiết 9 đêm gửi vào nhóm chung'
  },

  // ==========================================
  // DỰ ÁN 9: National Puja TP.HCM (national-puja-vn-2026)
  // ==========================================
  {
    id: 'NAT-01',
    eventId: 'national-puja-vn-2026',
    title: 'Mở biểu mẫu đăng ký đoàn Hà Nội & miền Bắc tham dự Puja TP.HCM',
    description: 'Thống kê số lượng thiền sinh tham gia, hỗ trợ gom nhóm mua vé máy bay giá tốt và đăng ký phòng nghỉ tập trung với ban tổ chức TP.HCM.',
    assignee: 'Ngọc Anh',
    assigneePhone: '0912.888.999',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-10-20',
    dependsOn: [],
    deliverable: 'Bảng danh sách đoàn tham dự & thông tin chuyến bay'
  }
];

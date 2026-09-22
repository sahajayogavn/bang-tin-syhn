export interface SYEvent {
  id: string;
  title: string;
  subtitle?: string;
  category: string; // 'bieu-dien' | 'khoa-hoc' | 'thien-cong-dong' | 'workshop' | 'sinh-hoat'
  categoryLabel?: string;
  startDate: string; // e.g. "2026-10-15" or "15/10/2026"
  endDate?: string;
  time: string; // e.g. "19:30 - 21:30"
  locationName: string;
  address: string;
  district: string; // e.g. "Hoàn Kiếm", "Cầu Giấy", "Tây Hồ", "Đống Đa", "Hà Đông"
  mapUrl?: string;
  description: string;
  targetAudience?: string; // "Dành cho người mới bắt đầu", "Mọi lứa tuổi", "Thiền sinh Sahaja Yoga"
  fee?: string; // "Miễn phí 100%"
  registrationUrl?: string;
  contactPhone?: string;
  contactName?: string;
  bannerUrl?: string;
  highlightTag?: string; // "ĐẶC BIỆT", "SẮP DIỄN RA", "NỔI BẬT"
  status?: 'upcoming' | 'ongoing' | 'completed';
}

import Papa from 'papaparse';
import { SYEvent } from '../types/event';
import { INITIAL_EVENTS } from '../data/mockEvents';

/**
 * Utility to fetch and parse events from Google Sheets published as CSV
 * Or standard Google Sheets export URL.
 */
export async function fetchEventsFromGoogleSheet(sheetUrl?: string): Promise<{ events: SYEvent[]; source: 'sheet' | 'default'; error?: string }> {
  const targetUrl = sheetUrl || process.env.NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL;

  if (!targetUrl || targetUrl.trim() === '') {
    return { events: INITIAL_EVENTS, source: 'default' };
  }

  try {
    // Normalizing Google Sheet share links to export CSV format if needed
    let csvUrl = targetUrl.trim();
    if (csvUrl.includes('docs.google.com/spreadsheets/d/')) {
      const match = csvUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        const sheetId = match[1];
        // Check for gid
        const gidMatch = csvUrl.match(/[#&?]gid=([0-9]+)/);
        const gid = gidMatch ? gidMatch[1] : '0';
        csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
      }
    }

    const response = await fetch(csvUrl, {
      next: { revalidate: 60 } // Next.js ISR cache 60s
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: Không thể tải file Google Sheet`);
    }

    const csvText = await response.text();
    const parsed = Papa.parse<Record<string, string>>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors && parsed.errors.length > 0 && parsed.data.length === 0) {
      throw new Error(parsed.errors[0].message);
    }

    const rows = parsed.data;
    const mappedEvents: SYEvent[] = rows.map((row, index) => {
      // Look up key case-insensitively or with fallback
      const getVal = (...keys: string[]) => {
        for (const k of keys) {
          if (row[k] !== undefined && row[k].trim() !== '') return row[k].trim();
          // Lowercase match
          const foundKey = Object.keys(row).find(
            rk => rk.toLowerCase().trim() === k.toLowerCase().trim()
          );
          if (foundKey && row[foundKey] && row[foundKey].trim() !== '') {
            return row[foundKey].trim();
          }
        }
        return '';
      };

      const title = getVal('title', 'Tên chương trình', 'Tên sự kiện', 'Ten su kien');
      if (!title) return null;

      const category = getVal('category', 'Phân loại', 'Chủ đề', 'The loai') || 'khoa-hoc';

      return {
        id: getVal('id', 'Mã sự kiện') || `evt-${index + 1}`,
        title,
        subtitle: getVal('subtitle', 'Phụ đề', 'Mô tả ngắn'),
        category: category.toLowerCase(),
        categoryLabel: getVal('categoryLabel', 'Tên phân loại', 'Nhan the loai') || category,
        startDate: getVal('startDate', 'Ngày bắt đầu', 'Ngày diễn ra', 'Ngay bat dau', 'Thời gian'),
        endDate: getVal('endDate', 'Ngày kết thúc', 'Ngay ket thuc'),
        time: getVal('time', 'Giờ diễn ra', 'Khung giờ', 'Gio dien ra') || '19:30 - 21:00',
        locationName: getVal('locationName', 'Địa điểm', 'Tên địa điểm', 'Dia diem') || 'Hà Nội',
        address: getVal('address', 'Địa chỉ chi tiết', 'Dia chi') || 'Hà Nội',
        district: getVal('district', 'Quận/Huyện', 'Khu vực', 'Quan huyen') || 'Hà Nội',
        mapUrl: getVal('mapUrl', 'Link Google Maps', 'Link ban do'),
        description: getVal('description', 'Mô tả chi tiết', 'Nội dung', 'Mo ta chi tiet'),
        targetAudience: getVal('targetAudience', 'Đối tượng tham gia', 'Doi tuong') || 'Mọi người',
        fee: getVal('fee', 'Học phí / Vé', 'Chi phí', 'Hoc phi') || 'Miễn phí 100%',
        registrationUrl: getVal('registrationUrl', 'Link đăng ký', 'Link dang ky'),
        contactPhone: getVal('contactPhone', 'Số điện thoại', 'Hotline', 'Lien he'),
        contactName: getVal('contactName', 'Người phụ trách', 'Nguoi lien he'),
        bannerUrl: getVal('bannerUrl', 'Ảnh bìa', 'Link anh banner', 'Banner'),
        highlightTag: getVal('highlightTag', 'Thẻ nổi bật', 'Highlight', 'Tag'),
        status: (getVal('status', 'Trạng thái') as any) || 'upcoming'
      };
    }).filter(Boolean) as SYEvent[];

    if (mappedEvents.length === 0) {
      return { events: INITIAL_EVENTS, source: 'default' };
    }

    return { events: mappedEvents, source: 'sheet' };
  } catch (err: any) {
    console.error('Fetch Google Sheet Error:', err);
    return {
      events: INITIAL_EVENTS,
      source: 'default',
      error: err.message || 'Lỗi đọc dữ liệu Google Sheet'
    };
  }
}

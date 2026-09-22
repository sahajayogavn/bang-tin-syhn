import Papa from 'papaparse';
import { SYEvent, SYTask } from '../types/event';
import { INITIAL_EVENTS, INITIAL_TASKS } from '../data/mockEvents';

/**
 * Utility to fetch and parse events and tasks from Google Sheets published as CSV
 */
export async function fetchEventsFromGoogleSheet(sheetUrl?: string): Promise<{
  events: SYEvent[];
  tasks: SYTask[];
  source: 'sheet' | 'default';
  error?: string;
}> {
  const targetUrl = sheetUrl || process.env.NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL;

  if (!targetUrl || targetUrl.trim() === '') {
    return { events: INITIAL_EVENTS, tasks: INITIAL_TASKS, source: 'default' };
  }

  try {
    let csvUrl = targetUrl.trim();
    if (csvUrl.includes('docs.google.com/spreadsheets/d/')) {
      const match = csvUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        const sheetId = match[1];
        const gidMatch = csvUrl.match(/[#&?]gid=([0-9]+)/);
        const gid = gidMatch ? gidMatch[1] : '0';
        csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
      }
    }

    const response = await fetch(csvUrl, {
      next: { revalidate: 60 }
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
      const getVal = (...keys: string[]) => {
        for (const k of keys) {
          if (row[k] !== undefined && row[k].trim() !== '') return row[k].trim();
          const foundKey = Object.keys(row).find(
            rk => rk.toLowerCase().trim() === k.toLowerCase().trim()
          );
          if (foundKey && row[foundKey] && row[foundKey].trim() !== '') {
            return row[foundKey].trim();
          }
        }
        return '';
      };

      const title = getVal('title', 'Tên sự kiện', 'Tiêu đề');
      if (!title) return null;

      const rawTimeStatus = getVal('timeStatus', 'Thời gian', 'Tiến độ', 'Trạng thái').toLowerCase();
      let timeStatus: 'past' | 'ongoing' | 'upcoming' = 'upcoming';
      if (rawTimeStatus.includes('đã') || rawTimeStatus.includes('past') || rawTimeStatus.includes('xong')) {
        timeStatus = 'past';
      } else if (rawTimeStatus.includes('đang') || rawTimeStatus.includes('ongoing')) {
        timeStatus = 'ongoing';
      }

      return {
        id: getVal('id', 'Mã sự kiện') || `evt-${index + 1}`,
        title,
        timeStatus,
        timeStatusLabel: getVal('timeStatusLabel', 'Nhãn trạng thái') || (
          timeStatus === 'upcoming' ? 'Sắp diễn ra' : timeStatus === 'ongoing' ? 'Đang diễn ra' : 'Đã diễn ra'
        ),
        startDate: getVal('startDate', 'Ngày diễn ra', 'Ngày bắt đầu') || 'Chưa cập nhật',
        endDate: getVal('endDate', 'Ngày kết thúc'),
        time: getVal('time', 'Giờ diễn ra') || '19:30 - 21:00',
        locationName: getVal('locationName', 'Địa điểm') || 'Hà Nội',
        address: getVal('address', 'Địa chỉ') || 'Hà Nội',
        district: getVal('district', 'Quận/Huyện') || 'Hà Nội',
        coordinator: getVal('coordinator', 'Người phụ trách', 'Người điều phối') || 'Ban Tổ Chức',
        coordinatorPhone: getVal('coordinatorPhone', 'SĐT người phụ trách', 'Hotline') || '',
        importance: (getVal('importance', 'Mức độ quan trọng').toLowerCase() as any) || 'high',
        badge: getVal('badge', 'Thẻ nổi bật', 'Huy hiệu'),
        summary: getVal('summary', 'Tóm tắt sự kiện', 'Mô tả ngắn'),
        details: getVal('details', 'Nội dung chi tiết', 'Kế hoạch chi tiết'),
        checklistSummary: getVal('checklistSummary', 'Tình trạng công việc')
      };
    }).filter(Boolean) as SYEvent[];

    return {
      events: mappedEvents.length > 0 ? mappedEvents : INITIAL_EVENTS,
      tasks: INITIAL_TASKS,
      source: mappedEvents.length > 0 ? 'sheet' : 'default'
    };
  } catch (err: any) {
    console.error('Fetch Google Sheet Error:', err);
    return {
      events: INITIAL_EVENTS,
      tasks: INITIAL_TASKS,
      source: 'default',
      error: err.message || 'Lỗi đọc dữ liệu Google Sheet'
    };
  }
}

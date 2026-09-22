import Papa from 'papaparse';
import { SYEvent, SYTask } from '../types/event';
import { INITIAL_EVENTS, INITIAL_TASKS } from '../data/mockEvents';

/**
 * Utility to fetch and parse events and tasks from Google Sheets.
 * If user provides 1 Sheet with Events, or 2 GIDs (gid=0 for Events, gid=xxx for Tasks).
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
    let sheetBase = '';
    let sheetId = '';
    let currentGid = '0';

    if (csvUrl.includes('docs.google.com/spreadsheets/d/')) {
      const match = csvUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        sheetId = match[1];
        const gidMatch = csvUrl.match(/[#&?]gid=([0-9]+)/);
        currentGid = gidMatch ? gidMatch[1] : '0';
        sheetBase = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
        csvUrl = `${sheetBase}&gid=${currentGid}`;
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

    // Detect if this sheet is a Task sheet or an Event sheet
    const firstRowKeys = rows.length > 0 ? Object.keys(rows[0]).map(k => k.toLowerCase().trim()) : [];
    const isTaskSheet = firstRowKeys.includes('assignee') || firstRowKeys.includes('người phụ trách') || firstRowKeys.includes('eventid');

    let mappedEvents: SYEvent[] = [];
    let mappedTasks: SYTask[] = INITIAL_TASKS;

    const getVal = (row: Record<string, string>, ...keys: string[]) => {
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

    if (isTaskSheet) {
      // Parse tasks
      mappedTasks = rows.map((row, index) => {
        const title = getVal(row, 'title', 'Tên công việc', 'Tên task');
        if (!title) return null;
        const rawStatus = getVal(row, 'status', 'Trạng thái').toLowerCase();
        let status: SYTask['status'] = 'todo';
        if (rawStatus.includes('đang') || rawStatus.includes('in_progress')) status = 'in_progress';
        else if (rawStatus.includes('duyệt') || rawStatus.includes('review')) status = 'review';
        else if (rawStatus.includes('xong') || rawStatus.includes('done') || rawStatus.includes('hoàn thành')) status = 'done';

        const rawDepends = getVal(row, 'dependsOn', 'Phụ thuộc', 'Task tiền đề');
        const dependsOn = rawDepends ? rawDepends.split(/[,;\n]/).map(s => s.trim()).filter(Boolean) : [];

        return {
          id: getVal(row, 'id', 'Mã task') || `TASK-${index + 1}`,
          eventId: getVal(row, 'eventId', 'Mã dự án', 'Mã sự kiện') || 'seat-tour-2026',
          title,
          description: getVal(row, 'description', 'Mô tả chi tiết'),
          assignee: getVal(row, 'assignee', 'Người phụ trách') || 'Chưa phân công',
          assigneePhone: getVal(row, 'assigneePhone', 'SĐT người phụ trách', 'Hotline'),
          status,
          priority: (getVal(row, 'priority', 'Mức độ ưu tiên').toLowerCase() as any) || 'medium',
          dueDate: getVal(row, 'dueDate', 'Hạn hoàn thành', 'Deadline'),
          dependsOn,
          deliverable: getVal(row, 'deliverable', 'Sản phẩm bàn giao', 'Kết quả')
        };
      }).filter(Boolean) as SYTask[];
      mappedEvents = INITIAL_EVENTS;
    } else {
      // Parse events
      mappedEvents = rows.map((row, index) => {
        const title = getVal(row, 'title', 'Tên sự kiện', 'Tiêu đề');
        if (!title) return null;

        const rawTimeStatus = getVal(row, 'timeStatus', 'Thời gian', 'Tiến độ', 'Trạng thái').toLowerCase();
        let timeStatus: 'past' | 'ongoing' | 'upcoming' = 'upcoming';
        if (rawTimeStatus.includes('đã') || rawTimeStatus.includes('past') || rawTimeStatus.includes('xong') || rawTimeStatus.includes('kết thúc')) {
          timeStatus = 'past';
        } else if (rawTimeStatus.includes('đang') || rawTimeStatus.includes('ongoing')) {
          timeStatus = 'ongoing';
        }

        const rawImportance = getVal(row, 'importance', 'Mức độ quan trọng');
        let importance: SYEvent['importance'] = 'normal';
        if (rawImportance.includes('★★★★★') || rawImportance.toLowerCase().includes('critical') || rawImportance.includes('5')) {
          importance = 'critical';
        } else if (rawImportance.includes('★★★★') || rawImportance.toLowerCase().includes('high') || rawImportance.includes('4')) {
          importance = 'high';
        }

        const address = getVal(row, 'address', 'Địa chỉ');
        const startDate = getVal(row, 'startDate', 'Ngày bắt đầu');
        const endDate = getVal(row, 'endDate', 'Ngày kết thúc');

        return {
          id: getVal(row, 'id', 'Mã sự kiện') || `evt-${index + 1}`,
          title,
          timeStatus,
          timeStatusLabel: timeStatus === 'upcoming' ? 'Sắp diễn ra' : timeStatus === 'ongoing' ? 'Đang diễn ra' : 'Đã kết thúc',
          startDate: startDate === '-' ? 'Định kỳ' : startDate || 'Chưa ấn định',
          endDate: endDate === '-' ? '' : endDate,
          time: getVal(row, 'time', 'Giờ diễn ra') || 'Theo lịch trình',
          locationName: address || 'Hà Nội',
          address: address || 'Hà Nội',
          district: address || 'Hà Nội',
          coordinator: getVal(row, 'coordinator', 'Người phụ trách') || 'Collective',
          coordinatorPhone: getVal(row, 'coordinatorPhone', 'SĐT người phụ trách') || '',
          importance,
          badge: getVal(row, 'badge', 'Nhãn', 'Tag') || 'SỰ KIỆN',
          summary: getVal(row, 'summary', 'Tóm tắt sự kiện'),
          details: getVal(row, 'details', 'Nội dung chi tiết'),
          checklistSummary: getVal(row, 'checklistSummary', 'Tình trạng công việc')
        };
      }).filter(Boolean) as SYEvent[];
    }

    return {
      events: mappedEvents.length > 0 ? mappedEvents : INITIAL_EVENTS,
      tasks: mappedTasks.length > 0 ? mappedTasks : INITIAL_TASKS,
      source: 'sheet'
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

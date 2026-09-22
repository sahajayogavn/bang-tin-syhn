export type EventTimeStatus = 'past' | 'ongoing' | 'upcoming';

export interface SYTask {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  assignee: string; // Tên người phụ trách
  assigneePhone?: string; // SĐT liên hệ
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority?: 'high' | 'medium' | 'low';
  dueDate?: string;
  dependsOn?: string[]; // IDs của các task tiền đề (task này phụ thuộc vào task nào)
  deliverable?: string; // Kết quả bàn giao (link doc, file thiết kế, công văn...)
}

export interface SYEvent {
  id: string;
  title: string;
  timeStatus: EventTimeStatus; // 'past' | 'ongoing' | 'upcoming'
  timeStatusLabel?: string;
  startDate: string;
  endDate?: string;
  time: string;
  locationName: string;
  address: string;
  district: string;
  coordinator: string; // Người phụ trách chính sự kiện
  coordinatorPhone: string;
  importance: 'critical' | 'high' | 'normal'; // Mức độ quan trọng
  badge?: string; // "Ưu tiên số 1", "Trọng tâm tháng 10"
  summary: string;
  details: string; // Chi tiết khi expand ra
  checklistSummary?: string;
  tasks?: SYTask[];
}

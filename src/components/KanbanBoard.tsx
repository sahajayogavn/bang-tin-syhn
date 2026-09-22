'use client';

import React, { useState, useMemo } from 'react';
import { SYTask, SYEvent } from '@/types/event';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Link as LinkIcon,
  User,
  Phone,
  Calendar,
  Layers,
  FileCheck,
  ArrowRight,
  Filter
} from 'lucide-react';

interface KanbanBoardProps {
  tasks: SYTask[];
  events: SYEvent[];
  selectedEventId: string;
  onSelectEventId: (id: string) => void;
  onUpdateTaskStatus?: (taskId: string, newStatus: SYTask['status']) => void;
}

const COLUMNS: { id: SYTask['status']; title: string; color: string; badgeBg: string }[] = [
  { id: 'todo', title: 'CẦN LÀM (TO-DO)', color: 'border-zinc-300 dark:border-zinc-700', badgeBg: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300' },
  { id: 'in_progress', title: 'ĐANG TRIỂN KHAI', color: 'border-amber-400 dark:border-amber-600', badgeBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
  { id: 'review', title: 'CHỜ DUYỆT / NGHIỆM THU', color: 'border-sky-400 dark:border-sky-600', badgeBg: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' },
  { id: 'done', title: 'ĐÃ HOÀN THÀNH', color: 'border-emerald-500 dark:border-emerald-600', badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  events,
  selectedEventId,
  onSelectEventId,
  onUpdateTaskStatus
}) => {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // Filter tasks based on selectedEventId (or 'all')
  const filteredTasks = useMemo(() => {
    if (selectedEventId === 'all') return tasks;
    return tasks.filter(t => t.eventId === selectedEventId);
  }, [tasks, selectedEventId]);

  // Map of all tasks by ID for quick lookup of dependency title
  const taskMap = useMemo(() => {
    const map = new Map<string, SYTask>();
    tasks.forEach(t => map.set(t.id, t));
    return map;
  }, [tasks]);

  const activeEvent = events.find(e => e.id === selectedEventId);

  return (
    <div className="space-y-6">
      {/* Event Selector Filter for Kanban */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-600" />
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-50">
              Tiến Độ Công Việc & Điều Phối Nhân Sự
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Chọn sự kiện để theo dõi các đầu việc liên kết và liên hệ người phụ trách
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 shrink-0">Lọc theo sự kiện:</span>
          <select
            value={selectedEventId}
            onChange={(e) => onSelectEventId(e.target.value)}
            className="w-full md:w-auto px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="all">Tất cả sự kiện ({tasks.length} đầu việc)</option>
            {events.map(ev => (
              <option key={ev.id} value={ev.id}>
                {ev.title.length > 45 ? ev.title.substring(0, 45) + '...' : ev.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);

          return (
            <div
              key={col.id}
              className="bg-zinc-100/70 dark:bg-zinc-900/60 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-4">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${col.badgeBg}`}>
                  {col.title}
                </span>
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List in Column */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colTasks.length === 0 ? (
                  <div className="text-center py-12 text-zinc-400 text-xs border border-dashed border-zinc-200 dark:border-zinc-800/80 rounded-xl p-4">
                    Chưa có công việc trong cột này
                  </div>
                ) : (
                  colTasks.map(task => {
                    const isSelected = activeTaskId === task.id;
                    const eventOfTask = events.find(e => e.id === task.eventId);

                    // Check if dependencies are done
                    const hasUnfinishedDependencies = task.dependsOn && task.dependsOn.some(depId => {
                      const dep = taskMap.get(depId);
                      return dep && dep.status !== 'done';
                    });

                    return (
                      <div
                        key={task.id}
                        onClick={() => setActiveTaskId(isSelected ? null : task.id)}
                        className={`bg-white dark:bg-zinc-800 rounded-xl p-4 border shadow-sm transition-all duration-200 cursor-pointer space-y-3 ${
                          isSelected
                            ? 'ring-2 ring-teal-500 border-teal-500 shadow-md'
                            : 'border-zinc-200 dark:border-zinc-700/70 hover:border-teal-500/50 hover:shadow'
                        }`}
                      >
                        {/* Top: Task ID, Priority, Event Label */}
                        <div className="flex items-center justify-between gap-1 text-[11px]">
                          <span className="font-mono font-bold text-zinc-400">
                            #{task.id}
                          </span>
                          {task.priority === 'high' && (
                            <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 font-bold text-[10px]">
                              KHẨN CẤP
                            </span>
                          )}
                          {eventOfTask && selectedEventId === 'all' && (
                            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium truncate max-w-[130px]">
                              {eventOfTask.district}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
                          {task.title}
                        </h4>

                        {/* Description */}
                        {task.description && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                            {task.description}
                          </p>
                        )}

                        {/* Dependency Links: Hiển thị task này phụ thuộc vào task nào */}
                        {task.dependsOn && task.dependsOn.length > 0 && (
                          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-700/60 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                              <LinkIcon className="w-3 h-3 text-amber-500" />
                              <span>Phụ thuộc vào công việc:</span>
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {task.dependsOn.map(depId => {
                                const dep = taskMap.get(depId);
                                const isDepDone = dep?.status === 'done';
                                return (
                                  <span
                                    key={depId}
                                    title={dep ? `${dep.title} (${dep.status})` : depId}
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                                      isDepDone
                                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                                    }`}
                                  >
                                    {isDepDone ? (
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    ) : (
                                      <Clock className="w-3 h-3 text-amber-600 animate-spin" />
                                    )}
                                    <span>#{depId}</span>
                                  </span>
                                );
                              })}
                            </div>
                            {hasUnfinishedDependencies && task.status !== 'done' && (
                              <p className="text-[10px] text-amber-600 dark:text-amber-400 italic">
                                ⚠ Đang đợi hoàn thành task tiền đề
                              </p>
                            )}
                          </div>
                        )}

                        {/* Deliverable result */}
                        {task.deliverable && (
                          <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/60 p-2 rounded-lg border border-zinc-100 dark:border-zinc-700/50">
                            <FileCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span className="truncate text-[11px]"><strong>Sản phẩm:</strong> {task.deliverable}</span>
                          </div>
                        )}

                        {/* Bottom: Assignee contact & Due date */}
                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-700/60 flex items-center justify-between gap-2 text-xs">
                          {/* Assignee */}
                          <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-300 font-semibold">
                            <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 flex items-center justify-center text-[10px] font-bold">
                              {task.assignee.charAt(0)}
                            </div>
                            <span className="truncate">{task.assignee}</span>
                            {task.assigneePhone && (
                              <a
                                href={`tel:${task.assigneePhone.replace(/\s+/g, '')}`}
                                onClick={(e) => e.stopPropagation()}
                                title={`Gọi ngay ${task.assignee} (${task.assigneePhone})`}
                                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded text-zinc-500 hover:text-teal-600 transition-colors"
                              >
                                <Phone className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          {/* Due Date */}
                          {task.dueDate && (
                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {task.dueDate}
                            </span>
                          )}
                        </div>

                        {/* Quick Action buttons to move status */}
                        {isSelected && onUpdateTaskStatus && (
                          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-700 flex items-center justify-between gap-1 text-[11px]">
                            <span className="text-zinc-400">Chuyển cột:</span>
                            <div className="flex items-center gap-1">
                              {COLUMNS.filter(c => c.id !== task.status).map(c => (
                                <button
                                  key={c.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onUpdateTaskStatus(task.id, c.id);
                                  }}
                                  className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 hover:bg-teal-600 hover:text-white transition-colors"
                                >
                                  {c.id === 'todo' ? 'Cần làm' : c.id === 'in_progress' ? 'Đang làm' : c.id === 'review' ? 'Chờ duyệt' : 'Xong'}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

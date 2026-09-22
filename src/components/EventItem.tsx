'use client';

import React, { useState } from 'react';
import { SYEvent } from '@/types/event';
import {
  Calendar,
  MapPin,
  User,
  Phone,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
  CheckCircle2,
  Hourglass,
  Layers
} from 'lucide-react';

interface EventItemProps {
  event: SYEvent;
  onViewTasks?: (eventId: string) => void;
}

export const EventItem: React.FC<EventItemProps> = ({ event, onViewTasks }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusBadge = () => {
    switch (event.timeStatus) {
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            <Hourglass className="w-3.5 h-3.5" />
            <span>SẮP DIỄN RA</span>
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>ĐANG DIỄN RA</span>
          </span>
        );
      case 'past':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ĐÃ HOÀN THÀNH</span>
          </span>
        );
    }
  };

  const getImportanceBadge = () => {
    if (event.importance === 'critical') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wide bg-rose-600 text-white shadow-sm">
          ƯU TIÊN HÀNG ĐẦU
        </span>
      );
    }
    if (event.importance === 'high') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide bg-orange-500 text-white shadow-sm">
          QUAN TRỌNG
        </span>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header Summary Row */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 cursor-pointer select-none flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex-1 space-y-2">
          {/* Status & Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge()}
            {getImportanceBadge()}
            {event.badge && (
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                {event.badge}
              </span>
            )}
            <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 ml-auto md:ml-0">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <strong>{event.district}</strong>
            </span>
          </div>

          {/* Event Title */}
          <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
            {event.title}
          </h3>

          {/* Core Info bar: Date/Time + Location + Coordinator */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 pt-1">
            <span className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-semibold">
              <Calendar className="w-4 h-4 text-teal-600" />
              {event.startDate} {event.endDate ? `~ ${event.endDate}` : ''} ({event.time})
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span className="line-clamp-1">{event.locationName}</span>
            </span>

            <span className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-medium">
              <User className="w-4 h-4" />
              <span>Phụ trách: <strong>{event.coordinator}</strong></span>
              {event.coordinatorPhone && (
                <a
                  href={`tel:${event.coordinatorPhone.replace(/\s+/g, '')}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:underline flex items-center gap-0.5 text-zinc-500"
                >
                  <Phone className="w-3 h-3" />
                  ({event.coordinatorPhone})
                </a>
              )}
            </span>
          </div>

          {/* Quick Summary Preview */}
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 pt-1 leading-relaxed">
            {event.summary}
          </p>
        </div>

        {/* Expand Action Icon */}
        <div className="flex items-center justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800">
          {onViewTasks && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewTasks(event.id);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-800 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Xem Kanban công việc</span>
            </button>
          )}

          <button
            type="button"
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <span>{isExpanded ? 'Thu gọn' : 'Xem chi tiết'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Details Section */}
      {isExpanded && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/50 p-5 sm:p-6 space-y-5 animate-in fade-in duration-200">
          {/* Checklist progress preview */}
          {event.checklistSummary && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <strong>Tiến độ trọng yếu:</strong> {event.checklistSummary}
              </div>
            </div>
          )}

          {/* Full Detailed Plan Content */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Nội dung & Kế hoạch triển khai chi tiết
            </h4>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed font-sans">
              {event.details}
            </div>
          </div>

          {/* Footer of Expanded Card: Direct action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              <span>Địa chỉ cụ thể: </span>
              <strong className="text-zinc-700 dark:text-zinc-300">{event.address}</strong>
            </div>

            <div className="flex items-center gap-2">
              {event.coordinatorPhone && (
                <a
                  href={`tel:${event.coordinatorPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Gọi {event.coordinator}</span>
                </a>
              )}

              {onViewTasks && (
                <button
                  onClick={() => onViewTasks(event.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Mở bảng Kanban của sự kiện này</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

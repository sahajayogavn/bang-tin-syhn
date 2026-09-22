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
            <span>ĐÃ KẾT THÚC</span>
          </span>
        );
    }
  };

  const getImportanceStars = () => {
    if (event.importance === 'critical') {
      return (
        <span className="text-rose-600 dark:text-rose-400 font-black text-xs tracking-wider" title="Mức độ ưu tiên cao nhất">
          ★★★★★
        </span>
      );
    }
    if (event.importance === 'high') {
      return (
        <span className="text-orange-500 dark:text-orange-400 font-bold text-xs tracking-wider" title="Quan trọng">
          ★★★★☆
        </span>
      );
    }
    return (
      <span className="text-zinc-400 dark:text-zinc-500 text-xs tracking-wider">
        ★★☆☆☆
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header Summary Row */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 cursor-pointer select-none flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex-1 space-y-2">
          {/* Status & Badges & Stars */}
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge()}
            {getImportanceStars()}
            {event.badge && (
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                {event.badge}
              </span>
            )}
            <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
              #{event.id}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
            {event.title}
          </h3>

          {/* Core Info bar: Date + Address + Coordinator */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 pt-0.5">
            <span className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-semibold">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>{event.startDate}</span>
              {event.endDate && event.endDate !== '-' && (
                <span> ~ {event.endDate}</span>
              )}
            </span>

            {event.address && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-zinc-400" />
                <span className="line-clamp-1">{event.address}</span>
              </span>
            )}

            <span className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-medium">
              <User className="w-4 h-4" />
              <span>Phụ trách: <strong>{event.coordinator}</strong></span>
              {event.coordinatorPhone && (
                <a
                  href={`tel:${event.coordinatorPhone.replace(/[^\d+]/g, '')}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:underline flex items-center gap-0.5 text-teal-600 dark:text-teal-400 font-bold ml-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{event.coordinatorPhone}</span>
                </a>
              )}
            </span>
          </div>

          {/* Summary Preview */}
          {event.summary && (
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 pt-1 leading-relaxed">
              {event.summary}
            </p>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800">
          {onViewTasks && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewTasks(event.id);
              }}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-800 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Xem Tasks</span>
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
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/50 p-5 sm:p-6 space-y-4 animate-in fade-in duration-200">
          {/* Checklist progress preview */}
          {event.checklistSummary && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <strong>Tiến độ trọng yếu:</strong> {event.checklistSummary}
              </div>
            </div>
          )}

          {/* Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Kế hoạch & Nội dung chi tiết
            </h4>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed">
              {event.details || 'Chưa cập nhật nội dung chi tiết cho sự kiện này.'}
            </div>
          </div>

          {/* Footer of Expanded Card */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Địa chỉ: <strong className="text-zinc-700 dark:text-zinc-300">{event.address}</strong>
            </div>

            <div className="flex items-center gap-2">
              {event.coordinatorPhone && (
                <a
                  href={`tel:${event.coordinatorPhone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Gọi {event.coordinator} ({event.coordinatorPhone})</span>
                </a>
              )}

              {onViewTasks && (
                <button
                  onClick={() => onViewTasks(event.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Mở Kanban công việc của #{event.id}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

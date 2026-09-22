'use client';

import React from 'react';
import { SYEvent } from '@/types/event';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  Tag,
  ExternalLink,
  Share2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface EventDetailModalProps {
  event: SYEvent | null;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!event) return null;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}?event=${event.id}`;
      navigator.clipboard.writeText(`${event.title} - ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Banner */}
        <div className="relative h-56 sm:h-64 w-full bg-zinc-900 shrink-0">
          {event.bannerUrl ? (
            <img
              src={event.bannerUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-teal-800 via-emerald-800 to-amber-700 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-white/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Banner */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
            {event.highlightTag && (
              <span className="bg-rose-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                {event.highlightTag}
              </span>
            )}
            <span className="bg-teal-500/90 backdrop-blur-md text-white font-semibold text-xs px-3 py-1 rounded-md">
              {event.categoryLabel || event.category}
            </span>
            <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-md">
              {event.fee || 'Miễn phí'}
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
              {event.title}
            </h2>
            {event.subtitle && (
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 italic">
                {event.subtitle}
              </p>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">Thời gian</p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {event.startDate} {event.endDate ? `đến ${event.endDate}` : ''}
                </p>
                <p className="text-xs text-zinc-500">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">Địa điểm ({event.district})</p>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium">{event.locationName}</p>
                <p className="text-xs text-zinc-500">{event.address}</p>
              </div>
            </div>

            {event.targetAudience && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">Đối tượng tham gia</p>
                  <p className="text-zinc-600 dark:text-zinc-400">{event.targetAudience}</p>
                </div>
              </div>
            )}

            {event.contactPhone && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">Hotline / Liên hệ</p>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                    {event.contactPhone} {event.contactName ? `(${event.contactName})` : ''}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2">
              Giới thiệu chi tiết chương trình
            </h4>
            <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line space-y-2">
              {event.description}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/80 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Đã sao chép liên kết</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {event.mapUrl && (
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-colors"
              >
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Chỉ đường</span>
              </a>
            )}

            {event.registrationUrl ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-md shadow-teal-600/30 transition-all"
              >
                <span>Đăng ký tham gia ngay</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold transition-opacity hover:opacity-90"
              >
                Đóng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

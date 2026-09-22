'use client';

import React, { useState } from 'react';
import { SYEvent } from '@/types/event';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Phone,
  ExternalLink,
  ChevronRight,
  Share2,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface EventCardProps {
  event: SYEvent;
  onSelect?: (event: SYEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  const [copied, setCopied] = useState(false);

  const getCategoryBadge = (category: string, label?: string) => {
    const text = label || category;
    switch (category) {
      case 'bieu-dien':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            {text}
          </span>
        );
      case 'khoa-hoc':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Users className="w-3.5 h-3.5" />
            {text}
          </span>
        );
      case 'thien-cong-dong':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            {text}
          </span>
        );
      case 'workshop':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Tag className="w-3.5 h-3.5" />
            {text}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
            <Calendar className="w-3.5 h-3.5" />
            {text}
          </span>
        );
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}?event=${event.id}`;
      navigator.clipboard.writeText(`${event.title} - ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article
      onClick={() => onSelect && onSelect(event)}
      className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Banner Image or Gradient Header */}
      {event.bannerUrl ? (
        <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={event.bannerUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Highlight Badge */}
          {event.highlightTag && (
            <span className="absolute top-3 left-3 bg-rose-600 text-white font-bold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-md animate-pulse">
              {event.highlightTag}
            </span>
          )}

          {/* District Tag */}
          <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white font-medium text-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            {event.district || 'Hà Nội'}
          </span>

          {/* Fee tag */}
          <span className="absolute bottom-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white font-semibold text-xs px-2.5 py-1 rounded-lg">
            {event.fee || 'Miễn phí'}
          </span>
        </div>
      ) : (
        <div className="p-4 bg-gradient-to-r from-teal-600/10 via-emerald-600/10 to-amber-600/10 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {event.highlightTag && (
              <span className="bg-rose-600 text-white font-bold text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                {event.highlightTag}
              </span>
            )}
            <span className="text-xs font-semibold text-teal-700 dark:text-teal-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {event.district || 'Hà Nội'}
            </span>
          </div>
          <span className="text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-md">
            {event.fee || 'Miễn phí'}
          </span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Share */}
          <div className="flex items-center justify-between gap-2 mb-3">
            {getCategoryBadge(event.category, event.categoryLabel)}
            <button
              onClick={handleShare}
              title="Chia sẻ sự kiện"
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          {/* Subtitle */}
          {event.subtitle && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 italic">
              {event.subtitle}
            </p>
          )}

          {/* Key Event Details Meta Box */}
          <div className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
            {/* Date & Time */}
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
              <div className="flex-1 text-xs sm:text-sm">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {event.startDate}
                </span>
                {event.endDate && event.endDate !== event.startDate && (
                  <span> ~ {event.endDate}</span>
                )}
                {event.time && (
                  <span className="text-zinc-500 dark:text-zinc-400 block text-xs">
                    {event.time}
                  </span>
                )}
              </div>
            </div>

            {/* Location & Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
              <div className="flex-1 text-xs sm:text-sm">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1">
                  {event.locationName}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs line-clamp-1">
                  {event.address}
                </p>
              </div>
            </div>

            {/* Target Audience */}
            {event.targetAudience && (
              <div className="flex items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                <Users className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span className="line-clamp-1">{event.targetAudience}</span>
              </div>
            )}
          </div>

          {/* Description snippet */}
          <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
          {event.contactPhone ? (
            <a
              href={`tel:${event.contactPhone.replace(/\s+/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-teal-600 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{event.contactPhone}</span>
            </a>
          ) : (
            <span className="text-xs text-zinc-400">Sahaja Yoga HN</span>
          )}

          <div className="flex items-center gap-2">
            {event.mapUrl && (
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Xem bản đồ chỉ đường"
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {event.registrationUrl ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs shadow-sm shadow-teal-600/20 transition-all hover:translate-x-0.5"
              >
                <span>Đăng ký</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium text-xs hover:opacity-90 transition-all"
              >
                <span>Chi tiết</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

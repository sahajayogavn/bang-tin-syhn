'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SYEvent, SYTask, EventTimeStatus } from '@/types/event';
import { INITIAL_EVENTS, INITIAL_TASKS } from '@/data/mockEvents';
import { EventItem } from '@/components/EventItem';
import { KanbanBoard } from '@/components/KanbanBoard';
import { SheetConfigModal } from '@/components/SheetConfigModal';
import {
  Bell,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle,
  Hourglass,
  Clock,
  User,
  ExternalLink,
  PlusCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function InternalBulletinPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'kanban'>('events');
  const [timeFilter, setTimeFilter] = useState<'all' | EventTimeStatus>('all');
  const [selectedKanbanEventId, setSelectedKanbanEventId] = useState<string>('all');

  const [events, setEvents] = useState<SYEvent[]>(INITIAL_EVENTS);
  const [tasks, setTasks] = useState<SYTask[]>(INITIAL_TASKS);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'default' | 'sheet'>('default');
  const [sheetUrl, setSheetUrl] = useState('');

  // Load saved Google Sheet URL
  useEffect(() => {
    const savedUrl = localStorage.getItem('sy_hn_sheet_url');
    if (savedUrl) {
      setSheetUrl(savedUrl);
      fetchData(savedUrl);
    }
  }, []);

  const fetchData = async (targetUrl?: string) => {
    setLoading(true);
    try {
      const urlParam = targetUrl !== undefined ? targetUrl : sheetUrl;
      const res = await fetch(`/api/events${urlParam ? `?sheetUrl=${encodeURIComponent(urlParam)}` : ''}`);
      const data = await res.json();
      if (data.events && Array.isArray(data.events)) {
        setEvents(data.events);
        if (data.tasks) setTasks(data.tasks);
        setDataSource(data.source);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSheetUrl = (newUrl: string) => {
    setSheetUrl(newUrl);
    if (newUrl) {
      localStorage.setItem('sy_hn_sheet_url', newUrl);
    } else {
      localStorage.removeItem('sy_hn_sheet_url');
    }
    fetchData(newUrl);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: SYTask['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleSwitchToKanban = (eventId: string) => {
    setSelectedKanbanEventId(eventId);
    setActiveTab('kanban');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Events based on Time Status (past / ongoing / upcoming)
  const filteredEvents = useMemo(() => {
    if (timeFilter === 'all') return events;
    return events.filter(e => e.timeStatus === timeFilter);
  }, [events, timeFilter]);

  // Statistics
  const stats = useMemo(() => {
    const upcomingCount = events.filter(e => e.timeStatus === 'upcoming').length;
    const ongoingCount = events.filter(e => e.timeStatus === 'ongoing').length;
    const pastCount = events.filter(e => e.timeStatus === 'past').length;
    const totalTasks = tasks.length;
    const doneTasks = tasks.filter(t => t.status === 'done').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
    return { upcomingCount, ongoingCount, pastCount, totalTasks, doneTasks, inProgressTasks };
  }, [events, tasks]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Top Internal Banner Bar */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 text-white text-xs py-2 px-4 shadow-sm border-b border-teal-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-[11px] bg-white/20 px-2 py-0.5 rounded">
              Truyền Thông Nội Bộ
            </span>
            <span>Bảng Điều Phối Hoạt Động & Sự Kiện Sahaja Yoga Hà Nội</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline opacity-80 text-[11px]">
              Dữ liệu: {dataSource === 'sheet' ? 'Kết nối Google Sheet' : 'Nội bộ mặc định'}
            </span>
            <button
              onClick={() => setIsConfigOpen(true)}
              className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
              <span>{dataSource === 'sheet' ? 'Quản lý Google Sheet' : 'Gắn link Google Sheet'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 pt-8 pb-6 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sahaja Yoga Hà Nội • Cổng Thông Tin Ban Điều Phối</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                BẢNG TIN SỰ KIỆN & TIẾN ĐỘ TRIỂN KHAI
              </h1>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
                Nơi theo dõi các sự kiện trọng yếu đã / đang / sắp diễn ra, phối hợp liên kết các đầu việc (Kanban) và danh bạ người phụ trách từng hạng mục.
              </p>
            </div>

            {/* Quick KPIs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="bg-zinc-100 dark:bg-zinc-800/90 px-4 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-center min-w-[90px]">
                <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400">Sắp diễn ra</p>
                <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">{stats.upcomingCount}</p>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-800/90 px-4 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-center min-w-[90px]">
                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Đang diễn ra</p>
                <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">{stats.ongoingCount}</p>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-800/90 px-4 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-center min-w-[90px]">
                <p className="text-[11px] font-medium text-teal-600 dark:text-teal-400">Task hoàn thành</p>
                <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
                  {stats.doneTasks}/{stats.totalTasks}
                </p>
              </div>

              <button
                onClick={() => fetchData()}
                disabled={loading}
                title="Tải lại dữ liệu"
                className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-teal-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs: [SỰ KIỆN NỘI BỘ] vs [KANBAN CÔNG VIỆC] */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('events')}
                className={`flex items-center gap-2 pb-3 px-2 border-b-2 text-sm font-bold transition-all ${
                  activeTab === 'events'
                    ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Bảng Tin Sự Kiện ({events.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('kanban')}
                className={`flex items-center gap-2 pb-3 px-2 border-b-2 text-sm font-bold transition-all ${
                  activeTab === 'kanban'
                    ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Kanban Công Việc & Liên Kết Task ({tasks.length})</span>
              </button>
            </div>

            {/* Time Filter Pills if on 'events' tab */}
            {activeTab === 'events' && (
              <div className="hidden sm:flex items-center gap-1.5 pb-2">
                <span className="text-xs text-zinc-400 font-medium mr-1">Tiến độ:</span>
                <button
                  onClick={() => setTimeFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    timeFilter === 'all'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  Tất cả ({events.length})
                </button>
                <button
                  onClick={() => setTimeFilter('upcoming')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    timeFilter === 'upcoming'
                      ? 'bg-amber-500 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  Sắp diễn ra ({stats.upcomingCount})
                </button>
                <button
                  onClick={() => setTimeFilter('ongoing')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    timeFilter === 'ongoing'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  Đang diễn ra ({stats.ongoingCount})
                </button>
                <button
                  onClick={() => setTimeFilter('past')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    timeFilter === 'past'
                      ? 'bg-zinc-600 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  Đã qua ({stats.pastCount})
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {activeTab === 'events' ? (
          <div className="space-y-6">
            {/* Mobile Time Filter Pills */}
            <div className="sm:hidden flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                  timeFilter === 'all' ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-700'
                }`}
              >
                Tất cả ({events.length})
              </button>
              <button
                onClick={() => setTimeFilter('upcoming')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                  timeFilter === 'upcoming' ? 'bg-amber-500 text-white' : 'bg-zinc-200 text-zinc-700'
                }`}
              >
                Sắp diễn ra ({stats.upcomingCount})
              </button>
              <button
                onClick={() => setTimeFilter('ongoing')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                  timeFilter === 'ongoing' ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-700'
                }`}
              >
                Đang diễn ra ({stats.ongoingCount})
              </button>
              <button
                onClick={() => setTimeFilter('past')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                  timeFilter === 'past' ? 'bg-zinc-600 text-white' : 'bg-zinc-200 text-zinc-700'
                }`}
              >
                Đã qua ({stats.pastCount})
              </button>
            </div>

            {/* Event List */}
            <div className="space-y-4">
              {filteredEvents.map(event => (
                <EventItem
                  key={event.id}
                  event={event}
                  onViewTasks={handleSwitchToKanban}
                />
              ))}
            </div>
          </div>
        ) : (
          <KanbanBoard
            tasks={tasks}
            events={events}
            selectedEventId={selectedKanbanEventId}
            onSelectEventId={setSelectedKanbanEventId}
            onUpdateTaskStatus={handleUpdateTaskStatus}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Sahaja Yoga Việt Nam • Hệ Thống Điều Phối & Bảng Tin Nội Bộ Hà Nội</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsConfigOpen(true)}
              className="hover:text-teal-600 underline font-medium"
            >
              Cấu hình Google Sheet
            </button>
            <span>•</span>
            <a
              href="https://github.com/sahajayogavn/bang-tin-syhn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>

      {/* Google Sheet Config Modal */}
      <SheetConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        currentSheetUrl={sheetUrl}
        onSaveSheetUrl={handleSaveSheetUrl}
      />
    </div>
  );
}

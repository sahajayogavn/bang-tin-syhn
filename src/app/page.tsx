'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SYEvent, SYTask, EventTimeStatus } from '@/types/event';
import { INITIAL_EVENTS, INITIAL_TASKS } from '@/data/mockEvents';
import { EventItem } from '@/components/EventItem';
import { KanbanBoard } from '@/components/KanbanBoard';
import { SheetConfigModal } from '@/components/SheetConfigModal';
import {
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  FileSpreadsheet,
  Minimize2,
  Maximize2,
  ListFilter
} from 'lucide-react';

export default function InternalBulletinPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'kanban'>('events');
  const [timeFilter, setTimeFilter] = useState<'all' | EventTimeStatus>('all');
  const [selectedKanbanEventId, setSelectedKanbanEventId] = useState<string>('all');
  const [isCompactMode, setIsCompactMode] = useState<boolean>(true); // Mặc định RÚT GỌN cho điện thoại

  const [events, setEvents] = useState<SYEvent[]>(INITIAL_EVENTS);
  const [tasks, setTasks] = useState<SYTask[]>(INITIAL_TASKS);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'default' | 'sheet'>('default');
  const [sheetUrl, setSheetUrl] = useState('');

  // Load saved Google Sheet URL & Compact mode
  useEffect(() => {
    const savedUrl = localStorage.getItem('sy_hn_sheet_url');
    if (savedUrl) {
      setSheetUrl(savedUrl);
      fetchData(savedUrl);
    }
    const savedCompact = localStorage.getItem('sy_hn_compact');
    if (savedCompact !== null) {
      setIsCompactMode(savedCompact === 'true');
    }
  }, []);

  const toggleCompactMode = () => {
    setIsCompactMode(prev => {
      const next = !prev;
      localStorage.setItem('sy_hn_compact', String(next));
      return next;
    });
  };

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
    return { upcomingCount, ongoingCount, pastCount, totalTasks, doneTasks };
  }, [events, tasks]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 text-white text-xs py-1.5 px-3 sm:px-4 shadow-sm border-b border-teal-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium truncate">
            <span className="flex h-2 w-2 rounded-full bg-emerald-300 animate-pulse shrink-0" />
            <span className="font-bold text-[10px] sm:text-xs tracking-wider uppercase bg-white/20 px-1.5 py-0.5 rounded">
              NỘI BỘ
            </span>
            <span className="truncate text-[11px] sm:text-xs">Bảng Tin & Điều Phối Sahaja Yoga Hà Nội</span>
          </div>

          <button
            onClick={() => setIsConfigOpen(true)}
            className="shrink-0 inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-3 h-3 text-emerald-300" />
            <span>{dataSource === 'sheet' ? 'Google Sheet' : 'Gắn Sheet'}</span>
          </button>
        </div>
      </div>

      {/* Compact Main Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 pt-3 pb-2 px-3 sm:px-6 shadow-xs sticky top-0 z-30 backdrop-blur-md bg-white/95 dark:bg-zinc-900/95">
        <div className="max-w-7xl mx-auto space-y-2.5">
          {/* Title Row + Action Controls */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                <span>BẢNG TIN HÀ NỘI</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                  {events.length}
                </span>
              </h1>
            </div>

            {/* Quick Actions: NÚT RÚT GỌN + Tải lại */}
            <div className="flex items-center gap-1.5">
              {activeTab === 'events' && (
                <button
                  onClick={toggleCompactMode}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-xs ${
                    isCompactMode
                      ? 'bg-teal-600 text-white hover:bg-teal-700'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200'
                  }`}
                  title={isCompactMode ? 'Chuyển sang dạng thẻ đầy đủ' : 'Chuyển sang dạng danh sách rút gọn 1 màn hình'}
                >
                  {isCompactMode ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>RÚT GỌN: BẬT</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>RÚT GỌN: TẮT</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={() => fetchData()}
                disabled={loading}
                title="Tải lại dữ liệu"
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-teal-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs: [SỰ KIỆN] vs [KANBAN] */}
          <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-1.5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('events')}
                className={`flex items-center gap-1.5 pb-1 border-b-2 text-xs font-bold transition-all ${
                  activeTab === 'events'
                    ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Sự Kiện ({events.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('kanban')}
                className={`flex items-center gap-1.5 pb-1 border-b-2 text-xs font-bold transition-all ${
                  activeTab === 'kanban'
                    ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Kanban Tasks ({tasks.length})</span>
              </button>
            </div>

            {/* Time Filter Chips */}
            {activeTab === 'events' && (
              <div className="flex items-center gap-1 text-[11px] overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setTimeFilter('all')}
                  className={`px-2 py-0.5 rounded-md font-semibold ${
                    timeFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setTimeFilter('upcoming')}
                  className={`px-2 py-0.5 rounded-md font-semibold ${
                    timeFilter === 'upcoming' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Sắp tới ({stats.upcomingCount})
                </button>
                <button
                  onClick={() => setTimeFilter('ongoing')}
                  className={`px-2 py-0.5 rounded-md font-semibold ${
                    timeFilter === 'ongoing' ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Đang chạy ({stats.ongoingCount})
                </button>
                <button
                  onClick={() => setTimeFilter('past')}
                  className={`px-2 py-0.5 rounded-md font-semibold ${
                    timeFilter === 'past' ? 'bg-zinc-600 text-white' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Đã xong ({stats.pastCount})
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-4">
        {activeTab === 'events' ? (
          <div className={isCompactMode ? "space-y-1.5" : "space-y-4"}>
            {filteredEvents.map(event => (
              <EventItem
                key={event.id}
                event={event}
                isCompact={isCompactMode}
                onViewTasks={handleSwitchToKanban}
              />
            ))}
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
      <footer className="mt-auto bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-4 px-3 text-center text-xs text-zinc-400">
        Sahaja Yoga Việt Nam • Hệ Thống Điều Phối & Bảng Tin Hà Nội
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

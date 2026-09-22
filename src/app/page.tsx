'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SYEvent } from '@/types/event';
import { INITIAL_EVENTS } from '@/data/mockEvents';
import { EventCard } from '@/components/EventCard';
import { EventDetailModal } from '@/components/EventDetailModal';
import { SheetConfigModal } from '@/components/SheetConfigModal';
import {
  Calendar,
  MapPin,
  Search,
  Sparkles,
  Filter,
  Layers,
  Settings,
  RefreshCw,
  HeartHandshake,
  Info,
  CalendarCheck,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Tất cả chương trình' },
  { id: 'bieu-dien', label: 'Biểu Diễn & Nghệ Thuật' },
  { id: 'khoa-hoc', label: 'Khóa Học Thiền' },
  { id: 'thien-cong-dong', label: 'Thiền Ngoài Trời' },
  { id: 'workshop', label: 'Workshop Chuyên Đề' },
  { id: 'sinh-hoat', label: 'Sinh Hoạt Hàng Tuần' },
];

export default function HomePage() {
  const [events, setEvents] = useState<SYEvent[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<SYEvent | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'default' | 'sheet'>('default');
  const [sheetUrl, setSheetUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load saved Google Sheet URL from LocalStorage if available
  useEffect(() => {
    const savedUrl = localStorage.getItem('sy_hn_sheet_url');
    if (savedUrl) {
      setSheetUrl(savedUrl);
      fetchEvents(savedUrl);
    }
  }, []);

  const fetchEvents = async (targetUrl?: string) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const urlParam = targetUrl !== undefined ? targetUrl : sheetUrl;
      const res = await fetch(`/api/events${urlParam ? `?sheetUrl=${encodeURIComponent(urlParam)}` : ''}`);
      const data = await res.json();
      if (data.events && Array.isArray(data.events)) {
        setEvents(data.events);
        setDataSource(data.source);
        if (data.error) {
          setErrorMessage(data.error);
        }
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setErrorMessage('Không thể nạp dữ liệu. Đang hiển thị sự kiện mẫu.');
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
    fetchEvents(newUrl);
  };

  // Districts unique list
  const districts = useMemo(() => {
    const list = events.map(e => e.district).filter(Boolean);
    return ['all', ...Array.from(new Set(list))];
  }, [events]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      // Category filter
      if (selectedCategory !== 'all') {
        const cat = (e.category || '').toLowerCase();
        if (!cat.includes(selectedCategory.toLowerCase()) && selectedCategory !== cat) {
          return false;
        }
      }

      // District filter
      if (selectedDistrict !== 'all') {
        if (e.district !== selectedDistrict) return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = (e.title || '').toLowerCase().includes(q);
        const matchDesc = (e.description || '').toLowerCase().includes(q);
        const matchLoc = (e.locationName || '').toLowerCase().includes(q);
        const matchAddr = (e.address || '').toLowerCase().includes(q);
        const matchDist = (e.district || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc && !matchAddr && !matchDist) {
          return false;
        }
      }

      return true;
    });
  }, [events, selectedCategory, selectedDistrict, searchQuery]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Top Notification / Ticker */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white text-xs py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
            <span>Tin mới: Chuỗi sự kiện thiền định & âm nhạc nghệ thuật SEAT Tour 2026 tại Hà Nội</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline opacity-80">Hoàn toàn miễn phí vì lợi ích cộng đồng</span>
            <button
              onClick={() => setIsConfigOpen(true)}
              className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors"
            >
              <FileSpreadsheet className="w-3 h-3" />
              <span>{dataSource === 'sheet' ? 'Đang kết nối Sheet' : 'Cấu hình Google Sheet'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Hero */}
      <header className="relative bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 pt-8 pb-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sahaja Yoga Meditation • Hanoi City</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                BẢNG TIN SỰ KIỆN <span className="text-teal-600 dark:text-teal-400">HÀ NỘI</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Cập nhật các chương trình biểu diễn âm nhạc cổ điển, lớp học thiền nhập môn, buổi thiền cộng đồng ngoài trời và sinh hoạt tập thể tại khắp các quận/huyện Hà Nội.
              </p>
            </div>

            {/* Quick Stats or Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-zinc-100 dark:bg-zinc-800/80 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/60">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Tổng số sự kiện</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{events.length}</p>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-800/80 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700/60">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Khu vực (Quận)</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{districts.length - 1}</p>
              </div>

              <button
                onClick={() => fetchEvents()}
                disabled={loading}
                title="Làm mới dữ liệu từ nguồn"
                className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-teal-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700/70 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Search text box */}
              <div className="relative md:col-span-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm theo tên sự kiện, nội dung, địa điểm..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              {/* District Filter */}
              <div className="relative md:col-span-3">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer"
                >
                  <option value="all">Tất cả quận / huyện ({districts.length - 1})</option>
                  {districts.filter(d => d !== 'all').map(d => (
                    <option key={d} value={d}>Quận {d}</option>
                  ))}
                </select>
              </div>

              {/* Reset filter button */}
              <div className="md:col-span-3 flex items-center justify-end">
                {(searchQuery || selectedCategory !== 'all' || selectedDistrict !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedDistrict('all');
                    }}
                    className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline px-2 py-1"
                  >
                    Xóa các bộ lọc
                  </button>
                )}
                <span className="text-xs text-zinc-500 font-medium ml-auto">
                  Hiển thị: <strong className="text-teal-600 dark:text-teal-400">{filteredEvents.length}</strong> sự kiện
                </span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1 shrink-0 mr-1">
                <Filter className="w-3.5 h-3.5" />
                Chủ đề:
              </span>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Events Grid Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Banner Alert if Sheet Error */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setIsConfigOpen(true)}
              className="text-xs font-bold underline ml-4 hover:opacity-80"
            >
              Kiểm tra cấu hình Sheet
            </button>
          </div>
        )}

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 p-8">
            <Layers className="w-12 h-12 text-zinc-400 mx-auto mb-4 stroke-1" />
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
              Không tìm thấy sự kiện phù hợp
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn lại bộ lọc Phân loại và Khu vực quận/huyện.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDistrict('all');
              }}
              className="mt-5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-all"
            >
              Xem lại tất cả sự kiện
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={(evt) => setSelectedEvent(evt)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <div>
            <p className="font-bold text-zinc-800 dark:text-zinc-200">
              Bảng Tin Sahaja Yoga Hà Nội
            </p>
            <p className="text-xs mt-1">
              Hệ thống thông tin chính thức về các hoạt động thiền định & âm nhạc Sahaja Yoga tại thủ đô Hà Nội.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <a
              href="https://sahajayogavietnam.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600 transition-colors"
            >
              Trang chủ Sahaja Yoga VN
            </a>
            <span>•</span>
            <a
              href="https://facebook.com/sahajayogavietnam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600 transition-colors"
            >
              Fanpage Facebook
            </a>
            <span>•</span>
            <button
              onClick={() => setIsConfigOpen(true)}
              className="hover:text-teal-600 transition-colors flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Nguồn Google Sheet</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Event Details Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

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

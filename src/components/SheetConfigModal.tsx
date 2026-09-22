'use client';

import React, { useState } from 'react';
import { X, Table, ExternalLink, RefreshCw, CheckCircle2, HelpCircle } from 'lucide-react';

interface SheetConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSheetUrl: string;
  onSaveSheetUrl: (url: string) => void;
}

export const SheetConfigModal: React.FC<SheetConfigModalProps> = ({
  isOpen,
  onClose,
  currentSheetUrl,
  onSaveSheetUrl
}) => {
  const [url, setUrl] = useState(currentSheetUrl);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSheetUrl(url.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setUrl('');
    onSaveSheetUrl('');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Cấu hình Google Sheet Nguồn Sự Kiện
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Đường link Google Sheet hoặc Link CSV Publish
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/.../edit hoặc link CSV"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-xs"
            />
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              * Dán trực tiếp link file Google Sheet (cần bật quyền <span className="font-semibold text-teal-600 dark:text-teal-400">&quot;Bất kỳ ai có đường liên kết đều có thể xem&quot;</span>). Hệ thống tự động chuyển sang chế độ export CSV.
            </p>
          </div>

          {/* Guide columns */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
            <p className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-teal-600" />
              Các cột tiêu đề đề xuất trên Google Sheet (Dòng 1):
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700 font-bold text-teal-600">title (Tên sự kiện)*</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700">category (Phân loại)</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700">startDate (Ngày bắt đầu)</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700">time (Khung giờ)</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700">locationName (Địa điểm)</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700 font-bold text-teal-600">district (Quận/Huyện)*</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700">address (Địa chỉ cụ thể)</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700">fee (Học phí / Vé)</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700">contactPhone (Hotline)</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700">bannerUrl (Link ảnh)</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700">registrationUrl (Đăng ký)</span>
              <span className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-zinc-200 dark:border-zinc-700">description (Nội dung)</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 italic pt-1">
              Hệ thống chấp nhận cả tiếng Anh (title, category...) hoặc tiếng Việt (Tên sự kiện, Phân loại...).
            </p>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-zinc-500 hover:text-rose-600 underline font-medium"
            >
              Đặt lại về dữ liệu mẫu mặc định
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-md shadow-teal-600/20"
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đã lưu!</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Lưu & Tải lại</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

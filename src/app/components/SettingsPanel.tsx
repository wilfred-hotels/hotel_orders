"use client";

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useSettings } from './SettingsContext';

export default function SettingsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { settings, setSettings } = useSettings();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-full lg:w-96 ml-auto bg-white shadow-lg p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Settings</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100"><X /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Text color</label>
            <input type="color" value={settings.textColor} onChange={(e) => setSettings({ textColor: e.target.value })} className="mt-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Base font size</label>
            <input type="range" min={12} max={20} value={settings.fontSize} onChange={(e) => setSettings({ fontSize: Number(e.target.value) })} />
            <div className="text-sm text-muted">{settings.fontSize}px</div>
          </div>

          <div>
            <label className="block text-sm font-medium">Layout mode</label>
            <select value={settings.mode} onChange={(e) => setSettings({ mode: e.target.value as any })} className="mt-2 px-3 py-2 border rounded-md">
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

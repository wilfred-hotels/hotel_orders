"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Mode = 'comfortable' | 'compact';

type Settings = {
  textColor: string;
  fontSize: number; // px
  mode: Mode;
};

const DEFAULT: Settings = {
  textColor: '#0f172a',
  fontSize: 16,
  mode: 'comfortable',
};

const SettingsContext = createContext<{ settings: Settings; setSettings: (s: Partial<Settings>) => void }>({
  settings: DEFAULT,
  setSettings: () => {},
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettingsState] = useState<Settings>(DEFAULT);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('uiSettings');
      if (raw) setSettingsState((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('uiSettings', JSON.stringify(settings));
      // apply to CSS variables
      document.documentElement.style.setProperty('--fg', settings.textColor);
      document.documentElement.style.setProperty('--base-font-size', `${settings.fontSize}px`);
      if (settings.mode === 'compact') {
        document.documentElement.classList.add('compact-mode');
      } else {
        document.documentElement.classList.remove('compact-mode');
      }
    } catch (e) {
      // ignore
    }
  }, [settings]);

  const setSettings = (partial: Partial<Settings>) => {
    setSettingsState((prev) => ({ ...prev, ...partial }));
  };

  return <SettingsContext.Provider value={{ settings, setSettings }}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);

export default SettingsContext;

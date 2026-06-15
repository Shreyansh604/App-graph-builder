import { useEffect, useRef, useState } from 'react';
import { ChevronUp, MoreHorizontal, Search, Plus, ChevronRight, Share2, Moon, Sun, User } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useApps } from '../../hooks/useData';
import type { AppInfo } from '../../types';

interface TopBarProps {
  onFitView: () => void;
}

export function TopBar({ onFitView: _onFitView }: TopBarProps) {
  const { selectedAppId, appDropdownOpen, toggleAppDropdown, setAppDropdownOpen, setSelectedAppId } = useUIStore();
  const { data: apps } = useApps();
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedApp = apps?.find((a) => a.id === selectedAppId);
  const filtered = apps?.filter((a) => a.name.toLowerCase().includes(search.toLowerCase())) ?? [];

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAppDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [setAppDropdownOpen]);

  return (
    <header className="topbar">
      {/* Left: logo + app selector */}
      <div className="topbar-left">
        <div className="topbar-logo">
          <div className="logo-box">P</div>
        </div>

        <div className="app-selector-wrap" ref={dropdownRef}>
          <button className="app-selector-btn" onClick={toggleAppDropdown}>
            {selectedApp && (
              <span className="app-selector-icon" style={{ background: selectedApp.color }}>
                {selectedApp.icon}
              </span>
            )}
            <span className="app-selector-name">{selectedApp?.name ?? 'Select app'}</span>
            <ChevronUp size={14} className={`app-selector-chevron ${appDropdownOpen ? '' : 'app-selector-chevron--down'}`} />
          </button>
          <button className="app-selector-more"><MoreHorizontal size={15} /></button>

          {appDropdownOpen && (
            <div className="app-dropdown">
              <div className="app-dropdown-header">
                <span>Application</span>
              </div>
              <div className="app-dropdown-search">
                <Search size={13} className="search-icon" />
                <input
                  className="search-input"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <button className="search-add"><Plus size={14} /></button>
              </div>
              <div className="app-dropdown-list">
                {filtered.map((app: AppInfo) => (
                  <button
                    key={app.id}
                    className={`app-dropdown-item ${selectedAppId === app.id ? 'app-dropdown-item--active' : ''}`}
                    onClick={() => { setSelectedAppId(app.id); setSearch(''); }}
                  >
                    <span className="app-dd-icon" style={{ background: app.color }}>{app.icon}</span>
                    <span className="app-dd-name">{app.name}</span>
                    <ChevronRight size={13} className="app-dd-chevron" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: actions */}
      <div className="topbar-right">
        <button className="tb-action"><Share2 size={15} /></button>
        <button className="tb-action" onClick={() => setDark((d) => !d)}>
          {dark ? <Moon size={15} /> : <Sun size={15} />}
        </button>
        <button className="tb-action"><User size={15} /></button>
      </div>
    </header>
  );
}
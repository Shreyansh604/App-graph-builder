import { create } from 'zustand';

interface UIState {
  selectedAppId: string;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  appDropdownOpen: boolean;
  setSelectedAppId: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  setIsMobilePanelOpen: (open: boolean) => void;
  setAppDropdownOpen: (open: boolean) => void;
  toggleAppDropdown: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedAppId: 'app-1',
  selectedNodeId: null,
  isMobilePanelOpen: false,
  appDropdownOpen: false,

  setSelectedAppId: (id) => set({ selectedAppId: id, selectedNodeId: null, appDropdownOpen: false }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setIsMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setAppDropdownOpen: (open) => set({ appDropdownOpen: open }),
  toggleAppDropdown: () => set((s) => ({ appDropdownOpen: !s.appDropdownOpen })),
}));
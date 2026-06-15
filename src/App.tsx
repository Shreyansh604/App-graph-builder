import { useRef } from 'react';
import { useQueryClient as _useQueryClient } from '@tanstack/react-query';
import { TopBar } from './components/layout/TopBar';
import { Canvas } from './components/canvas/Canvas';

export default function App() {
  const fitViewRef = useRef<(() => void) | null>(null);

  return (
    <div className="app-shell">
      <TopBar onFitView={() => fitViewRef.current?.()} />
      <main className="canvas-area">
        <Canvas onFitViewRef={fitViewRef} />
      </main>
    </div>
  );
}
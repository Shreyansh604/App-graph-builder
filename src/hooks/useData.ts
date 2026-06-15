import { useQuery } from '@tanstack/react-query';
import type { AppInfo, GraphData } from '../types';

async function fetchApps(): Promise<AppInfo[]> {
  const res = await fetch('/api/apps');
  if (!res.ok) throw new Error('Failed to fetch apps');
  return res.json() as Promise<AppInfo[]>;
}

async function fetchGraph(appId: string): Promise<GraphData> {
  const res = await fetch(`/api/apps/${appId}/graph`);
  if (!res.ok) throw new Error('Failed to fetch graph');
  return res.json() as Promise<GraphData>;
}

export function useApps() {
  return useQuery({ queryKey: ['apps'], queryFn: fetchApps, staleTime: 5 * 60 * 1000 });
}

export function useAppGraph(appId: string) {
  return useQuery({ queryKey: ['graph', appId], queryFn: () => fetchGraph(appId), staleTime: 30 * 1000, retry: 1 });
}
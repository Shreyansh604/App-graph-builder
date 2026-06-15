import { http, HttpResponse, delay } from 'msw';
import type { AppInfo, GraphData } from '../types';

export const apps: AppInfo[] = [
  { id: 'app-1', name: 'supertokens-golang', icon: '⚡', color: '#6366f1' },
  { id: 'app-2', name: 'supertokens-java',   icon: '☕', color: '#f59e0b' },
  { id: 'app-3', name: 'supertokens-python', icon: '🐍', color: '#ef4444' },
  { id: 'app-4', name: 'supertokens-ruby',   icon: '💎', color: '#ec4899' },
  { id: 'app-5', name: 'supertokens-go',     icon: '🔷', color: '#8b5cf6' },
];

const graphs: Record<string, GraphData> = {
  'app-1': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 80,  y: 80  }, data: { label: 'supertokens-golang', icon: '⚡', pricePerHr: '$0.03/HR', status: 'success', cpu: 0.02, memory: 0.05, disk: 10.00, region: 'us-east-1', activeTab: 'CPU', sliderValue: 35 } },
      { id: 'n2', type: 'serviceNode', position: { x: 520, y: 60  }, data: { label: 'Postgres',           icon: '🐘', pricePerHr: '$0.03/HR', status: 'success', cpu: 0.02, memory: 0.05, disk: 10.00, region: 'us-east-1', activeTab: 'CPU', sliderValue: 72 } },
      { id: 'n3', type: 'serviceNode', position: { x: 200, y: 340 }, data: { label: 'Redis',              icon: '🔴', pricePerHr: '$0.03/HR', status: 'error',   cpu: 0.02, memory: 0.05, disk: 10.00, region: 'us-east-1', activeTab: 'CPU', sliderValue: 58 } },
      { id: 'n4', type: 'serviceNode', position: { x: 620, y: 380 }, data: { label: 'Mongodb',            icon: '🍃', pricePerHr: '$0.03/HR', status: 'error',   cpu: 0.02, memory: 0.05, disk: 10.00, region: 'us-east-1', activeTab: 'CPU', sliderValue: 81 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n1', target: 'n3' },
      { id: 'e3', source: 'n2', target: 'n4' },
    ],
  },
  'app-2': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 100, y: 100 }, data: { label: 'supertokens-java', icon: '☕', pricePerHr: '$0.05/HR', status: 'success', cpu: 0.04, memory: 0.12, disk: 20.00, region: 'eu-west-1', activeTab: 'CPU', sliderValue: 44 } },
      { id: 'n2', type: 'serviceNode', position: { x: 480, y: 100 }, data: { label: 'Postgres',         icon: '🐘', pricePerHr: '$0.03/HR', status: 'success', cpu: 0.02, memory: 0.05, disk: 10.00, region: 'eu-west-1', activeTab: 'CPU', sliderValue: 30 } },
      { id: 'n3', type: 'serviceNode', position: { x: 280, y: 320 }, data: { label: 'Redis',            icon: '🔴', pricePerHr: '$0.03/HR', status: 'building',cpu: 0.01, memory: 0.03, disk: 5.00,  region: 'eu-west-1', activeTab: 'CPU', sliderValue: 10 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n1', target: 'n3' },
    ],
  },
  'app-3': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 60,  y: 120 }, data: { label: 'supertokens-python', icon: '🐍', pricePerHr: '$0.04/HR', status: 'error',   cpu: 0.08, memory: 0.20, disk: 15.00, region: 'ap-south-1', activeTab: 'Memory', sliderValue: 88 } },
      { id: 'n2', type: 'serviceNode', position: { x: 440, y: 80  }, data: { label: 'Postgres',           icon: '🐘', pricePerHr: '$0.03/HR', status: 'success', cpu: 0.02, memory: 0.05, disk: 10.00, region: 'ap-south-1', activeTab: 'CPU',    sliderValue: 22 } },
      { id: 'n3', type: 'serviceNode', position: { x: 440, y: 320 }, data: { label: 'Mongodb',            icon: '🍃', pricePerHr: '$0.03/HR', status: 'error',   cpu: 0.03, memory: 0.08, disk: 8.00,  region: 'ap-south-1', activeTab: 'Disk',   sliderValue: 65 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n1', target: 'n3' },
    ],
  },
  'app-4': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 80,  y: 100 }, data: { label: 'supertokens-ruby', icon: '💎', pricePerHr: '$0.03/HR', status: 'success', cpu: 0.02, memory: 0.05, disk: 10.00, region: 'us-west-2', activeTab: 'CPU', sliderValue: 40 } },
      { id: 'n2', type: 'serviceNode', position: { x: 460, y: 100 }, data: { label: 'Postgres',         icon: '🐘', pricePerHr: '$0.03/HR', status: 'success', cpu: 0.02, memory: 0.05, disk: 10.00, region: 'us-west-2', activeTab: 'CPU', sliderValue: 55 } },
    ],
    edges: [{ id: 'e1', source: 'n1', target: 'n2', animated: true }],
  },
  'app-5': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 80,  y: 100 }, data: { label: 'supertokens-go', icon: '🔷', pricePerHr: '$0.03/HR', status: 'success',  cpu: 0.02, memory: 0.05, disk: 10.00, region: 'us-east-1', activeTab: 'CPU', sliderValue: 28 } },
      { id: 'n2', type: 'serviceNode', position: { x: 460, y: 60  }, data: { label: 'Postgres',       icon: '🐘', pricePerHr: '$0.03/HR', status: 'success',  cpu: 0.02, memory: 0.05, disk: 10.00, region: 'us-east-1', activeTab: 'CPU', sliderValue: 60 } },
      { id: 'n3', type: 'serviceNode', position: { x: 460, y: 280 }, data: { label: 'Redis',          icon: '🔴', pricePerHr: '$0.03/HR', status: 'building', cpu: 0.01, memory: 0.02, disk: 5.00,  region: 'us-east-1', activeTab: 'CPU', sliderValue: 15 } },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true },
      { id: 'e2', source: 'n1', target: 'n3' },
    ],
  },
};

export const handlers = [
  http.get('/api/apps', async () => {
    await delay(400);
    return HttpResponse.json(apps);
  }),
  http.get('/api/apps/:appId/graph', async ({ params }) => {
    await delay(600);
    const graph = graphs[params.appId as string];
    if (!graph) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    return HttpResponse.json(graph);
  }),
];
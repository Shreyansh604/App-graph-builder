export type NodeStatus = 'success' | 'error' | 'building';
export type ResourceTab = 'CPU' | 'Memory' | 'Disk' | 'Region';
export type InspectorTab = 'config' | 'runtime';

export interface NodeData {
  label: string;
  icon: string;
  pricePerHr: string;
  status: NodeStatus;
  cpu: number;
  memory: number;
  disk: number;
  region: string;
  activeTab: ResourceTab;
  sliderValue: number;
  [key: string]: unknown;
}

export interface AppInfo {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface GraphData {
  nodes: RawNode[];
  edges: RawEdge[];
}

export interface RawNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface RawEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}
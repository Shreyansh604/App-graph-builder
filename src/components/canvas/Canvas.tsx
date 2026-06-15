import { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow, Background, Controls, BackgroundVariant,
  useNodesState, useEdgesState, addEdge,
  type Node, type Edge, type Connection,
  type NodeChange, type EdgeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useAppGraph } from '../../hooks/useData';
import { useUIStore } from '../../store/uiStore';
import { ServiceNode } from './ServiceNode';
import type { NodeData } from '../../types';

const nodeTypes = { serviceNode: ServiceNode };

interface CanvasProps {
  onFitViewRef: React.MutableRefObject<(() => void) | null>;
}

export function Canvas({ onFitViewRef }: CanvasProps) {
  const { selectedAppId, setSelectedNodeId } = useUIStore();
  const { data: graphData, isLoading, isError, refetch } = useAppGraph(selectedAppId);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (!graphData) return;
    setNodes(graphData.nodes as Node<NodeData>[]);
    setEdges(graphData.edges);
  }, [graphData, setNodes, setEdges]);

  const onConnect = useCallback((c: Connection) => setEdges((eds) => addEdge(c, eds)), [setEdges]);

  const handleNodesChange = useCallback((changes: NodeChange<Node<NodeData>>[]) => {
    onNodesChange(changes);
    if (changes.some((c) => c.type === 'remove')) setSelectedNodeId(null);
  }, [onNodesChange, setSelectedNodeId]);

  const handleEdgesChange = useCallback((changes: EdgeChange<Edge>[]) => onEdgesChange(changes), [onEdgesChange]);

  const onInit = useCallback((instance: { fitView: () => void }) => {
    onFitViewRef.current = () => instance.fitView();
    setTimeout(() => instance.fitView(), 100);
  }, [onFitViewRef]);

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  if (isLoading) return (
    <div className="canvas-state">
      <Loader2 className="spin" size={28} />
      <p>Loading graph…</p>
    </div>
  );

  if (isError) return (
    <div className="canvas-state canvas-state--error">
      <AlertTriangle size={28} />
      <p>Failed to load graph</p>
      <button className="retry-btn" onClick={() => void refetch()}>
        <RefreshCw size={14} /> Retry
      </button>
    </div>
  );

  return (
    <div className="canvas-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        nodeTypes={nodeTypes}
        onInit={onInit}
        deleteKeyCode={['Delete', 'Backspace']}
        fitView
        proOptions={proOptions}
        minZoom={0.3}
        maxZoom={2}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#1e2338" />
        <Controls className="flow-controls" position="bottom-center" />
      </ReactFlow>
    </div>
  );
}
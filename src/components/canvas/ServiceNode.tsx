import { memo, useCallback } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import { Settings } from 'lucide-react';
import type { NodeData, ResourceTab } from '../../types';

const TABS: ResourceTab[] = ['CPU', 'Memory', 'Disk', 'Region'];

const RESOURCE_VALUES = (data: NodeData): Record<ResourceTab, string> => ({
  CPU:    String(data.cpu),
  Memory: `${data.memory} GB`,
  Disk:   `${data.disk} GB`,
  Region: '1',
});

export const ServiceNode = memo(function ServiceNode({ id, data, selected }: NodeProps) {
  const d = data as unknown as NodeData;
  const { updateNodeData } = useReactFlow();

  const setTab = useCallback((tab: ResourceTab) => {
    updateNodeData(id, { activeTab: tab });
  }, [id, updateNodeData]);

  const setSlider = useCallback((val: number) => {
    updateNodeData(id, { sliderValue: val });
  }, [id, updateNodeData]);

  const vals = RESOURCE_VALUES(d);

  return (
    <div className={`sn ${selected ? 'sn--selected' : ''}`}>
      <Handle type="target" position={Position.Left} className="sn-handle" />

      {/* Header */}
      <div className="sn-header">
        <div className="sn-title">
          <span className="sn-icon">{d.icon}</span>
          <span className="sn-label">{d.label}</span>
        </div>
        <div className="sn-header-actions">
          <span className="sn-price">{d.pricePerHr}</span>
          <button className="sn-gear" onClick={(e) => e.stopPropagation()}>
            <Settings size={13} />
          </button>
        </div>
      </div>

      {/* Metrics row */}
      <div className="sn-metrics">
        {TABS.map((tab) => (
          <div key={tab} className="sn-metric">
            <span className="sn-metric-val">{vals[tab]}</span>
          </div>
        ))}
      </div>

      {/* Tab selector */}
      <div className="sn-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`sn-tab ${d.activeTab === tab ? 'sn-tab--active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setTab(tab); }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="sn-slider-row">
        <input
          type="range"
          min={0}
          max={100}
          value={d.sliderValue}
          className="sn-slider"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setSlider(Number(e.target.value))}
        />
        <span className="sn-slider-val">{(d.sliderValue / 100 * 0.1).toFixed(2)}</span>
      </div>

      {/* Footer */}
      <div className="sn-footer">
        <span className={`sn-status sn-status--${d.status}`}>
          {d.status === 'success' ? '✓ Success' : d.status === 'error' ? '⚠ Error' : '⟳ Building'}
        </span>
        <span className="sn-aws">
          <span className="sn-aws-icon">aws</span>
        </span>
      </div>

      <Handle type="source" position={Position.Right} className="sn-handle" />
    </div>
  );
});
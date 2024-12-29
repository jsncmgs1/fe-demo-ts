import { ButtonEdge } from "@/components/button-edge";
import { DescriptionList } from "@/components/description-list";

import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: "1",
    position: { x: 150, y: 100 },
    data: {
      label: "Demo API",
      documentation: "https://github.com/jsncmgs1/DemoApi/README",
      logs: "https://someLogService.com/myOrg?apps=demoApi",
      healthCheck: "https://demoapi.herokuapp.com/health",
      metrics: "https://ui.honeycomb.com/myOrg/demoApiBoard"
    }
  },
  { id: '2', position: { x: 50, y: 200 }, data: { label: 'Demo Service 1' } },
  { id: '3', position: { x: 250, y: 200 }, data: { label: 'Demo Service 2' } },
  { id: '4', position: { x: 350, y: 300 }, data: { label: 'Demo Service 3' } },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'buttonEdge' ,
    data: {
      documentation: "https://github.com/jsncmgs1/engineering-docs/apiAndService1Relationship.md",
      logs: "https://someLogService.com/myOrg?apps=demoApi%2cdemoService1",
      healthCheck: {
        paths: [
          "https://demoapi.herokuapp.com/health",
          "https://demoserviceone.herokuapp.com/health"
        ],
      },
      metrics: {
        eventStream: "https://ui.honeycomb.com/myOrg/demoApiServiceOneEvents",
        moreMetrics: "..."
      }
    }
  },
  { id: 'e1-3', source: '1', target: '3', type: 'buttonEdge' },
  { id: 'e3-4', source: '3', target: '4', type: 'buttonEdge' },
];

const edgeTypes = {
  buttonEdge: ButtonEdge,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

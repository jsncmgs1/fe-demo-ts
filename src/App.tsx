import { ButtonEdge } from "@/components/button-edge";

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
  { id: '1', position: { x: 150, y: 100 }, data: { label: 'Demo API' } },
  { id: '2', position: { x: 50, y: 200 }, data: { label: 'Demo Service 1' } },
  { id: '3', position: { x: 250, y: 200 }, data: { label: 'Demo Service 2' } },
  { id: '4', position: { x: 350, y: 300 }, data: { label: 'Demo Service 3' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'buttonEdge' },
  { id: 'e1-3', source: '1', target: '3', type: 'buttonEdge' },
  { id: 'e3-4', source: '3', target: '4', type: 'buttonEdge' }
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

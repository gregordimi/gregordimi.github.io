"use client"

import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// --- Data is now self-contained within this component ---

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Web Crawler (Shops & Categories)' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    data: { label: 'Open Source Databases (Products)' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '3',
    position: { x: 0, y: 250 },
    data: { label: 'User (Receipts & Price Tags, Image)' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
{
    id: '4a',
    position: { x: 175, y: 200 },
    data: { label: 'merim.bg Mobile App (Form Data Entry)' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '4b',
    position: { x: 175, y: 300 },
    data: { label: 'merim.bg Mobile App (Camera Data Entry)' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '5',
    position: { x: 350, y: 250 },
    data: { label: 'Google Gemini AI (Data Processing Images)' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '6',
    position: { x: 425, y: -100 },
    data: { label: 'Supabase PostgreSQL (Data Storage)' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '7',
    position: { x: 600, y: 100 },
    data: { label: 'Data Aggregation' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '8',
    position: { x: 775, y: 100 },
    data: { label: 'Reporting & Data Visualization (App UI)' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

const initialEdges = [
    { id: 'e1-6', source: '1', target: '6', animated: true },
    { id: 'e2-6', source: '2', target: '6', animated: true },
    { id: 'e3-4a', source: '3', target: '4a', animated: true },
    { id: 'e3-4b', source: '3', target: '4b', animated: true },
    { id: 'e4-6', source: '4a', target: '6', animated: true },
    { id: 'e4-5', source: '4b', target: '5', animated: true },
    { id: 'e5-6', source: '5', target: '6', animated: true },
    { id: 'e6-7', source: '6', target: '7', animated: true },
    { id: 'e7-8', source: '7', target: '8', animated: true },
];


// --- The Component Logic ---

export function DataPipelineFlowchart() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '60vh', border: '1px solid #ddd', borderRadius: '8px', marginTop: '20px', marginBottom: '20px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
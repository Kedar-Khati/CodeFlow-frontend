import React, { useRef, useCallback, useState } from 'react';
import { ClassNode } from './components/ClassNode';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Sidebar from './components/Sidebar';
import { DnDProvider, useDnD } from './context/DnDContext';
import { ClassProvider, useClassContext } from './context/ClassContext';

const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const { classes, addClass, deleteClass } = useClassContext();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const className = `Class${id}`; // Generate a unique class name
      const nodeId = getId();
      const newNode = {
        id: nodeId,
        type,
        position,
        data: { label: <ClassNode className={className} id={nodeId} /> },
      };

      setNodes((nds) => nds.concat(newNode));
      addClass(className, nodeId); // Add the new class to the global list
    },
    [screenToFlowPosition, type, addClass],
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onDeleteNode = useCallback(() => {
    if (selectedNodeId) {
      // Delete the node from the flow
      setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
      // Delete the class from the global list
      deleteClass(selectedNodeId);
      setSelectedNodeId(null); // Clear selection after deletion
    }
  }, [selectedNodeId, deleteClass]);

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
        >
          <Controls />
          <Background variant='lines'/>
        </ReactFlow>
      </div>
      <Sidebar onDeleteNode={onDeleteNode} selectedNodeId={selectedNodeId} />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <ClassProvider>
        <DnDFlow />
      </ClassProvider>
    </DnDProvider>
  </ReactFlowProvider>
);
import React from 'react';
import { useDnD } from '../context/DnDContext';
import { useClassContext } from '../context/ClassContext';

export default ({ onDeleteNode, selectedNodeId }) => {
  const [_, setType] = useDnD();
  const { classes } = useClassContext(); // Access the classes from the context

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Function to generate JSON data
  const generateJsonData = () => {
    return classes.map((cls) => ({
      classname: cls.name,
      classId: cls.id,
      attributes: cls.attributes.map((attr) => [attr.name, attr.type]), // Convert to tuple
      apis: cls.apis, // Include selected APIs
    }));
  };

  // Function to trigger JSON download
  const downloadJson = () => {
    const jsonData = generateJsonData();
    const jsonString = JSON.stringify(jsonData, null, 2); // Pretty-print JSON
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'classes.json'; // File name
    link.click();
    URL.revokeObjectURL(url); // Clean up
  };

  return (
    <aside>
      <div
        className="description"
        style={{
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '10px',
        }}
      >
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
        style={{
          fontSize: '16px',
          fontWeight: '400',
        }}
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
        style={{
          fontSize: '16px',
          fontWeight: '400',
        }}
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
        style={{
          fontSize: '16px',
          fontWeight: '400',
        }}
      >
        Output Node
      </div>
      <button
        style={{
          padding: '15px',
          border: '1px solid #dc3545',
          borderRadius: '4px',
          backgroundColor: selectedNodeId ? 'lightpink' : '#f8f9fa',
          color: selectedNodeId ? 'black' : '#ccc',
          textAlign: 'center',
          cursor: selectedNodeId ? 'pointer' : 'not-allowed',
          fontSize: '18px',
          fontWeight: '900',
          transition: 'background-color 0.3s ease',
          width: '100%',
          marginTop: '10px',
        }}
        className="deleteBtn dndnode"
        onClick={onDeleteNode}
        disabled={!selectedNodeId}
      >
        Delete Node
      </button>

      {/* Download JSON Button */}
      <button
        style={{
          padding: '15px',
          border: '1px solid #28a745',
          borderRadius: '4px',
          backgroundColor: '#28a745',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: '900',
          transition: 'background-color 0.3s ease',
          width: '100%',
          marginTop: '10px',
        }}
        onClick={downloadJson}
      >
        Download JSON
      </button>
    </aside>
  );
};
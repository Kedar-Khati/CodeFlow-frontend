import React from 'react';
import { useDnD } from '../context/DnDContext';

export default ({ onDeleteNode, selectedNodeId }) => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div
        className="description"
        style={{
          fontSize: '18px', // Increase font size
          fontWeight: '700', // Make font bold
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
          fontSize: '16px', // Increase font size
          fontWeight: '400', // Make font bold
        }}
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
        style={{
          fontSize: '16px', // Increase font size
          fontWeight: '400', // Make font bold
        }}
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
        style={{
          fontSize: '16px', // Increase font size
          fontWeight: '400', // Make font bold
        }}
      >
        Output Node
      </div>
      <button
        style={{
          padding: '15px',
          border: '1px solid #dc3545',
          borderRadius: '4px',
          backgroundColor: selectedNodeId ? 'lightpink' : '#f8f9fa', // Change color based on selection
          color: selectedNodeId ? 'black' : '#ccc', // Change text color based on selection
          textAlign: 'center',
          cursor: selectedNodeId ? 'pointer' : 'not-allowed', // Change cursor based on selection
          fontSize: '18px', // Increase font size for button
          fontWeight: '900', // Make font bolder for button
          transition: 'background-color 0.3s ease',
          width: '100%',
          marginTop: '10px',
        }}
        className="deleteBtn dndnode"
        onClick={onDeleteNode}
        disabled={!selectedNodeId} // Disable button if no node is selected
      >
        Delete Node
      </button>
    </aside>
  );
};

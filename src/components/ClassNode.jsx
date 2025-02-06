import React, { useState } from 'react';
import { useClassContext } from '../context/ClassContext';

export const ClassNode = ({ className, id }) => {
  const [i, setI] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const { classes, updateClassName } = useClassContext();
  const [localClassName, setLocalClassName] = useState(className);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false); // State to manage modal visibility
  const [selectedApis, setSelectedApis] = useState({ // State to manage selected APIs
    get: false,
    getAll: false,
    post: false,
    patch: false,
    delete: false,
  });

  // Filter out the current class from the available classes
  const availableClasses = classes.filter((cls) => cls.name !== localClassName);

  const handleAttributeChange = (index, key, value) => {
    const newAttributes = [...attributes];
    newAttributes[index] = { ...newAttributes[index], [key]: value };
    setAttributes(newAttributes);
  };

  const handleClassNameChange = (e) => {
    const newClassName = e.target.value;
    setLocalClassName(newClassName);
    updateClassName(id, newClassName);
  };

  const toggleApiModal = () => {
    setIsApiModalOpen(!isApiModalOpen);
  };

  const handleApiSelection = (api) => {
    setSelectedApis({ ...selectedApis, [api]: !selectedApis[api] });
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
      {/* Class Name Input */}
      <input 
        placeholder="Enter ClassName" 
        value={localClassName}
        onChange={handleClassNameChange}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '6px',
          border: '2px solid #007BFF',
          borderRadius: '4px',
          fontWeight: 'bold',
          outline: 'none',
          backgroundColor: '#f0f8ff',
          marginBottom: '8px',
        }} 
      />

      {/* Attributes */}
      {Array.from({ length: i }).map((_, k) => (
        <div key={k} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input 
            placeholder={`Attribute ${k + 1}`} 
            value={attributes[k]?.name || ''}
            onChange={(e) => handleAttributeChange(k, 'name', e.target.value)}
            style={{
              flex: 1,
              width: '100%',
              boxSizing: 'border-box',
              padding: '6px',
              border: 'none',
              borderBottom: '1px solid black',
              outline: 'none',
              backgroundColor: '#fff',
            }} 
          />
          <select 
            name={`attribute-${k}`} 
            value={attributes[k]?.type || ''}
            onChange={(e) => handleAttributeChange(k, 'type', e.target.value)}
            style={{ padding: '6px', boxSizing: 'border-box', width: '18px' }}
          >
            <option value="">Select Type</option>
            <option value="string">String</option>
            <option value="int">Integer</option>
            <option value="float">Float</option>
            <option value="boolean">Boolean</option>
            {availableClasses.map((cls, index) => (
              <React.Fragment key={index}>
                <option value={cls.name}>{cls.name}</option>
                <option value={`${cls.name}[]`}>{cls.name}[]</option>
              </React.Fragment>
            ))}
          </select>
        </div>
      ))}

      {/* Add Attribute Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <button 
          onClick={() => setI(i + 1)} 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          +
        </button>
      </div>

      {/* API Selection Button */}
      <button 
        onClick={toggleApiModal}
        style={{
          marginTop: '8px',
          padding: '8px 16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Select APIs
      </button>

      {/* API Selection Modal */}
      {isApiModalOpen && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    width: '90%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    <h3 style={{
      marginBottom: '16px',
      fontSize: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
    }}>
      Select APIs for {localClassName}
    </h3>
    
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      gap: '10px',
    }}>
      {Object.keys(selectedApis).map((api) => (
        <label key={api} style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '8px',
          borderRadius: '6px',
          cursor: 'pointer',
          backgroundColor: selectedApis[api] ? '#e3f2fd' : 'transparent',
          transition: 'background 0.3s ease',
        }}>
          <input
            type="checkbox"
            checked={selectedApis[api]}
            onChange={() => handleApiSelection(api)}
            style={{ marginRight: '10px', cursor: 'pointer' }}
          />
          {api.toUpperCase()}
        </label>
      ))}
    </div>

    <button 
      onClick={toggleApiModal}
      style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
          Close
        </button>
      </div>
    )}
    </div>
  );
};
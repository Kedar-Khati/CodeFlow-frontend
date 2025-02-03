import React, { useState, useEffect } from 'react';
import { useClassContext } from '../context/ClassContext';

export const ClassNode = ({ className, id }) => {
  const [i, setI] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const { classes, updateClassName } = useClassContext();
  const [localClassName, setLocalClassName] = useState(className);

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
    </div>
  );
};
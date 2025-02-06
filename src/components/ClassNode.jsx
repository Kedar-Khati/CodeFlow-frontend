import React, { useState, useEffect } from 'react';
import { useClassContext } from '../context/ClassContext';

export const ClassNode = ({ className, id }) => {
  const [i, setI] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const { classes, updateClassName, updateClassAttributes, updateClassApis } = useClassContext();
  const [localClassName, setLocalClassName] = useState(className);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [selectedApis, setSelectedApis] = useState({
    get: false,
    getAll: false,
    post: false,
    patch: false,
    delete: false,
  });

  // Filter out the current class from the available classes
  const availableClasses = classes.filter((cls) => cls.name !== localClassName);

  // Update attributes in the context whenever they change
  useEffect(() => {
    updateClassAttributes(id, attributes);
  }, [attributes, id, updateClassAttributes]);

  // Update APIs in the context whenever they change
  useEffect(() => {
    const apis = Object.keys(selectedApis).filter((api) => selectedApis[api]);
    updateClassApis(id, apis);
  }, [selectedApis, id, updateClassApis]);

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

            <optgroup label="Single Data Type">
              <option value="string">String</option>
              <option value="int">Integer</option>
              <option value="float">Float</option>
              <option value="boolean">Boolean</option>
            </optgroup>

            <optgroup label="List of Data Type">
              <option value="string[]">String[]</option>
              <option value="int[]">Integer[]</option>
              <option value="float[]">Float[]</option>
              <option value="boolean[]">Boolean[]</option>
            </optgroup>

            {availableClasses.length > 0 && (
              <>
                <optgroup label="Foreign Key">
                  {availableClasses.map((cls, index) => (
                    <option key={index} value={cls.name}>
                      {cls.name}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="List of Foreign Key">
                  {availableClasses.map((cls, index) => (
                    <option key={index} value={`${cls.name}[]`}>
                      {cls.name}[]
                    </option>
                  ))}
                </optgroup>
              </>
            )}
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
          <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
            Select APIs for {localClassName}
          </h3>
          {Object.keys(selectedApis).map((api) => (
            <label key={api} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '8px', borderRadius: '6px', cursor: 'pointer', backgroundColor: selectedApis[api] ? '#e3f2fd' : 'transparent', transition: 'background 0.3s ease' }}>
              <input
                type="checkbox"
                checked={selectedApis[api]}
                onChange={() => handleApiSelection(api)}
                style={{ marginRight: '10px', cursor: 'pointer' }}
              />
              {api.toUpperCase()}
            </label>
          ))}
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
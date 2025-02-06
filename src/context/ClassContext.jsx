import React, { createContext, useContext, useState } from 'react';

const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);

  const addClass = (className, id) => {
    setClasses((prevClasses) => [
      ...prevClasses,
      { id, name: className, attributes: [], apis: [] }, // Initialize attributes and apis
    ]);
  };

  const updateClassName = (id, newClassName) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === id ? { ...cls, name: newClassName } : cls
      )
    );
  };

  const updateClassAttributes = (id, attributes) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === id ? { ...cls, attributes } : cls
      )
    );
  };

  const updateClassApis = (id, apis) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === id ? { ...cls, apis } : cls
      )
    );
  };

  const deleteClass = (id) => {
    setClasses((prevClasses) => prevClasses.filter((cls) => cls.id !== id));
  };

  return (
    <ClassContext.Provider
      value={{
        classes,
        addClass,
        updateClassName,
        updateClassAttributes,
        updateClassApis,
        deleteClass,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => useContext(ClassContext);
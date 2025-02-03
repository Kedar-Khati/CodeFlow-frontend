import React, { createContext, useContext, useState } from 'react';

const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);

  const addClass = (className, id) => {
    setClasses((prevClasses) => [...prevClasses, { id, name: className }]);
  };

  const updateClassName = (id, newClassName) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === id ? { ...cls, name: newClassName } : cls
      )
    );
  };

  return (
    <ClassContext.Provider value={{ classes, addClass, updateClassName }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => useContext(ClassContext);
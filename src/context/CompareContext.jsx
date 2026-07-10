import React, { createContext, useState, useContext } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (product) => {
    setCompareList(prevList => {
      const exists = prevList.some(item => item.id === product.id);
      if (exists) {
        return prevList; // Already in list
      }
      if (prevList.length >= 3) {
        // Limit to 3 items
        return [...prevList.slice(1), product];
      }
      return [...prevList, product];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList(prevList => prevList.filter(item => item.id !== productId));
  };

  const isInCompare = (productId) => {
    return compareList.some(item => item.id === productId);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      isInCompare,
      clearCompare,
      compareCount: compareList.length
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);

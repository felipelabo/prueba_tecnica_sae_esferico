"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos para el contexto
interface ParcelaContextType {
  selectedParcelaId: number | undefined;
  setSelectedParcelaId: (id: number | undefined) => void;
  selectParcela: (id: number) => void;
  clearSelection: () => void;
}

// Crear el contexto
const ParcelaContext = createContext<ParcelaContextType | undefined>(undefined);

// Props para el provider
interface ParcelaProviderProps {
  children: ReactNode;
}

// Provider del contexto
export const ParcelaProvider: React.FC<ParcelaProviderProps> = ({ children }) => {
  const [selectedParcelaId, setSelectedParcelaId] = useState<number | undefined>(undefined);

  // Función helper para seleccionar una parcela
  const selectParcela = (id: number) => {
    setSelectedParcelaId(id);
  };

  // Función helper para limpiar la selección
  const clearSelection = () => {
    setSelectedParcelaId(undefined);
  };

  const value: ParcelaContextType = {
    selectedParcelaId,
    setSelectedParcelaId,
    selectParcela,
    clearSelection,
  };

  return (
    <ParcelaContext.Provider value={value}>
      {children}
    </ParcelaContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useParcela = (): ParcelaContextType => {
  const context = useContext(ParcelaContext);
  
  if (context === undefined) {
    throw new Error('useParcela debe usarse dentro de un ParcelaProvider');
  }
  
  return context;
};

// Hook para verificar si una parcela está seleccionada
export const useIsParcelaSelected = (id: number): boolean => {
  const { selectedParcelaId } = useParcela();
  return selectedParcelaId === id;
};

// Hook para obtener solo el ID seleccionado (más específico)
export const useSelectedParcelaId = (): number | undefined => {
  const { selectedParcelaId } = useParcela();
  return selectedParcelaId;
};
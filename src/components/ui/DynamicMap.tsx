"use client";
import dynamic from 'next/dynamic';
import type { Parcela } from "@/domain/maps";

// Importación dinámica del componente UserMap con SSR deshabilitado
const UserMap = dynamic(() => import('./UserMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-lg bg-gray-100 animate-pulse flex items-center justify-center">
      Cargando mapa...
    </div>
  )
});

const DynamicMap = ({ parcelas }:{ parcelas:Parcela[]}) => {
  return <UserMap parcelas={parcelas} />;
};

export default DynamicMap;
"use client"
import { MapContainer, TileLayer, Polygon, FeatureGroup, Popup, useMap } from "react-leaflet";
import type { Parcela } from "@/domain/maps";
import "leaflet/dist/leaflet.css";
import {Sprout} from 'lucide-react';
import { useSelectedParcelaId } from "@/context/ParcelaContext";
import { useEffect } from "react";

// Componente separado para controlar el bounds dinámicamente
const MapBoundsController = ({ parcelas }: { parcelas: Parcela[] }) => {
  const map = useMap();
  const selectedParcelaId = useSelectedParcelaId();

  useEffect(() => {
    
    if (selectedParcelaId) {
      const selectedParcela = parcelas.find(p => p.id === selectedParcelaId);
      if (selectedParcela && selectedParcela.coordenadas.length > 0) {
        map.fitBounds(selectedParcela.coordenadas);
      }
    }
  }, [selectedParcelaId]);

  return null;
};

const UserMap = ({parcelas}:{parcelas:Parcela[]}) => {

  return (
    <MapContainer
      bounds={parcelas[0]?.coordenadas}
      zoom={10}
      scrollWheelZoom={true}
      className="h-full w-full rounded-lg"
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Controlador dinámico de bounds */}
        <MapBoundsController parcelas={parcelas} />
        
        {parcelas.map((parcela:Parcela)=>{

            const polygonParcela = <Polygon key={parcela.id} pathOptions={{color:"#6f4f28"}} positions={parcela.coordenadas}/>
              
              
            const polygonRecintos = parcela.recintos?.map(recinto =>{
              return <FeatureGroup key={`r_${recinto.id}`}>
                <Polygon key={`r_${recinto.id}`} pathOptions={{color:`var(--color-cultivo-${recinto.cultivo.nombre.toLowerCase()})`}} positions={recinto.coordenadas}/>
                <Popup>
                  <div>
                    <h3 
                      className="font-bold text-lg flex gap-2 items-center"
                      style={{color:`var(--color-cultivo-${recinto.cultivo.nombre.toLowerCase()})`}}
                    ><span><Sprout size={18} /></span>{recinto.cultivo.nombre}</h3>
                    <h5 className=" mb-2">Recinto {recinto.id}</h5>
                    <p style={{marginBottom:5}}><span className="font-semibold">Fecha Siembra:</span> {new Date(recinto.fechaSiembra).toLocaleDateString()}</p>
                    <p style={{marginTop:5}}><span className="font-semibold">Fecha Cosecha:</span> {recinto.fechaCosecha ? new Date(recinto.fechaCosecha).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </Popup>
              </FeatureGroup>
            });
            const polygon = [polygonParcela, ...polygonRecintos!];

            return polygon;

        })}
    </MapContainer>

  );
}

export default UserMap;
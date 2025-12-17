"use client"
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import type { Parcela } from "@/domain/maps";
import "leaflet/dist/leaflet.css";

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
        {parcelas.map((parcela:Parcela)=>{

            const polygonParcela = <Polygon key={parcela.id} pathOptions={{color:"#6f4f28"}} positions={parcela.coordenadas}/>
            const polygonRecintos = parcela.recintos?.map(recinto => <Polygon key={`r_${recinto.id}`} pathOptions={{color:`var(--color-cultivo-${recinto.cultivo.nombre.toLowerCase()})`}} positions={recinto.coordenadas}/>);
            const polygon = [polygonParcela, ...polygonRecintos!];

            return polygon;

        })}
    </MapContainer>

  );
}

export default UserMap;
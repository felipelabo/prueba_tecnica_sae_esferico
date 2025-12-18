"use client";
import type { Parcela } from "@/domain/maps";
import {LandPlot} from 'lucide-react';
import EnclosureCard from "./EnclosureCard";
import { useParcela, useIsParcelaSelected } from "@/context/ParcelaContext";

const FieldCard = ({id,municipio,provincia,recintos}:Parcela) => {
    const { selectParcela, clearSelection } = useParcela();
    const isSelected = useIsParcelaSelected(id);

    const handleClick = () => {
        if (isSelected) {
            clearSelection();
        } else {
            selectParcela(id);
        }
    };

    return (
        <div 
            onClick={handleClick}
            className={`z-50 grid grid-cols-2 gap-2 cursor-pointer rounded-lg border p-4 shadow-sm transition-all group hover:shadow-md border-primary-light bg-primary-light hover:border-primary`}
        >

            <div className="flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-8">
                    {/*<User size={22} className="text-primary-dark" />*/}
                    <div className="flex items-center gap-1 text-primary-dark">
                        <LandPlot size={24} />
                        <h3 className="text-xl font-semibold ">N°{id}</h3>
                    </div>
                </div>

                <div>
                    <p className="text-md font-medium text-primary">{provincia.nombre}</p>
                    <p className="text-xs font-bold text-muted">{municipio.nombre}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {recintos && recintos.length > 0 ? (
                    recintos.map((recinto) => <EnclosureCard key={recinto.id} {...recinto} />)
                ):(
                    <p className="text-sm text-muted">No hay recintos asociados.</p>
                )}
            </div>
            

        </div>
    )
}

export default FieldCard;
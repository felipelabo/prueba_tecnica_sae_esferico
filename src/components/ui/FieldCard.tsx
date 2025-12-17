import type { Parcela } from "@/domain/maps";
import {LandPlot} from 'lucide-react';
import EnclosureCard from "./EnclosureCard";

const FieldCard = ({id,municipio,provincia,recintos}:Parcela) => {
    return (
        <div className="z-50 grid grid-cols-2 gap-2 cursor-pointer rounded-lg border border-primary-light bg-white p-4 shadow-sm  transition-shadow group">

            <div className="flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-8">
                    {/*<User size={22} className="text-primary-dark" />*/}
                    <div className="flex items-center gap-1 text-primary-dark">
                        <LandPlot size={26} />
                        <h3 className="text-3xl font-semibold ">{id}</h3>
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
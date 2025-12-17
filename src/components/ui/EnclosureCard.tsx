import type { Recinto } from "@/domain/maps";
import {Sprout} from 'lucide-react';

const EnclosureCard = ({id,cultivo,fechaSiembra,fechaCosecha}:Recinto) => {
    return <div 
        className="p-2 rounded-lg "
        style={{
            backgroundColor: `var(--color-cultivo-${cultivo.nombre.toLowerCase()})`
        }}
    >
        <p className="text-sm font-medium text-white">Recinto {id}</p>
        <p className="text-xs text-white flex items-center gap-1">
            <span>
                <Sprout size={12} />
            </span>{cultivo.nombre}</p>
    </div>
}

export default EnclosureCard;                
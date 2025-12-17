import {prisma} from '../../prisma/prisma_client';
import type { Parcela } from '@/domain/maps';

export const getParcels = async (id: number): Promise<Parcela[]> => {
    const iduser = Number(id);

    // Usar ST_AsGeoJSON para obtener las coordenadas en formato JSON
    const parcels = await prisma.$queryRaw<any[]>`
        SELECT 
            p.id,
            ST_AsGeoJSON(p.geom) as geom_geojson,
            m.id as municipio_id,
            m.nombre as municipio_nombre,
            pr.id as provincia_id,
            pr.nombre as provincia_nombre
        FROM "Parcela" p
        JOIN "Municipio" m ON p."municipioId" = m.id
        JOIN "Provincia" pr ON m."provinciaId" = pr.id
        WHERE p."usuarioId" = ${iduser}
    `;

    // También obtener los recintos
    const recintos = await prisma.$queryRaw<any[]>`
        SELECT 
            r.id,
            r."parcelaId",
            ST_AsGeoJSON(r.geom) as geom_geojson,
            r."fechaSiembra",
            r."fechaCosecha",
            c.id as cultivo_id,
            c.nombre as cultivo_nombre
        FROM "Recinto" r
        JOIN "Cultivo" c ON r."cultivoId" = c.id
        WHERE r."parcelaId" IN (
            SELECT id FROM "Parcela" WHERE "usuarioId" = ${iduser}
        )
    `;

    // Transformar a la interfaz del dominio
    return parcels.map(parcela => ({
        id: parcela.id,
        municipio: {
            id: parcela.municipio_id,
            nombre: parcela.municipio_nombre
        },
        provincia: {
            id: parcela.provincia_id,
            nombre: parcela.provincia_nombre
        },
        coordenadas: parcela.geom_geojson,
        recintos: recintos
            .filter(r => r.parcelaId === parcela.id)
            .map(recinto => ({
                id: recinto.id,
                cultivo: {
                    id: recinto.cultivo_id,
                    nombre: recinto.cultivo_nombre
                },
                fechaSiembra: recinto.fechaSiembra,
                fechaCosecha: recinto.fechaCosecha || new Date(),
                coordenadas: recinto.geom_geojson
            }))
    }));
};

/*/ Función auxiliar para extraer coordenadas del GeoJSON
function extractCoordinatesFromGeoJSON(geojsonString: string): string[] {
    if (!geojsonString) return [];
    
    try {
        const geojson = JSON.parse(geojsonString);
        
        if (geojson.type === 'Polygon' && geojson.coordinates && geojson.coordinates[0]) {
            // Para polígonos, tomar el anillo exterior (coordinates[0])
            return geojson.coordinates[0].map((coord: number[]) => `${coord[0]},${coord[1]}`);
        }
        
        return [];
    } catch (error) {
        console.error('Error al parsear GeoJSON:', error);
        return [];
    }
}*/

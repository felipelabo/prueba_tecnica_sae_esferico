import {prisma} from '../../prisma/prisma_client';
import type { Parcela } from '@/domain/maps';

export const getParcels = async (id: number): Promise<Parcela[]> => {
    const iduser = Number(id);

    try{
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
            coordenadas: JSON.parse(parcela.geom_geojson).coordinates[0],
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
                    coordenadas: JSON.parse(recinto.geom_geojson).coordinates[0]
                }))
        }));
    }catch(error){
        console.error('Error al obtener las parcelas del usuario:', error);
        throw error;
    }
};


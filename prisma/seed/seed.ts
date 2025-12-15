// Este archivo contendrá el script que hará el seed de la base de datos
import { prisma } from "../prisma_client";

async function main() {
    /* 
    *  Usa esto de ejemplo. Los polígonos los tendrás que insertar usando raw queries
    *  documentación: https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries
    * 
    *  Para hacerlo de forma cómoda, puedes usar la función ST_GeomFromGeoJSON de PostGIS usando el atributo
    *  "geometry" de cada Feature de la FeatureCollection que te genere la herramienta de dibujo.
    *  Puedes consultar la documentación de la función de PostGIS aquí:
    *  https://postgis.net/docs/ST_GeomFromGeoJSON.html
    * 
    *  Puedes crear polígonos fácilmente mediante esta herramienta de dibujo: https://geojson.io/#map=5/39.25/-5.56
    * 
    *  Para las tablas que no contienen geometrías, puedes usar el cliente de prisma de manera normal. Puedes consultar
    *  las opciones de CRUD en la documentación oficial de prisma: https://www.prisma.io/docs/orm/prisma-client/queries/crud
    */

    // await prisma.provincia.createMany({
    //     data: [
    //         {
    //             id: 1,
    //             nombre: "Murcia"
    //         },
    //         {
    //             id: 2,
    //             nombre: "Alicante"
    //         }
    //     ]
    // });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


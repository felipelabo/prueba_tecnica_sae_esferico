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

    console.log('Iniciando seed de la base de datos...');

    // 1. PROVINCIAS
    console.log('Creando provincias...');
    await prisma.provincia.createMany({
        data: [
            { nombre: "Murcia" },
            { nombre: "Alicante" },
            { nombre: "Almería" }
        ]
    });

    const provincias = await prisma.provincia.findMany();
    const murcia = provincias.find(p => p.nombre === "Murcia")!;
    const alicante = provincias.find(p => p.nombre === "Alicante")!;
    const almeria = provincias.find(p => p.nombre === "Almería")!;

    // 2. MUNICIPIOS
    console.log('Creando municipios...');
    await prisma.municipio.createMany({
        data: [
            // Murcia
            { nombre: "Cartagena", provinciaId: murcia.id },
            { nombre: "Lorca", provinciaId: murcia.id },
            { nombre: "Murcia", provinciaId: murcia.id },
            { nombre: "Molina de Segura", provinciaId: murcia.id },
            // Alicante
            { nombre: "Alicante", provinciaId: alicante.id },
            { nombre: "Elche", provinciaId: alicante.id },
            { nombre: "Torrevieja", provinciaId: alicante.id },
            { nombre: "Orihuela", provinciaId: alicante.id },
            // Almería
            { nombre: "Almería", provinciaId: almeria.id },
            { nombre: "El Ejido", provinciaId: almeria.id },
            { nombre: "Roquetas de Mar", provinciaId: almeria.id }
        ]
    });

    // 3. CULTIVOS
    console.log('Creando cultivos...');
    await prisma.cultivo.createMany({
        data: [
            { nombre: "Trigo" },
            { nombre: "Maíz" },
            { nombre: "Olivo" },
            { nombre: "Tomate" },
            { nombre: "Lechuga" },
            { nombre: "Almendro" }
        ]
    });

    // 4. USUARIOS
    console.log('Creando usuarios...');
    await prisma.usuario.createMany({
        data: [
            { nombre: "Juan García Martínez", email: "juan.garcia@agro.es", password: "password123" },
            { nombre: "María López Sánchez", email: "maria.lopez@campo.es", password: "password123" },
            { nombre: "Pedro Rodríguez Torres", email: "pedro.rodriguez@granja.es", password: "password123" },
            { nombre: "Ana Fernández Ruiz", email: "ana.fernandez@rural.es", password: "password123" },
            { nombre: "Carlos Jiménez Morales", email: "carlos.jimenez@cultivos.es", password: "password123" },
            { nombre: "Laura Martín González", email: "laura.martin@parcelas.es", password: "password123" },
            { nombre: "Miguel Torres Herrera", email: "miguel.torres@tierra.es", password: "password123" }
        ]
    });

    // Obtener datos para relaciones
    const municipios = await prisma.municipio.findMany();
    const usuarios = await prisma.usuario.findMany();
    const cultivos = await prisma.cultivo.findMany();

    // 5. y 6. PARCELAS y RECINTOS
    console.log('Creando parcelas...');
    
    // Distribución de parcelas y recintos por usuario
    const parcelasConfig = [
        // Murcia - Juan
        { usuarioId: usuarios[0].id, municipioId: municipios[0].id, 
            polygon: [[[-0.8806018230047528, 37.653204045402106], [-0.8754692418392551, 37.655245495581696], [-0.8784948478544834, 37.65893329991606], [-0.8838121500224361, 37.664985864204326], [-0.8885724036249769, 37.66246520488045], [-0.8840301769772054, 37.656807701719515], [-0.8830323546421539, 37.65633095568492], [-0.8806018230047528, 37.653204045402106]]], 
            recintos: [[[[-0.8883200016600199, 37.66240405046976], [-0.8865219572811895, 37.66018718528049], [-0.8819775360491917, 37.66263065570665], [-0.8838290717207826, 37.66483745316381], [-0.8883200016600199, 37.66240405046976]]], [[[-0.886273005922618, 37.66000489567783], [-0.883959172929849, 37.65699891456971], [-0.8792820496415175, 37.659394517150545], [-0.8818250576647131, 37.66232954952697], [-0.886273005922618, 37.66000489567783]]], [[[-0.8796424103059621, 37.65375744337817], [-0.875830230971701, 37.65531068819466], [-0.8789461877443898, 37.65897653361493], [-0.8825892343204202, 37.657228635696725], [-0.8796424103059621, 37.65375744337817]]]] },
        { usuarioId: usuarios[0].id, municipioId: municipios[0].id, 
            polygon: [[[-0.8814258428035942, 37.67805999559866], [-0.879780050887149, 37.67365537914219], [-0.880599645327095, 37.670186325065686], [-0.8694889752338497, 37.670672881502625], [-0.8704847616448035, 37.68221659346513], [-0.8814258428035942, 37.67805999559866]]], 
            recintos: [[[[-0.8810751336856129, 37.67794456969261], [-0.8794319843548806, 37.67371043712379], [-0.8801621013980423, 37.670514670238205], [-0.8751606448782354, 37.670553728892315], [-0.874633919798697, 37.67656418021498], [-0.8760791389017015, 37.67980148315333], [-0.8810751336856129, 37.67794456969261]]], [[[-0.8755467441481244, 37.67990549933813], [-0.8742272591269398, 37.67652934716321], [-0.8747689747237075, 37.670760151852704], [-0.8696961304286503, 37.670860053446134], [-0.8706784861611823, 37.6819114614008], [-0.8755467441481244, 37.67990549933813]]]] },
        { usuarioId: usuarios[0].id, municipioId: municipios[0].id, 
            polygon: [[[-0.8668807363727922, 37.6602808541999], [-0.853402300871835, 37.667064985687446], [-0.8483175960294602, 37.67029380848945], [-0.847371286993905, 37.67169769401913], [-0.8546421364636103, 37.682881605300565], [-0.8575984337208808, 37.68026111952956], [-0.8625057621118799, 37.678342230672655], [-0.8616193791292801, 37.67188463251746], [-0.8634521362760665, 37.669170654955394], [-0.8668807363727922, 37.6602808541999]]], 
            recintos: [[[[-0.8621510597770055, 37.67820183344034], [-0.8612055339783353, 37.67211861149519], [-0.848554044443091, 37.6704809877928], [-0.8479035518641922, 37.67165086606434], [-0.8546422854871025, 37.68246032731746], [-0.8573619708487001, 37.67988676139895], [-0.8621510597770055, 37.67820183344034]]], [[[-0.8663487933962131, 37.660795586726834], [-0.8490862352593354, 37.67015341462307], [-0.8612647027096898, 37.67160387701546], [-0.8663487933962131, 37.660795586726834]]]] }, // Juan - 3 parcelas
        { usuarioId: usuarios[1].id, municipioId: municipios[1].id, 
            polygon: [[[-1.67065564721878, 37.682598356857056], [-1.6716229474820636, 37.68383850566235], [-1.6719228105635864, 37.68394567804225], [-1.6744281182431848, 37.68293518944776], [-1.6741476011674195, 37.68253711440342], [-1.6730448788676995, 37.682598356857056], [-1.6716809854980568, 37.68229214408396], [-1.67065564721878, 37.682598356857056]]], 
            recintos: [[[[-1.6743410612198488, 37.68291987890872], [-1.6740992361543476, 37.682598356857056], [-1.6727063237760262, 37.682644288664164], [-1.6731512818968213, 37.68336388325997], [-1.6743410612198488, 37.68291987890872]]], [[[-1.6730061868574921, 37.68340981459309], [-1.672348422678624, 37.68249883784431], [-1.6716713124951639, 37.68233042074972], [-1.6707427042434233, 37.68262132276416], [-1.6716906584996138, 37.68379257459469], [-1.671913137560665, 37.68387678153013], [-1.6730061868574921, 37.68340981459309]]]] }, // María - 1 parcelas
        { usuarioId: usuarios[2].id, municipioId: municipios[2].id, 
            polygon: [[[-1.1902594566886648, 38.01059005878375], [-1.186575186344868, 38.00607723069186], [-1.1850950428008957, 38.00712940364747], [-1.18478936098154, 38.0081688849923], [-1.1817486313097447, 38.00901820637006], [-1.1834701026053267, 38.01184498127438], [-1.1865912748620246, 38.013175936197285], [-1.1902594566886648, 38.01059005878375]]], 
            recintos: [[[[-1.190140938528998, 38.010569758849186], [-1.186571433954498, 38.00622207317798], [-1.1852153339635834, 38.0071432145497], [-1.1892368718687578, 38.01120838022379], [-1.190140938528998, 38.010569758849186]]], [[[-1.1889095373879286, 38.011368034698165], [-1.1853244454567857, 38.00764676694027], [-1.184872412127163, 38.00827313216021], [-1.1820043385820327, 38.00915740336055], [-1.1865402592423209, 38.01305052609371], [-1.1889095373879286, 38.011368034698165]]]] }, //Pedro - 1 parcela
        //Alicante
        { usuarioId: usuarios[3].id, municipioId: municipios[5].id, 
            polygon: [[[-0.7100944229430297, 38.22583754816654], [-0.7095752356031255, 38.22462963877712], [-0.706280392869445, 38.2243786421017], [-0.7056613618103711, 38.22886507706522], [-0.7084370172040337, 38.22902194041367], [-0.7100944229430297, 38.22583754816654]]], 
            recintos: [[[[-0.7083368832209942, 38.22892309374075], [-0.7091825969592946, 38.22720813416822], [-0.7059964196182307, 38.22708453191612], [-0.705799742004757, 38.22876859453527], [-0.7083368832209942, 38.22892309374075]]], [[[-0.7091825969592946, 38.22706908161996], [-0.7098906363684421, 38.22586394840005], [-0.7094579456190218, 38.22478240158762], [-0.7064094426071108, 38.224473385259415], [-0.7061144261868719, 38.22693002880584], [-0.7091825969592946, 38.22706908161996]]]] }, // Ana - 2 parcelas
        { usuarioId: usuarios[3].id, municipioId: municipios[5].id, 
            polygon: [[[-0.7042400792017531, 38.226942686754654], [-0.7031493874424655, 38.22684436418709], [-0.7032030280209369, 38.226338703167386], [-0.7025593410815247, 38.22631061078519], [-0.7021659768413429, 38.23053839221373], [-0.7037751941898591, 38.23067884585069], [-0.7042400792017531, 38.226942686754654]]], 
            recintos: [[[[-0.7037268754099557, 38.2306306271372], [-0.7041479863254665, 38.22700074681126], [-0.7031919507344071, 38.2269113386061], [-0.7026228819296989, 38.230514402249355], [-0.7037268754099557, 38.2306306271372]]], [[[-0.7030667555972059, 38.22643747328328], [-0.7026228819296989, 38.22637488706667], [-0.7022359151425235, 38.23049652148106], [-0.7025432122972575, 38.230541223393914], [-0.7030667555972059, 38.22643747328328]]]] }, // Ana - 2 parcelas
        { usuarioId: usuarios[4].id, municipioId: municipios[7].id, 
            polygon: [[[-0.9448457878605723, 38.07237696029591], [-0.9435298307269306, 38.070314336009375], [-0.9401035999923977, 38.07142498708282], [-0.9401510218707472, 38.07242362533091], [-0.9407675062938381, 38.073496912918955], [-0.9426999478505422, 38.072703614915554], [-0.9448457878605723, 38.07237696029591]]], 
            recintos: [[[[-0.9444308464224207, 38.07188230909412], [-0.9435061197877701, 38.070407668681355], [-0.9421071743666403, 38.070827664231444], [-0.9425221158056161, 38.07199430588591], [-0.9430911783495901, 38.07218096682368], [-0.9444308464224207, 38.07188230909412]]], [[[-0.944739088633952, 38.07233962824614], [-0.9444782683007418, 38.0719849728263], [-0.9430081900621019, 38.072302296177924], [-0.9425576822139874, 38.072143634673864], [-0.9404236976731681, 38.072703614915554], [-0.9408030727029484, 38.07339425130891], [-0.9426999478505422, 38.07261961815294], [-0.944739088633952, 38.07233962824614]]]] }, // Carlos - 1 parcelas
        //Almería
        { usuarioId: usuarios[5].id, municipioId: municipios[8].id, 
            polygon: [[[-2.3675085868161716, 36.89022680630727], [-2.3524292238769817, 36.88965552777705], [-2.352587954012847, 36.89875315919615], [-2.3633551482528787, 36.899155122545636], [-2.368222872429129, 36.89295618916596], [-2.3675085868161716, 36.89022680630727]]], 
            recintos: [[[[-2.363196418116047, 36.899007031031545], [-2.365736100295976, 36.89515655080284], [-2.3529847793539886, 36.8946276235081], [-2.3527202291271863, 36.89864737901564], [-2.363196418116047, 36.899007031031545]]], [[[-2.3662819912880195, 36.89318008782516], [-2.367398313023841, 36.89032312190952], [-2.3526405396758605, 36.889787428896014], [-2.3528861304574207, 36.89271583814045], [-2.3662819912880195, 36.89318008782516]]]] }, // Laura - 1 parcela
        { usuarioId: usuarios[6].id, municipioId: municipios[10].id, 
            polygon: [[[-2.6465708696510433, 36.7961858134387], [-2.638371361222937, 36.79025081921063], [-2.629908000114824, 36.78237782836858], [-2.6231789785560977, 36.78570403776301], [-2.6316427661272996, 36.79458676281527], [-2.6391069569140484, 36.79976377520177], [-2.6465708696510433, 36.7961858134387]]], 
            recintos: [[[[-2.645992706700298, 36.79614374468942], [-2.639475178413363, 36.79134530673137], [-2.63358772447134, 36.79530229455544], [-2.63921208693597, 36.79946914027664], [-2.645992706700298, 36.79614374468942]]], [[[-2.6388444067694365, 36.791134836287696], [-2.633692993739288, 36.78646191074753], [-2.62806811136457, 36.7899562187267], [-2.632956936681495, 36.79475510567917], [-2.6388444067694365, 36.791134836287696]]], [[[-2.6333250160457737, 36.786209300956926], [-2.629908001371689, 36.78271467420362], [-2.623704689624134, 36.78578824460561], [-2.627700119845855, 36.78957733240421], [-2.6333250160457737, 36.786209300956926]]]] },  // Miguel - 2 parcelas
        { usuarioId: usuarios[6].id, municipioId: municipios[10].id, 
            polygon: [[[-2.6267140595857654, 36.79792418394955], [-2.626166027179977, 36.796328390479914], [-2.6236251496624163, 36.79247840188283], [-2.619240890417018, 36.795131523559164], [-2.621632304550644, 36.79802391993748], [-2.62210560526529, 36.79961967808339], [-2.6267140595857654, 36.79792418394955]]], 
            recintos: [[[[-2.625792368720994, 36.79606907090077], [-2.623575328534997, 36.792737733617315], [-2.6195647277477576, 36.79519136734953], [-2.621856499625693, 36.797944131158104], [-2.625792368720994, 36.79606907090077]]]] }  // Miguel - 2 parcelas
    ];

    for (const config of parcelasConfig) {
        console.log(`Creando parcela para usuario ${config.usuarioId}`);

        const geojson = {
            "type": "Polygon",
            "coordinates": config.polygon
        };

        await prisma.$executeRaw`
            INSERT INTO "Parcela" ("usuarioId", "municipioId", "geom")
            VALUES (${config.usuarioId}, ${config.municipioId}, ST_GeomFromGeoJSON(${JSON.stringify(geojson)}))
        `;

        // Obtener la parcela recién creada
        const parcela = await prisma.parcela.findFirst({
            where: {
                usuarioId: config.usuarioId,
                municipioId: config.municipioId
            },
            orderBy: {
                id: 'desc'
            }
        });

        if (!parcela) {
            console.error('Error al crear la parcela');
            continue;
        }

        // Crear recintos asociados a la parcela
        for (const recintoCoords of config.recintos) {

            const cultivoAleatorio = cultivos[Math.floor(Math.random() * cultivos.length)];
            // Fechas de siembra y cosecha realistas
            const fechaSiembra = new Date(`2025-05-15`); // Enero a Junio
            const fechaCosecha = new Date(fechaSiembra);
            fechaCosecha.setMonth(fechaCosecha.getMonth() + 6); // 6 meses después

                  console.log(`Creando recinto en parcela ${parcela.id} con cultivo ${cultivoAleatorio.nombre}`);

            const recintoGeojson = {
                "type": "Polygon",
                "coordinates": recintoCoords
            };

            await prisma.$executeRaw`
                INSERT INTO "Recinto" ("cultivoId", "parcelaId", "fechaSiembra", "fechaCosecha", "geom")
                VALUES (${cultivoAleatorio.id}, ${parcela.id}, ${fechaSiembra}, ${fechaCosecha}, ST_GeomFromGeoJSON(${JSON.stringify(recintoGeojson)}))
            `;
        }

    }

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


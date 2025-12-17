
export interface Territorio {
    id: number,
    nombre: string,
};

export interface Cultivo extends Territorio{};

export interface Parcela {
    id: number,
    municipio: Territorio,
    provincia: Territorio,
    coordenadas: string,
    recintos?: Recinto[],
};

export interface Recinto {
    id: number,
    cultivo: Cultivo,
    fechaSiembra: Date,
    fechaCosecha: Date,
    coordenadas: string,
}
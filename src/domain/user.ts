
export interface Usuario {
    id:number,
    nombre:string,
    email:string,
    password?:string
}

export interface UsuarioDetalleSimple extends Usuario {
  parcelasCount: number;
  provincias: string[];
}
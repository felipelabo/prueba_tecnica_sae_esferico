import { Parcela } from "./maps";

export interface Usuario {
    id:number,
    nombre:string,
    email:string,
    password?:string
}

export interface UsuarioDetalleSimple extends Usuario {
  parcelasCount: number;
  recintosCount: number;
  provincias: string[];
}

export interface UsuarioConParcelas extends UsuarioDetalleSimple {
  parcelas: Parcela[];
}
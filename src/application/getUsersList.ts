import { getUsers } from "@/infrastructure/user.repository";
import type { UsuarioDetalleSimple } from "@/domain/user";

export const getUsersList = async ():Promise<UsuarioDetalleSimple[]> => {
  try{
    const users = await getUsers();

    if (!users) {
      throw new Error("No se pudieron obtener los usuarios");
    }
    
    return users;
  }catch(error){
    console.error('Error al obtener la lista de usuarios:', error);
    throw error;
  }
}
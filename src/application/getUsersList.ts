import { getUsers } from "@/infrastructure/user.repository";
import type { UsuarioDetalleSimple } from "@/domain/user";

export const getUsersList = async ():Promise<UsuarioDetalleSimple[]> => {
  const users = await getUsers();

  if (!users) {
    throw new Error("No se pudieron obtener los usuarios");
  }
  
  return users;
}
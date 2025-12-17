import { getUsers } from "@/infrastructure/user.repository";
import type { UsuarioDetalleSimple } from "@/domain/user";

export const listUsers = async ():Promise<UsuarioDetalleSimple[]> => {
  const users = await getUsers();
  return users;
}
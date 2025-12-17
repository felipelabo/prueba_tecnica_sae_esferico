import { getUserById } from "@/infrastructure/user.repository";
import { getParcels } from "@/infrastructure/maps.repository";
import type { UsuarioConParcelas } from "@/domain/user";

export const getUserWithMapsData = async (userId: number):Promise<UsuarioConParcelas> => {
    const user = await getUserById(userId);
    const parcels = await getParcels(userId);

    return {
        ...user,
        parcelas: parcels
    } as UsuarioConParcelas;
}
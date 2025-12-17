import {prisma} from '../../prisma/prisma_client';
import type {UsuarioDetalleSimple} from '@/domain/user';

export const getUsers = async (): Promise<UsuarioDetalleSimple[]> => {
  
    const users = await prisma.usuario.findMany({
        select: {
        id: true,
        nombre: true,
        email: true,
        parcelas: {
            select: {
            id: true,
            municipio: {
                select: {
                provincia: {
                    select: {
                    nombre: true
                    }
                }
                }
            }
            }
        }
        },
        orderBy: { nombre: 'asc' }
    });

  console.log('Usuarios obtenidos con detalles:', users);

  // Transformación de datos
    return users.map(user => ({
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        parcelasCount: user.parcelas.length,
        // Deduplicar provincias
        provincias: [...new Set(
        user.parcelas.map(p => p.municipio.provincia.nombre)
        )]
    }));
};
import {prisma} from '../../prisma/prisma_client';
import type {UsuarioDetalleSimple} from '@/domain/user';

export const getUsers = async (): Promise<UsuarioDetalleSimple[]> => {
  
    try{
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
                },
                recintos: {
                    select: {
                    id: true
                    }
                }
                }
            }
            },
            orderBy: { nombre: 'asc' }
        });

    // Transformación de datos
        return users.map(user => ({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            parcelasCount: user.parcelas.length,
            recintosCount: user.parcelas.reduce((total, parcela) => total + (parcela.recintos?.length || 0), 0),
            provincias: [...new Set(
            user.parcelas.map(p => p.municipio.provincia.nombre)
            )]
        }));
    }catch(error){
        console.error('Error al obtener la lista de usuarios:', error);
        throw error;
    }
};

export const getUserById = async (id: number): Promise<UsuarioDetalleSimple | null> => {

    const userId = Number(id); //asegurando id como number

    try{
        const user = await prisma.usuario.findUnique({
            where: { id:userId },
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
                },
                recintos: {
                    select: {
                    id: true
                    }
                }
                }
            }
            }
        });

        if (!user) return null;

        //Transformación de datos
        return {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            parcelasCount: user.parcelas.length,
            recintosCount: user.parcelas.reduce((total, parcela) => total + (parcela.recintos?.length || 0), 0),
            provincias: [...new Set(
            user.parcelas.map(p => p.municipio.provincia.nombre)
            )]
        };
    }catch(error){
        console.error('Error al obtener el usuario por ID:', error);
        throw error;
    }
    
};
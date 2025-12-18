"use client";
import type { UsuarioDetalleSimple } from '@/domain/user';
import { ArrowRight, LandPlot, Sprout } from 'lucide-react';
import { redirect } from 'next/navigation';

const UserCard = ({ id, nombre, email, parcelasCount, recintosCount, provincias }: UsuarioDetalleSimple) => {
  return (
    <div 
      onClick={() => redirect(`/user/${id}`)} 
      className="z-50 flex flex-col cursor-pointer rounded-lg border border-primary-light hover:border-primary-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/*<User size={22} className="text-primary-dark" />*/}
          <h3 className="text-xl font-semibold text-primary-dark group-hover:text-primary">{nombre}</h3>
        </div>
        <ArrowRight size={20} className="text-muted group-hover:text-primary transition-colors" />
      </div>

      <div className="flex items-center gap-2 mt-1">
        <p className="text-sm text-muted">{email}</p>
      </div>

      <div className="flex-1 grid grid-cols-2 justify-between gap-2 mt-8">
        <div className='flex items-end gap-2'>
          <LandPlot size={18} className="text-primary-dark" />
          <span className="text-md text-primary-dark">{parcelasCount}</span>
          <Sprout size={18} className="text-primary-dark" />
          <span className="text-md text-muted">{recintosCount}</span>
        </div>
        <div className="flex items-end flex-wrap gap-1 justify-end">
          {provincias.length > 0 && provincias.length <= 5 && provincias.map((provincia, index) => (
            <span 
              key={index}
              className="h-fit text-muted text-sm px-2 py-1 bg-primary-light rounded-2xl"
            >
              {provincia}
            </span>
          ))}
          {provincias.length > 5 && 
            <span 
              className="h-fit text-muted text-sm px-2 py-1 bg-primary-light rounded-2xl"
            >
              +5 Provincias
            </span>
          }
        </div>
        
      </div>

    </div>
  );
};

export default UserCard;
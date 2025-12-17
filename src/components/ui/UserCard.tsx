"use client";
import type { UsuarioDetalleSimple } from '@/domain/user';
import { User, Mail, ArrowRight, LandPlot } from 'lucide-react';
import { redirect } from 'next/navigation';

const UserCard = ({ id, nombre, email, parcelasCount, provincias }: UsuarioDetalleSimple) => {
  return (
    <div 
      onClick={() => redirect(`/user/${id}`)} 
      className="z-50 cursor-pointer rounded-lg border border-primary-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow group"
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

      <div className="flex justify-between gap-2 mt-8">
        <div className='flex items-center gap-2'>
          <LandPlot size={16} className="text-primary-dark" />
          <span className="text-sm text-primary-dark">{parcelasCount}</span>
        </div>
        <div>
          {provincias.map((provincia, index) => (
            <span 
              key={index}
              className="inline-block bg-primary-light text-primary-dark text-xs px-2 py-1 rounded-2xl mr-1"
            >
              {provincia}
            </span>
          ))}
        </div>
        
      </div>

    </div>
  );
};

export default UserCard;
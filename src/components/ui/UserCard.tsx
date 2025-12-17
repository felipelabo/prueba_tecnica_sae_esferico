"use client";
import type { Usuario } from '@/domain/user';
import { User, Mail, ArrowRight } from 'lucide-react';
import { redirect } from 'next/navigation';

const UserCard = ({ id, nombre, email }: Usuario) => {
  return (
    <div 
      onClick={() => redirect(`/user/${id}`)} 
      className="cursor-pointer rounded-lg border border-primary-light bg-white p-4 shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <User size={22} className="text-primary-dark" />
          <h3 className="text-xl font-semibold text-primary-dark">{nombre}</h3>
        </div>
        <ArrowRight size={20} className="text-muted group-hover:text-primary transition-colors" />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Mail size={14} className="text-muted" />
        <p className="text-sm text-muted">{email}</p>
      </div>
    </div>
  );
};

export default UserCard;
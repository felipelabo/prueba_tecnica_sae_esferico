import type { UsuarioDetalleSimple } from "@/domain/user";
import UserCard from "@/components/ui/UserCard";
import { listUsers } from "@/application/listUsers";

const UsersPage = async () => {
  
  const usuarios:UsuarioDetalleSimple[] = await listUsers();

  return (
    <main className="p-4 h-svh relative overflow-hidden">
      <h1 className="mb-4 text-3xl font-bold text-primary-dark">
        Clientes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {usuarios.map(user => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
      <div id="circle-bg" className="z-2 opacity-20 absolute bottom-0 right-0 text-xs text-muted bg-primary-dark w-[50svh] h-[50svh] rounded-full translate-x-1/2 translate-y-1/2"></div>
      <div id="circle-bg" className="z-1 opacity-20 absolute bottom-0 right-0 text-xs text-muted bg-primary w-svh h-svh rounded-full translate-x-1/2 translate-y-1/2"></div>
    </main>
  );
};

export default UsersPage;
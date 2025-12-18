import type { UsuarioDetalleSimple } from "@/domain/user";
import UserCard from "@/components/ui/UserCard";
import { getUsersList } from "@/application/getUsersList";

const UsersPage = async () => {
  
  const usuarios:UsuarioDetalleSimple[] = await getUsersList();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {usuarios.map(user => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </>
  );
};

export default UsersPage;
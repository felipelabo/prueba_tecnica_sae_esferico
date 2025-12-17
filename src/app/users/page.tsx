import type { Usuario } from "@/domain/user";
import UserCard from "@/components/ui/UserCard";

const usuarios: Usuario[] = [
  { id: 1, nombre: "Juan Pérez", email: "juan@test.com" },
  { id: 2, nombre: "María Gómez", email: "maria@test.com" }
]

const UsersPage = () => {

  return <main className="p-4">
    <h1 className="mb-4 text-3xl font-bold text-primary-dark">
      Usuarios
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {usuarios.map(user=><UserCard key={user.id} {...user} />)}
    </div>
  </main>
}

export default UsersPage;
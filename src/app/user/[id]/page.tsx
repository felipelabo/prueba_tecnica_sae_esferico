import Link from "next/link";
import {getUserWithMapsData} from "@/application/getUserWithMapsData";

const UserIdPage = async({ params }: { params: { id: number } }) => {

    const { id } = await params;
    const user = await getUserWithMapsData(id);

    return (
        <main className="p-4 h-svh relative overflow-hidden">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary-dark">{user?.nombre}</h1>
                <Link 
                    href="/users" 
                    className="text-sm text-bg bg-primary-dark hover:bg-primary hover:no-underline p-2 rounded"
                >
                    Volver
                </Link>
            </div>

            <div className="grid grid-cols-6">
                <section className="col-span-2 flex flex-col gap-4">
                    <div className=" bg-white p-4 rounded-lg shadow-md border border-primary-light">
                        <h2 className="text-xl font-semibold text-primary-dark mb-4">Detalles del Usuario</h2>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Número de Parcelas:</strong> {user?.parcelasCount}</p>
                        <div className="mt-2 flex items-baseline">
                            <strong className="mr-2">Provincias:</strong>
                            <div className="mt-1">
                                {user?.provincias.map((provincia, index) => (
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

                    <div className=" bg-white p-4 rounded-lg shadow-md border border-primary-light">
                        <h2 className="text-xl font-semibold text-primary-dark mb-4">Parcelas</h2>
                        {user?.parcelas && user.parcelas.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {user.parcelas.map((parcela) => (
                                    <li key={parcela.id}>
                                        ID: {parcela.id} - Provincia: {parcela.provincia.nombre} - Municipio: {parcela.municipio.nombre}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted">No hay parcelas asociadas a este usuario.</p>
                        )}
                    </div>
                    
                </section>
                <section className="col-span-4 ml-4 bg-white p-4 rounded-lg shadow-md border border-primary-light">
                    <h2 className="text-xl font-semibold text-primary-dark mb-4">Ubicación de Parcelas</h2>
                    <p className="text-muted">No hay datos de mapa disponibles.</p>
                </section>
            </div>
        
        </main>
    );
};

export default UserIdPage;
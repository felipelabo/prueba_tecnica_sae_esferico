import Link from "next/link";
import {getUserWithMapsData} from "@/application/getUserWithMapsData";
import DynamicMap from "@/components/ui/DynamicMap";
import { ArrowLeft, Mail, LandPlot } from 'lucide-react';
import FieldCard from "@/components/ui/FieldCard";

const UserIdPage = async({ params }: { params: { id: number } }) => {

    const { id } = await params;
    const user = await getUserWithMapsData(id);

    return (
        <main className="p-4 min-h-svh relative flex flex-col">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary-dark">{user?.nombre}</h1>
                <Link 
                    href="/users" 
                    className="flex gap-2 items-center text-sm text-bg bg-primary-dark hover:bg-primary hover:no-underline p-2 rounded"
                >
                    <ArrowLeft size={18}/>Volver
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 lg:grid-cols-12 flex-1 h-full gap-4">
                {/* Detalles del Usuario y Parcelas */}
                <section className="sm:col-span-6 md:col-span-5 lg:col-span-3 flex flex-col gap-4">

                    <div className=" bg-white p-4 rounded-lg shadow-md border border-primary-light">
                        <h2 className="text-xl font-semibold text-primary-dark mb-4">Detalles del Usuario</h2>
                        <p className="flex gap-1 items-center text-muted"><Mail size={18}/> {user?.email}</p>
                        <p className="flex gap-1 items-center text-muted"><LandPlot size={18}/> {user?.parcelasCount}</p>
                    </div>

                    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md border border-primary-light">
                        <h2 className="text-xl font-semibold text-primary-dark mb-4">Parcelas</h2>
                        <div className="flex-1" >
                                {user?.parcelas && user.parcelas.length > 0 ? (
                                    <div className="flex flex-col gap-4">
                                        {user.parcelas.map((parcela) => (
                                            <FieldCard key={parcela.id} {...parcela} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">No hay parcelas asociadas a este usuario.</p>
                                )}
                        </div>
                    </div>
                    
                </section>

                {/* Mapa de Parcelas del Usuario */}
                <section className="sm:col-span-6 md:col-span-7 lg:col-span-9 min-h-[50svh] bg-white p-4 rounded-lg shadow-md border border-primary-light flex flex-col">
                    <h2 className="text-xl font-semibold text-primary-dark mb-4">Ubicación de Parcelas</h2>
                    {user?.parcelas && user.parcelas.length > 0 ? (
                        <DynamicMap parcelas={user.parcelas} />
                    ) : (
                        <p className="text-muted">No hay datos de mapa disponibles.</p>
                    )}
                </section>
            </div>
        
        </main>
    );
};

export default UserIdPage;
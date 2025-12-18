"use client";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="p-4">
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-800 mb-2">
          Error cargando usuarios
        </h2>
        <p className="text-red-600 mb-4">
          {error.message || "Ocurrió un error inesperado"}
        </p>
        {/*<button
          onClick={reset}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>*/}
        <Link
          href="/users"
          className=" bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Volver a la lista de clientes
        </Link>
      </div>
    </main>
  );
}
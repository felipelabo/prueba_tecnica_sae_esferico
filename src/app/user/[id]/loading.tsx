export default function Loading() {
  return (
    <main className="p-4 h-svh relative overflow-hidden flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-24 h-9 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-6 flex-1">
        <section className="col-span-2 flex flex-col gap-4">
          {/* Skeleton para detalles del usuario */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-primary-light">
            <div className="w-40 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-28 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="mt-2">
                <div className="w-20 h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="flex gap-1">
                  <div className="w-16 h-6 bg-gray-200 rounded-2xl animate-pulse"></div>
                  <div className="w-20 h-6 bg-gray-200 rounded-2xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton para parcelas */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-primary-light">
            <div className="w-16 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 gap-2 rounded-lg border border-primary-light bg-white p-4 shadow-sm animate-pulse"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-12 h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div>
                      <div className="w-24 h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                      <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 p-2 border border-primary-light rounded-lg">
                      <div className="w-20 h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                      <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="col-span-4 ml-4 bg-white p-4 rounded-lg shadow-md border border-primary-light flex flex-col">
          <div className="w-44 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
          {/* Skeleton para el mapa */}
          <div className="flex-1 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Cargando mapa...</div>
          </div>
        </section>
      </div>
    </main>
  );
}

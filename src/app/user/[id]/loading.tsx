export default function Loading() {
  return (
    <main className="p-4 min-h-svh relative flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-24 h-9 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 lg:grid-cols-12 flex-1 h-full gap-4">
        <section className="sm:col-span-6 md:col-span-5 lg:col-span-3 flex flex-col gap-4">
          {/* Skeleton para detalles del usuario */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-primary-light">
            <div className="w-40 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2 mt-2">
                <div className="flex gap-2">
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton para parcelas */}
          <div className="flex flex-col bg-white p-4 rounded-lg shadow-md border border-primary-light">
            <div className="w-16 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="flex-1 max-h-svh overflow-scroll">
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
          </div>
        </section>

        <section className="sm:col-span-6 md:col-span-7 lg:col-span-9 min-h-[50svh] bg-white p-4 rounded-lg shadow-md border border-primary-light flex flex-col">
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

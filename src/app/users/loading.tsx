export default function Loading() {
  return (
    <main className="p-4">
      <h1 className="mb-4 text-3xl font-bold text-primary-dark">Clientes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-primary-light bg-white p-4 shadow-sm animate-pulse"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="w-32 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-40 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
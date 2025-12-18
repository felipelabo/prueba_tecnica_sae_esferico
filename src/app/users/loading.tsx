export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="z-50 flex flex-col cursor-pointer rounded-lg border border-primary-light bg-white p-4 shadow-sm animate-pulse"
        >
          {/* Header con nombre y flecha */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-32 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-40 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Sección inferior con contadores y provincias */}
          <div className="flex-1 grid grid-cols-2 justify-between gap-2 mt-8">
            <div className="flex items-end gap-2">
              {/* Iconos de LandPlot y Sprout con sus contadores */}
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-3 h-5 bg-gray-200 rounded"></div>
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-3 h-5 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-end flex-wrap gap-1 justify-end">
              {/* Provincias pills */}
              <div className="w-16 h-6 bg-gray-200 rounded-2xl"></div>
              <div className="w-20 h-6 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
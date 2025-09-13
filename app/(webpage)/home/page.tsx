// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Bienvenido a MARPROFUNDO
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Tu tienda especializada en equipos de pesca y acuarofilia
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Ver Productos
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Conócenos
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Categorías */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nuestras Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card Cañas */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl text-blue-600 mb-4">🎣</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cañas</h3>
              <p className="text-gray-600">Cañas profesionales para todo tipo de pesca</p>
            </div>

            {/* Card Señuelos */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl text-blue-600 mb-4">🐟</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Señuelos</h3>
              <p className="text-gray-600">Señuelos artificiales de alta calidad</p>
            </div>

            {/* Card Acuarofilia */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl text-blue-600 mb-4">🐠</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mi Pecera</h3>
              <p className="text-gray-600">Todo para tu acuario y peces ornamentales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Destacados */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Producto 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-blue-200 flex items-center justify-center">
                <span className="text-6xl">🎣</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Caña Profesional</h3>
                <p className="text-blue-600 font-bold">$120.000</p>
              </div>
            </div>

            {/* Producto 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-green-200 flex items-center justify-center">
                <span className="text-6xl">🐟</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Kit Señuelos</h3>
                <p className="text-blue-600 font-bold">$85.000</p>
              </div>
            </div>

            {/* Producto 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-yellow-200 flex items-center justify-center">
                <span className="text-6xl">🐠</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Acuario 50L</h3>
                <p className="text-blue-600 font-bold">$250.000</p>
              </div>
            </div>

            {/* Producto 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-red-200 flex items-center justify-center">
                <span className="text-6xl">🦐</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Alimento Premium</h3>
                <p className="text-blue-600 font-bold">$45.000</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default function LandingWelcome() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Bienvenido a MAR ABIERTO</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tu tienda especializada en pesca y acuarios. Descubre productos de calidad 
            y todo lo que necesitas para tu pasión acuática.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/login"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Iniciar Sesión
            </a>
            <a
              href="/register"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Registrarse
            </a>
          </div>
        </div>
      </section>

      {/* Sección Informativa */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ¿Por qué elegir MAR ABIERTO?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Rápido</h3>
              <p className="text-gray-600">Entregamos en todo el país en 24-48 horas</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">Productos de las mejores marcas del mercado</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte Expertos</h3>
              <p className="text-gray-600">Asesoramiento de profesionales en pesca y acuarios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Muestra mínima de productos (sin precios completos) */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nuestros Productos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Solo muestra productos sin funcionalidad */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-blue-200 flex items-center justify-center">
                <span className="text-6xl">🎣</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800">Equipo de Pesca</h3>
                <p className="text-gray-600">Cañas, carretes y accesorios</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-green-200 flex items-center justify-center">
                <span className="text-6xl">🐟</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800">Acuarios</h3>
                <p className="text-gray-600">Peceras y equipos completos</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-yellow-200 flex items-center justify-center">
                <span className="text-6xl">🦐</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800">Alimentos</h3>
                <p className="text-gray-600">Nutrición especializada</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-red-200 flex items-center justify-center">
                <span className="text-6xl">🔧</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800">Accesorios</h3>
                <p className="text-gray-600">Todo lo que necesitas</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              ⚠️ Inicia sesión para ver precios y realizar compras
            </p>
            <a
              href="/login"
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Iniciar Sesión para Comprar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
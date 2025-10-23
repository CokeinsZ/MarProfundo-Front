export default function Aqualog() {
  const peces = [
    { nombre: "Trucha Arcoíris", emoji: "🐟", lugar: "Río Claro" },
    { nombre: "Pez Ángel", emoji: "🐠", lugar: "Acuario" },
    { nombre: "Bagre", emoji: "🐡", lugar: "Lago Grande" },
    { nombre: "Carpa Koi", emoji: "🎏", lugar: "Estanque" },
    { nombre: "Tilapia", emoji: "🐟", lugar: "Laguna Verde" },
    { nombre: "Guppy", emoji: "🐠", lugar: "Pecera de casa" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
          🐟 Mi Aqualog
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {peces.map((pez, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform border-4 border-blue-300"
            >
              <div className="h-40 flex items-center justify-center bg-gradient-to-tr from-blue-200 to-blue-400">
                <span className="text-7xl">{pez.emoji}</span>
              </div>
              <div className="p-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">{pez.nombre}</h2>
                <p className="text-gray-600">📍 {pez.lugar}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

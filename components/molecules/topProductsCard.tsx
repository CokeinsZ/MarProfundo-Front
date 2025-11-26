import { TopProduct } from '@/interfaces/admin';
import Image from 'next/image';

interface TopProductsCardProps {
  products: TopProduct[];
}

export default function TopProductsCard({ products }: TopProductsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Productos Más Vendidos</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={product.product_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                {product.img && (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.total_sold} ventas</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">${product.total_revenue.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import ManualsList from '@/components/organisms/manualsList';

export default function ManualsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manuales</h1>
        <p className="text-gray-600 mt-2">Gestiona los manuales y guías</p>
      </div>
      
      <ManualsList />
    </div>
  );
}

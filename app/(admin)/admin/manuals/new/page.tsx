import ManualFormComponent from '@/components/organisms/manualForm';

export default function NewManualPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Manual</h1>
        <p className="text-gray-600 mt-2">Crea un nuevo manual con bloques de contenido</p>
      </div>
      
      <ManualFormComponent />
    </div>
  );
}

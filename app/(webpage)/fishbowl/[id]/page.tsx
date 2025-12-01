import FishDetails from "@/components/molecules/FishDetails";

interface PageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  // Si params viene como Promise (algunas versiones/uso de use()), soportamos ambos:
  const resolved = await params;
  const { id } = resolved;

  return (
    <>
      <FishDetails id={id} />
    </>
  );
}

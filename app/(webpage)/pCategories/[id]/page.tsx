import CategoryProducts from "@/components/molecules/categoryProducts";

interface PageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const { id } = resolved;

  return (
    <>
      <CategoryProducts category={id} />
    </>
  );
}

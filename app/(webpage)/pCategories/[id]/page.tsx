import CategoryProducts from "@/components/molecules/categoryProducts";

interface PageProps {
  params: { category: string } | Promise<{ category: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const { category } = resolved;

  return (
    <>
      <CategoryProducts category={category} />
    </>
  );
}

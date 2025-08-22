import { notFound } from "next/navigation";

// Generate static params for the product detail pages
export async function generateStaticParams() {
  // Define the product IDs that should be statically generated
  const productIds = ['1', '2', '3', '4', '5', '6', '7']; // Updated to match our data
  
  return productIds.map((id) => ({
    productId: id,
  }));
}

// This is a server component that will handle the static generation
export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ productId: string }>;
}) {
  // Await the params object
  const { productId } = await params;
  
  // Validate that the productId is one of our known products
  const validIds = ['1', '2', '3', '4', '5', '6', '7'];
  
  if (!validIds.includes(productId)) {
    notFound();
  }

  return <>{children}</>;
}

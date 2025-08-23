// This layout handles dynamic product pages
// No generateStaticParams needed - all routes are dynamic
export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

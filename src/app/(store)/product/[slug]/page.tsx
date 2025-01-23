interface param {
  slug: string;
}
const productPage = async ({ params }: { params: Promise<param> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return <div></div>;
};

export default productPage;

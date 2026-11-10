import ProductCard from './ProductCard';

export default function ProductGrid({
  products,
  title = 'NEW ARRIVALS',
  onAddToCart,
  searchTerm = '',
  saleOnly = false,
}) {
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return matchesSearch && (!saleOnly || Boolean(product.discount));
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </section>
  );
}

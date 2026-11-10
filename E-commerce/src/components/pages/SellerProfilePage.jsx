import { Link } from 'react-router-dom';
import ProductGrid from '../ProductGrid';

export default function SellerProfilePage({ seller, products, onAddToCart, searchTerm }) {
  if (!seller) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-gray-950">Seller not found</h1>
        <p className="mt-3 text-gray-600">This seller profile may no longer be available.</p>
        <Link to="/" className="mt-6 inline-block font-semibold text-indigo-600 hover:text-indigo-700">
          Back to the store
        </Link>
      </section>
    );
  }

  const sellerProducts = products.filter((product) => product.createdBy === seller.email);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
          Seller profile
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
          {seller.name}
        </h1>
        <p className="mt-2 text-gray-600">
          {sellerProducts.length
            ? `${sellerProducts.length} product${sellerProducts.length === 1 ? '' : 's'} available`
            : 'No products listed yet.'}
        </p>
      </section>
      {sellerProducts.length > 0 && (
        <ProductGrid
          title={`Products by ${seller.name}`}
          products={sellerProducts}
          onAddToCart={onAddToCart}
          searchTerm={searchTerm}
        />
      )}
    </>
  );
}

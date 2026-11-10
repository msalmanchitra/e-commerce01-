import { Link } from 'react-router-dom';

export default function CartPage({ cart, onRemove }) {
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
        Your cart
      </h1>

      {cart.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-gray-50 px-6 py-12 text-center">
          <p className="text-lg font-semibold text-gray-900">Your cart is empty</p>
          <p className="mt-2 text-gray-600">Find something you like and add it to your cart.</p>
          <Link
            to="/new-arrivals"
            className="mt-6 inline-flex rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-600"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-200 px-5">
            {cart.map((product, index) => (
              <li key={`${product.id}-${index}`} className="flex items-center gap-4 py-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 rounded-xl bg-gray-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold text-gray-950">{product.name}</h2>
                  <p className="mt-1 text-gray-600">${product.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                  aria-label={`Remove ${product.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl bg-gray-50 p-6">
            <h2 className="text-lg font-bold text-gray-950">Order summary</h2>
            <div className="mt-5 flex justify-between border-t border-gray-200 pt-4 text-gray-700">
              <span>Total</span>
              <span className="font-bold text-gray-950">${total.toFixed(2)}</span>
            </div>
            <p className="mt-4 text-sm text-gray-500">Checkout will be available soon.</p>
          </aside>
        </div>
      )}
    </section>
  );
}

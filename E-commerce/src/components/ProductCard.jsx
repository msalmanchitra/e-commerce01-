import { Star, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product, onAddToCart = () => {} }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onAddToCart(product)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onAddToCart(product);
        }
      }}
      className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div>
        {/* Product Image Box */}
        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          {product.discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
              {product.discount}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 my-1.5 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
          ))}
          <span className="ml-1 text-xs font-medium text-gray-500">({product.rating.toFixed(1)})</span>
        </div>
      </div>

      {/* Price and Add to Cart Button */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
        <div>
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through ml-2">${product.oldPrice}</span>
          )}
        </div>
        <button
          onClick={(event) => {
            event.stopPropagation();
            onAddToCart(product);
          }}
          aria-label={`Add ${product.name} to cart`}
          className="flex items-center justify-center rounded-xl bg-gray-900 p-2.5 text-white shadow-sm transition-all hover:bg-indigo-600 active:scale-90"
        >
          <ShoppingBag size={18} />
        </button>
      </div>
    </div>
  );
}
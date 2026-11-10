import { ShoppingCart, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar({
  cartCount,
  searchTerm,
  onSearch,
  sellers = [],
  sellerSearchError = '',
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchQuery = searchTerm.trim().toLowerCase();
  const matchingSellers = sellers
    .filter((seller) =>
      `${seller.name} ${seller.email}`.toLowerCase().includes(searchQuery),
    )
    .slice(0, 8);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo - Text based like Shop.Co, but cleaner */}
        <Link to="/" className="flex items-center gap-3">
          <span className="text-3xl font-extrabold tracking-tighter text-gray-950">
            SHOP.<span className="text-indigo-600">CO</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/new-arrivals" className="hover:text-indigo-600 transition-colors">New Arrivals</Link>
          <Link to="/sale" className="font-semibold text-red-600 hover:text-red-700 transition-colors">On Sale</Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link>
        </div>

        {/* Search Bar (Desktop only) */}
        <div className="relative hidden md:flex flex-1 max-w-sm mx-8">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search products or sellers..."
              aria-label="Search products or sellers"
              value={searchTerm}
              onFocus={() => setSearchOpen(true)}
              onChange={(event) => {
                onSearch(event.target.value);
                setSearchOpen(true);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
            />
          </div>
          {searchOpen && searchTerm.trim() && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white py-2 shadow-xl">
              <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                Sellers
              </p>
              {sellerSearchError ? (
                <p role="status" className="px-4 py-3 text-sm text-red-600">
                  {sellerSearchError}
                </p>
              ) : matchingSellers.length ? (
                matchingSellers.map((seller) => (
                  <Link
                    key={seller.id}
                    to={`/sellers/${seller.id}`}
                    onClick={() => {
                      setSearchOpen(false);
                      onSearch('');
                    }}
                    className="block px-4 py-3 text-sm text-gray-800 transition-colors hover:bg-indigo-50"
                  >
                    <span className="block font-semibold">{seller.name}</span>
                    <span className="text-xs text-gray-500">View seller and products</span>
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-gray-500">
                  No matching sellers. Search the account name or email.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Icons (Cart, Profile, Mobile Menu) */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 transition-colors">
            <ShoppingCart size={24} />
            {/* Professional developers dynamic cart count badge */}
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {cartCount}
            </span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 active:scale-90 md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="grid gap-3 border-t border-gray-100 bg-white px-4 py-4 text-sm font-medium text-gray-700 animate-[slideIn_.2s_ease-out] md:hidden">
          <label className="relative mb-2 block">
            <span className="sr-only">Search products or sellers</span>
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search products or sellers..."
              value={searchTerm}
              onFocus={() => setSearchOpen(true)}
              onChange={(event) => {
                onSearch(event.target.value);
                setSearchOpen(true);
              }}
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>
          {searchOpen && searchQuery && (
            <div className="mb-2 rounded-xl border border-gray-200 bg-white py-2">
              <p className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                Seller accounts
              </p>
              {sellerSearchError ? (
                <p role="status" className="px-4 py-2 text-sm text-red-600">
                  {sellerSearchError}
                </p>
              ) : matchingSellers.length ? (
                matchingSellers.map((seller) => (
                  <Link
                    key={seller.id}
                    to={`/sellers/${seller.id}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setSearchOpen(false);
                      onSearch('');
                    }}
                    className="block px-4 py-2 text-sm hover:bg-indigo-50"
                  >
                    {seller.name}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2 text-sm text-gray-500">No matching seller accounts.</p>
              )}
            </div>
          )}
          <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/new-arrivals">New Arrivals</Link>
          <Link onClick={() => setMenuOpen(false)} to="/sale">On Sale</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about">About Us</Link>
          <Link onClick={() => setMenuOpen(false)} to="/cart">Cart ({cartCount})</Link>
        </div>
      )}
    </nav>
  );
}
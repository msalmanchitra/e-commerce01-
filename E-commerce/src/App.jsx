import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import AdminDashboardPage from './components/pages/AdminDashboardPage';
import AdminLoginPage from './components/pages/AdminmLoginPage';
import CreateAccountPage from './components/pages/CreateAccountPage';
import SellerProfilePage from './components/pages/SellerProfilePage';
import AboutPage from './components/pages/AboutPage';
import CartPage from './components/pages/CartPage';
import defaultProducts from './components/data/products';
import { getPublicSellers } from './components/data/accounts';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';

function loadSellerDirectory() {
  try {
    return { sellers: getPublicSellers(), error: '' };
  } catch (error) {
    console.error('Unable to load seller directory:', error);
    return {
      sellers: [],
      error: 'Seller search is temporarily unavailable because account data could not be loaded.',
    };
  }
}

function loadProducts() {
  try {
    const savedProducts = localStorage.getItem('shopco-products');
    if (!savedProducts) return defaultProducts;

    const parsedProducts = JSON.parse(savedProducts);
    const isValidProduct = (product) =>
      product &&
      typeof product.id === 'number' &&
      typeof product.name === 'string' &&
      Number.isFinite(product.price) &&
      (product.oldPrice === null || Number.isFinite(product.oldPrice)) &&
      (product.discount === null || typeof product.discount === 'string') &&
      Number.isFinite(product.rating) &&
      typeof product.image === 'string' &&
      (product.createdBy === undefined || typeof product.createdBy === 'string');

    if (!Array.isArray(parsedProducts) || !parsedProducts.every(isValidProduct)) {
      throw new Error('Saved product data has an invalid format.');
    }

    return parsedProducts;
  } catch (error) {
    console.error('Unable to load saved products:', error);
    return defaultProducts;
  }
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(loadProducts);
  const [sellerDirectory, setSellerDirectory] = useState(loadSellerDirectory);
  const [currentAccount, setCurrentAccount] = useState(() => {
    try {
      const savedAccount = sessionStorage.getItem('shopco-session');
      return savedAccount ? JSON.parse(savedAccount) : null;
    } catch (error) {
      console.error('Unable to load current account:', error);
      return null;
    }
  });

  useEffect(() => {
    const refreshSellerDirectory = (event) => {
      if (event && event.key !== 'shopco-accounts') return;
      setSellerDirectory(loadSellerDirectory());
    };

    window.addEventListener('storage', refreshSellerDirectory);
    return () => window.removeEventListener('storage', refreshSellerDirectory);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('shopco-products', JSON.stringify(products));
    } catch (error) {
      console.error('Unable to save products:', error);
    }
  }, [products]);

  const addToCart = (product) => {
    setCart((items) => [...items, product]);
  };

  const createProduct = (product) => {
    setProducts((items) => [
      {
        ...product,
        id: Math.max(0, ...items.map((item) => Number(item.id) || 0)) + 1,
      },
      ...items,
    ]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((items) =>
      items.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product,
      ),
    );
  };

  const authenticate = (account) => {
    try {
      sessionStorage.setItem('shopco-session', JSON.stringify(account));
      setCurrentAccount(account);
      setSellerDirectory((directory) => ({
        ...directory,
        sellers: [
          account,
          ...directory.sellers.filter((seller) => seller.id !== account.id),
        ],
      }));
    } catch (error) {
      console.error('Unable to save current account:', error);
      throw new Error(
        'Unable to start your session. Please check browser storage.',
        { cause: error },
      );
    }
  };

  const signOut = () => {
    sessionStorage.removeItem('shopco-session');
    setCurrentAccount(null);
  };

  const deleteProduct = (productId) => {
    setProducts((items) => items.filter((product) => product.id !== productId));
  };

  const removeFromCart = (itemIndex) => {
    setCart((items) => items.filter((_, index) => index !== itemIndex));
  };

  const search = (value) => {
    setSearchTerm(value);
    setSellerDirectory(loadSellerDirectory());
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar
          cartCount={cart.length}
          searchTerm={searchTerm}
          onSearch={search}
          sellers={sellerDirectory.sellers}
          sellerSearchError={sellerDirectory.error}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <CategorySection />
                  <ProductGrid products={products} onAddToCart={addToCart} searchTerm={searchTerm} />
                </>
              }
            />
            <Route
              path="/new-arrivals"
              element={<ProductGrid products={products} onAddToCart={addToCart} searchTerm={searchTerm} />}
            />
            <Route
              path="/sale"
              element={
                <ProductGrid
                  title="ON SALE"
                  products={products}
                  onAddToCart={addToCart}
                  searchTerm={searchTerm}
                  saleOnly
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/sellers/:sellerId"
              element={
                <SellerProfileRoute
                  sellers={sellerDirectory.sellers}
                  products={products}
                  onAddToCart={addToCart}
                  searchTerm={searchTerm}
                />
              }
            />
            <Route
              path="/cart"
              element={<CartPage cart={cart} onRemove={removeFromCart} />}
            />
            <Route
              path="/admin-login"
              element={<AdminLoginPage onAuthenticated={authenticate} />}
            />
            <Route
              path="/create-account"
              element={<CreateAccountPage onAuthenticated={authenticate} />}
            />
            <Route
              path="/admin"
              element={
                currentAccount ? (
                  <AdminDashboardPage
                    products={products}
                    account={currentAccount}
                    onSignOut={signOut}
                    onCreateProduct={createProduct}
                    onUpdateProduct={updateProduct}
                    onDeleteProduct={deleteProduct}
                  />
                ) : (
                  <Navigate to="/admin-login" replace />
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function SellerProfileRoute({ sellers, products, onAddToCart, searchTerm }) {
  const { sellerId } = useParams();
  const seller = sellers.find((item) => item.id === sellerId);

  return (
    <SellerProfilePage
      seller={seller}
      products={products}
      onAddToCart={onAddToCart}
      searchTerm={searchTerm}
    />
  );
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-gray-950">Page not found</h1>
      <p className="mt-4 text-gray-600">The page you are looking for does not exist.</p>
    </section>
  );
}

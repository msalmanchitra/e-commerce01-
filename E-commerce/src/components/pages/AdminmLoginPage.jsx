import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateAccount } from '../data/accounts';

export default function AdminLoginPage({ onAuthenticated }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);

    try {
      const account = await authenticateAccount({
        email: formData.get('email'),
        password: formData.get('password'),
      });
      onAuthenticated(account);
      navigate('/admin');
    } catch (loginError) {
      console.error('Unable to sign in:', loginError);
      setError(
        loginError instanceof Error
          ? loginError.message
          : 'Unable to sign in. Please try again.',
      );
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Shop.co</p>
        <h1 className="mt-2 text-3xl font-extrabold text-gray-950">Seller sign in</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to manage your store products.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gray-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-600"
          >
            Sign in
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <p className="mt-5 text-center text-sm text-gray-600">
          New to Shop.co?{' '}
          <Link to="/create-account" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Create an account
          </Link>
        </p>
        <p className="mt-4 text-xs leading-5 text-gray-500">
          Demo accounts are stored in this browser only.
        </p>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAccount } from '../data/accounts';

export default function CreateAccountPage({ onAuthenticated }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirmPassword') ?? '');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    try {
      const account = await registerAccount({ name, email, password });
      onAuthenticated({ id: account.id, name: account.name, email: account.email });
      navigate('/admin');
    } catch (accountError) {
      console.error('Unable to create account:', accountError);
      setError(
        accountError instanceof Error
          ? accountError.message
          : 'Unable to create your account. Please try again.',
      );
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Shop.co</p>
        <h1 className="mt-2 text-3xl font-extrabold text-gray-950">Create seller account</h1>
        <p className="mt-2 text-sm text-gray-600">Set up your account to manage products.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Full name
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </label>

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
            <label htmlFor="create-password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="create-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="new-password"
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

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <div className="relative mt-2">
              <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                aria-pressed={showConfirmPassword}
                className="absolute inset-y-0 right-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gray-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-600"
          >
            Create account
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/admin-login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

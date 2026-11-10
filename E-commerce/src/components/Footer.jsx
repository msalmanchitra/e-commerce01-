export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 pt-16 pb-8 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-gray-200">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-3xl font-black tracking-tighter text-gray-900">SHOP.CO</h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              We have clothes that suit your style and which you’re proud to wear. From women to men.
            </p>
            <div className="flex gap-3 pt-2">
              {['X', 'f', '◎', '⌘'].map((social) => (
                <span key={social} className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-800 transition-colors hover:bg-black hover:text-white">
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">COMPANY</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-900">About</a></li>
              <li><a href="#" className="hover:text-gray-900">Features</a></li>
              <li><a href="#" className="hover:text-gray-900">Works</a></li>
              <li><a href="#" className="hover:text-gray-900">Career</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">HELP</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-900">Customer Support</a></li>
              <li><a href="#" className="hover:text-gray-900">Delivery Details</a></li>
              <li><a href="#" className="hover:text-gray-900">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">FAQ</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-900">Account</a></li>
              <li><a href="#" className="hover:text-gray-900">Manage Deliveries</a></li>
              <li><a href="#" className="hover:text-gray-900">Orders</a></li>
              <li><a href="#" className="hover:text-gray-900">Payments</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>Shop.co © 2000-2026, All Rights Reserved</p>
          <div className="flex gap-2 font-medium text-gray-700">
            <span>Visa</span> • <span>MasterCard</span> • <span>PayPal</span> • <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
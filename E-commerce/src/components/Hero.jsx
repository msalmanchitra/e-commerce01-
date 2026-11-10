import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/hero.png';

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="overflow-hidden bg-gradient-to-r from-gray-50 to-indigo-50/30 py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text and CTA */}
        <div className="space-y-8 text-center md:text-left">
          <span className="inline-flex items-center bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-inner">
            Summer Essentials 2026
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-950 tracking-tighter leading-[0.95] md:leading-[1]">
            Elevate Your <span className="text-indigo-600">Style.</span><br />
            Redefine Your <span className="text-indigo-600">Comfort.</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-lg mx-auto md:mx-0">
            Discover our curated collection of minimalist designs, crafted with precision for those who appreciate understated luxury.
          </p>
          <div className="flex justify-center md:justify-start">
            <button onClick={scrollToProducts} className="group flex items-center gap-3 rounded-full bg-gray-950 px-10 py-4 font-semibold text-white shadow-xl transition-all duration-200 hover:-translate-y-1 hover:bg-indigo-600 hover:shadow-indigo-200 active:scale-95">
              Shop Now 
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Side: Professional Designer Image Placeholder */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative aspect-square w-full max-w-md animate-[float_5s_ease-in-out_infinite] overflow-hidden rounded-[3rem] border-8 border-white bg-gradient-to-tr from-indigo-200 to-purple-200 p-6 shadow-2xl flex items-center justify-center">
            <div className="absolute inset-0 bg-white/20 blur-xl scale-125"></div>
            <img src={heroImage} alt="ShopCo collection" className="relative h-3/4 w-3/4 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110" />
            
            {/* Added a design element like Shop.Co dots */}
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-500/20 rounded-full"></div>
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-500/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
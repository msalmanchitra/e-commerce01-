export default function CategorySection() {
  const categories = [
    { title: 'Casual', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60' },
    { title: 'Formal', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60' },
    { title: 'Party', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&auto=format&fit=crop&q=60' },
    { title: 'Gym', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gray-100 rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 relative rounded-2xl overflow-hidden h-64 group cursor-pointer">
            <img src={categories[0].image} alt="Casual" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-start p-6">
              <span className="text-2xl font-bold text-white">{categories[0].title}</span>
            </div>
          </div>

          <div className="md:col-span-2 relative rounded-2xl overflow-hidden h-64 group cursor-pointer">
            <img src={categories[1].image} alt="Formal" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-start p-6">
              <span className="text-2xl font-bold text-white">{categories[1].title}</span>
            </div>
          </div>

          <div className="md:col-span-2 relative rounded-2xl overflow-hidden h-64 group cursor-pointer">
            <img src={categories[2].image} alt="Party" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-start p-6">
              <span className="text-2xl font-bold text-white">{categories[2].title}</span>
            </div>
          </div>

          <div className="md:col-span-1 relative rounded-2xl overflow-hidden h-64 group cursor-pointer">
            <img src={categories[3].image} alt="Gym" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-start p-6">
              <span className="text-2xl font-bold text-white">{categories[3].title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
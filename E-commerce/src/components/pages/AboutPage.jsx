export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">About Shop.co</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
        Style that feels like you.
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
        We bring together everyday essentials and thoughtful designs to make
        getting dressed feel simple. Explore versatile pieces made for your
        personal style, from casual days to special occasions.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          ['Thoughtful selection', 'Versatile pieces chosen to work together.'],
          ['Everyday comfort', 'Easy-to-wear styles for wherever the day takes you.'],
          ['Your own style', 'A collection that leaves room for you to make it yours.'],
        ].map(([title, description]) => (
          <article key={title} className="rounded-2xl bg-gray-50 p-6">
            <h2 className="font-bold text-gray-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

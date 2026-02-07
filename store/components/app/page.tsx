import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma'; // Assumindo instância configurada

export default async function Home() {
  // Buscar dados reais do DB (Server Component)
  const products = await prisma.product.findMany({ 
    where: { featured: true },
    take: 8 
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section Animada */}
      <section className="relative h-[500px] bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white">
        <div className="text-center z-10">
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight">Sua Beleza, Nossa Ciência.</h1>
          <p className="text-xl mb-8">Descubra cosméticos feitos para brilhar.</p>
          <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:shadow-xl transition">
            Ver Ofertas
          </button>
        </div>
        {/* Adicione um carrossel de imagens aqui */}
      </section>

      {/* Vitrine de Destaques */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-pink-500 pl-4">
          Destaques da Semana
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

'use client';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 group"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.stock < 5 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Últimas unidades
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-pink-600">
            R$ {product.price.toFixed(2)}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addItem(product)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Adicionar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

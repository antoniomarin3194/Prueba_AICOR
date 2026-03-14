import React from 'react';
import {useState} from 'react';

export function Article({ id, name, price, description,stock, image_url, addCart }) {
  const [controlStock, setControlStock] = useState(stock);

    const handleAddCart = () => {
        if (controlStock > 0) {
            setControlStock(prev => prev - 1); // Reducimos stock localmente
        }
         addCart({ id, name, price, image_url });
    };

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      <div className="w-full h-40 sm:h-48 bg-gray-50 flex items-center justify-center">
        <img
          src={image_url}
          alt={name}
          className="h-full w-full object-contain p-4"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h2 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2">
          {name}
        </h2>
        <p className="text-base sm:text-lg font-bold text-gray-900">{price}€</p>
        <p className="text-xs text-gray-600 line-clamp-2 flex-grow">{description}</p>
        <p className="text-sm text-gray-500">Stock: {controlStock}</p>
        {controlStock === 0 && (
          <p className="text-sm text-red-500 font-semibold">El stock puede ser insuficiente</p>
        )}
        <button
          className="mt-auto w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition-colors cursor-pointer"
          onClick={handleAddCart}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
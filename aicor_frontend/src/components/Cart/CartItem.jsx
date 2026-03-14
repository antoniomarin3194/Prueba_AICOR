
export function CartItem({ id, productId, name, price, quantity, image, onRemove }) {
    return (
        <div key={`cart-${id}`}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4">
                
                <div className="w-full sm:w-32 h-40 sm:h-32 bg-gray-50 flex items-center justify-center rounded-md flex-shrink-0">
                    {image ? (
                        <img src={image} alt={name} className="max-w-full max-h-full object-contain p-2" />
                    ) : (
                        <span className="text-gray-400">Sin imagen</span>
                    )}
                </div>
                
                
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{name}</h3>
                    <p className="text-green-600 font-semibold mb-2">En stock</p>
                    <p className="text-sm text-gray-600 mb-3">
                        Cantidad: <span className="font-semibold">{quantity ?? 1}</span>
                    </p>
                    <div className="flex gap-3">
                        <button 
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline" 
                        onClick={() => onRemove({ id, productId })}>
                            Eliminar
                        </button>
                        <span className="text-gray-300">|</span>
                        <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Guardar para más tarde
                        </button>
                    </div>
                </div>
                
               
                <div className="text-left sm:text-right">
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                        {(price * (quantity ?? 1)).toFixed(2)}€
                    </p>
                </div>
            </div>
        </div>
    );


}
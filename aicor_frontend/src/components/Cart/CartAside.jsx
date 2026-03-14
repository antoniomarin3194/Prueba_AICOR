export function CartAside({ numProducts, subtotal }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm lg:sticky lg:top-32">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen del pedido</h2>
            
            <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({numProducts} productos):</span>
                    <span className="font-semibold text-gray-900">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío:</span>
                    <span className="font-semibold text-green-600">GRATIS</span>
                </div>
            </div>
            
            <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total:</span>
                <span className="text-red-600">{subtotal.toFixed(2)}€</span>
            </div>
            
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition-colors mb-3 cursor-pointer" onClick={() => window.location.href = '/checkout'}>
                Tramitar pedido
            </button>
            
            <p className="text-xs text-gray-500 text-center">
                Al realizar el pedido, aceptas nuestras condiciones de uso
            </p>
        </div>

    );
}
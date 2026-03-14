export default function BuyAside({ carrito, onCheckout, loading = false, error = null, buttonText = 'Tramitar Pedido' }) {

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500 lg:sticky lg:top-32">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h3>
            <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                    <span>Productos:</span>
                    <span className="font-semibold">{carrito.reduce((sum, item) => sum + (item.quantity ?? 1), 0)}</span>
                </div>
                <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Subtotal:</span>
                        <span className="text-blue-600">
                            {carrito.reduce((sum, item) => sum + ((item.price ?? 0) * (item.quantity ?? 1)), 0).toFixed(2)}€
                        </span>
                    </div>
                </div>
            </div>

            
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            
            <button
                onClick={onCheckout}
                disabled={loading}
                className={`w-full mt-4 font-bold py-4 rounded-lg transition-all shadow-md cursor-pointer ${
                    loading
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white hover:shadow-lg'
                }`}
            >
                {loading ? 'Procesando...' : buttonText}
            </button>
        </div>
    )
}

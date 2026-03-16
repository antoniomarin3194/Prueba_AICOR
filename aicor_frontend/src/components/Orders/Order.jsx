import { useNavigate } from 'react-router-dom';

const STATUS_LABELS = {
    pending: 'Pendiente',
    shipped: 'Enviada',
    completed: 'Completada',
    cancelled: 'Cancelada',
};

export function Order({ order }) {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/order-details/${order.id}`);
    };

    return ( 
    <div key={order.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="p-6">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">Orden #{order.id}</h3>
            </div>
            
            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estado:</span>
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-sm font-semibold text-gray-700">
                        {STATUS_LABELS[order.status] || order.status || 'Pendiente'}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="font-semibold text-gray-900">
                        {new Date(order.created_at).toLocaleDateString('es-ES')}
                    </span>
                </div>
                
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Productos:</span>
                    <span className="font-semibold text-gray-900">
                        {order.items?.length || 0}
                    </span>
                </div>
                
                <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-gray-600 font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                        {order.total_price.toFixed(2)}€
                    </span>
                </div>
            </div>

            <button 
                onClick={handleViewDetails}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
            >
                Ver detalles
            </button>
        </div>
    </div>
    )
}
export default function BuyItem({  item }) {
    return (
        <div 
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow border-l-4 border-blue-500"
        >
            
            <div className="flex-shrink-0">
                <img 
                    src={item.image_url || item.image} 
                    alt={item.name} 
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-gray-200"
                />
            </div>
            
            
            <div className="flex-grow">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.name}</h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-600">
                    <span className="flex items-center gap-2">
                        <span className="font-medium">Cantidad:</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                            {item.quantity ?? 1}
                        </span>
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="font-medium">Unitario:</span>
                        <span>{(item.price ?? 0).toFixed(2)}€</span>
                    </span>
                </div>
            </div>
            
            
            <div className="text-right flex-shrink-0">
                <p className="text-sm text-gray-500 mb-1">Total</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">
                    {((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}€
                </p>
            </div>

            
        </div>

                            
        
    );
}
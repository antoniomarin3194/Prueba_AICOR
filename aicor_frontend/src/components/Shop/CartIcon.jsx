import carritoImg from '../../assets/images/carrito.svg';

export function CartIcon({ itemsCount }) {
    return (
        <div className="relative inline-block">
            <button className="text-white hover:text-blue-200 transition-colors font-medium cursor-pointer" onClick={() => window.location.href = '/cart'}>
                <img src={carritoImg} alt="Carrito" className="w-10 h-7" />
                
            </button>
            {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {itemsCount}
                </span>
            )}

        </div>
    );
}

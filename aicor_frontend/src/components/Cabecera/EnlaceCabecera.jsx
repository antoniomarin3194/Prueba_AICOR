export function EnlaceCabecera({texto,url="#"}) {
    return (
        <a href={url} className="text-white hover:text-blue-200 transition-colors font-medium text-sm sm:text-base whitespace-nowrap">
            {texto}
          </a>
    );
}
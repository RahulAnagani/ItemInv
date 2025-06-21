const ItemCard = ({ item }) => {
        const api=import.meta.env.VITE_API_URL;
        return (
            <div className="bg-white transform hover:scale-105 transition-all duration-500 cursor-pointer dark:bg-gray-400 rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 overflow-hidden hover:shadow-md">
            <div className="aspect-w-16 aspect-h-12 bg-gray-100 dark:bg-gray-300">
                <img
                    src={`${api}/uploads/${item.coverImage}`}
                    alt={item.itemName}
                    className="w-full h-48 object-contain"
                    />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 truncate">
                    {item.itemName}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-300 font-medium mb-2">
                    {item.itemType}
                </p>
                {item.itemDescription && (
                    <p className="text-sm text-gray-600 dark:text-gray-200 line-clamp-2">
                        {item.itemDescription}
                    </p>
                )}
            </div>
        </div>
    )
};
export default ItemCard;
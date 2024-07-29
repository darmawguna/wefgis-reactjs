const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="py-2 px-4  border rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200 disabled:opacity-50"
            >
                &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            className={`px-4 py-2 border rounded-lg transition duration-200 ${ currentPage === pageNumber
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {pageNumber}
                        </button>
                    );
                }
                if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                    return (
                        <span key={pageNumber} className="flex items-center justify-center p-2 text-gray-700">
                            ...
                        </span>
                    );
                }
                return null;
            })}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="py-2 px-4 border rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200 disabled:opacity-50"
            >
                &gt;
            </button>
        </div>
    );
};

export default PaginationComponent;
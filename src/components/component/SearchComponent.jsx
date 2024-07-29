const SearchComponent = () => {
    return (
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <input
                type="text"
                placeholder="Search"
                className="outline-none flex-grow bg-transparent text-gray-600 placeholder-gray-400"
            />
            <button className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </div>
    );
};

export default SearchComponent;
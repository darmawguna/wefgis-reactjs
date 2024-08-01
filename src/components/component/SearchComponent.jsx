import { useRef } from 'react';

const SearchComponent = ({ onSearch, placeholder = 'Search', value = '' }) => {
    const inputRef = useRef(null);

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            onSearch(event.target.value);
            inputRef.current.value = '';
        }
    };

    const handleButtonClick = () => {
        if (inputRef.current) {
            onSearch(inputRef.current.value);
            inputRef.current.value = '';
        }
    };

    return (
        <div className="flex items-center border bg-white border-gray-300 rounded-lg p-2">
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                defaultValue={value}
                className="outline-none flex-grow  text-gray-600 placeholder-gray-400"
                onKeyDown={handleSearch}
            />
            <button className="text-gray-400" onClick={handleButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </div>
    );
};

export default SearchComponent;

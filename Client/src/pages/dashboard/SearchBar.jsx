import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        onSearch(searchTerm); // Call the onSearch function passed from the parent component
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onSearch(searchTerm); // Call the onSearch function on Enter key press
        }
    };

    return (
        <>
            {/* component */}
            <form method="GET">
                <div className="relative text-gray-600 focus-within:text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button
                            onClick={() => onSearch(searchTerm)}
                            type="submit"
                            className="p-1 focus:outline-none focus:shadow-outline"
                        >
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                            >
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </span>
                    <input
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        type="search"
                        name="q"
                        className="py-2 text-sm bg-gray-200 text-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                        placeholder="Search..."
                        autoComplete="off"
                    />
                </div>
            </form>
        </>


    );
};

export default SearchBar;

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

const SearchIcon = ({ onSearch , category}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query); // ✅ Call parent search function
    }
  };

  const clearSearch = () => {
    setQuery("");
    onSearch(""); // ✅ Reset search results when clearing
  };

  // ✅ Close search bar on "Escape" key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ✅ Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && searchRef.current && !searchRef.current.contains(event.target)) {
        setTimeout(() => setIsOpen(false), 100); // Delay prevents flickering
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative mx-4 search-container" ref={searchRef}>
      {/* Full-width search bar for larger screens */}
      <div
        className={`relative w-full max-w-lg border rounded-lg px-4 py-2 focus-within:ring focus-within:ring-blue-200 
          md:block transition-all duration-300 ${isOpen ? "block" : "hidden md:block"}`}
      >
        <input
          type="text"
          placeholder="Search for products"
          className="w-full outline-none pr-10 pl-3 py-0 md:p-0"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // ✅ Prevent default form submission
              handleSearch();
            }
          }}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
          {query ? (
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          ) : (
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={handleSearch}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Search icon for mobile screens */}
      {!isOpen && (
        <div className="md:hidden transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ Prevent immediate closing due to click outside effect
              setIsOpen(true);
            }}
            className="text-gray-400 hover:text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2"
            aria-label="Open search bar"
          >
            <Search size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchIcon;





/**
 //<div className="relative mx-4 md:block hidden">
<div className="relative w-full max-w-lg border rounded-lg px-4 py-2 focus-within:ring focus-within:ring-blue-200 md:block hidden">
<input
  type="text"
  placeholder="Search for products"
  className="w-full outline-none pr-10 pl-3 py-2 md:p-0" // Adding padding to the left and right
  value={query}
  onChange={handleInputChange}
  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
/>
<div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
  {query ? (
    <button className="text-gray-400 hover:text-gray-600" onClick={clearSearch}>
      <X size={20} />
    </button>
  ) : (
    <button className="text-gray-400 hover:text-gray-600" onClick={handleSearch}>
      <Search size={20} />
    </button>
  )}
</div>
</div>
*/





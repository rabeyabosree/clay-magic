import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from './SearchIcon';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productsSlice';

function SearchContainer() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Function to handle search
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    
    // Fetch products and store them in localStorage
    dispatch(fetchProducts({ title: searchQuery, category: '' })).then((action) => {
      if (action.payload) {
        localStorage.setItem('filteredProducts', JSON.stringify(action.payload));
        console.log('Stored filtered products:', action.payload);

        // ✅ Navigate to filtered products page
        navigate('/filtered-products');
      }
    });
  };

  return (
    <div>
      <SearchIcon onSearch={handleSearch} />
    </div>
  );
}

export default SearchContainer;














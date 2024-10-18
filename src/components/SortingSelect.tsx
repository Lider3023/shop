import React, { FC } from 'react';
import useStore from '../store/store';
import './SortingSelect.scss'

const SortingSelect:FC = () => {
  const { setSorting, fetchProducts, sortBy, order, currentPage } = useStore();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split('-');
    setSorting(sortBy, order);
    fetchProducts(currentPage, sortBy, order);
  };

  return (
    <div className="sorting-select">
      <label>Sort By: </label>
      <select id="sorting" value={`${sortBy}-${order}`} onChange={handleSortChange}>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="stock-asc">Stock (Low to High)</option>
        <option value="stock-desc">Stock (High to Low)</option>
      </select>
    </div>
  );
};

export default SortingSelect;

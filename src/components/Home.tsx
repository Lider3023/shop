import React, { FC, useState } from 'react';
import useStore, { Product } from '../store/store';
import ProductCard from './ProductCard';
import SortingSelect from './SortingSelect';
import ProductModal from './ProductModal';
import AddToCartNotification from './AddToCartNotification';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { cartIcon } from '../utils/img';
import {motion  } from "framer-motion";
const Home:FC = () => {
  const { products, fetchProducts, totalPages,  sortBy, order } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = () => {
    setIsNotificationVisible(true);
    setTimeout(() => setIsNotificationVisible(false), 2000);  
  };

  return (
    <div className="home-page">
      <h1>All Products</h1>
      <SortingSelect />
<Link to='/cart'><motion.img className='cartLogo' src={cartIcon} alt="" height={50} width={50}
animate={{rotate: 0}}
whileHover={{scale: 1.2, rotate: [0, 30,-30, 30,-30, 30,-30, 30,-30, 30,-30, 30,-30, 0 ] }}
transition={{
  duration: 0.2,
  rotate: {
    duration: 4,
    repeat: Infinity
  }
}}
/></Link>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            thumbnail={product.thumbnail}
            price={product.price}
            discountPercentage={product.discountPercentage}
            stock={product.stock}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        onPageChange={(selectedItem) => fetchProducts(selectedItem.selected + 1, sortBy, order)}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel="<"
        nextLabel=">"
      />

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <AddToCartNotification isVisible={isNotificationVisible} />
    </div>
  );
};

export default Home;

import React, { FC } from 'react';
import './ProductCard.scss'
interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
  stock: number;
  onClick: () => void;
}
const ProductCard:FC<ProductCardProps> = ({ title, description, thumbnail, price, discountPercentage, stock, onClick }) => {
 
 const discountedPrice = price - (price * discountPercentage / 100);

  return (
    <div className="product-card" onClick={onClick}>
      <img src={thumbnail} alt={title} height={300} width={300} className="thumbnail" />
      <div className="content">
      <h3>{title}</h3>
      {/* <p>{description}</p> */}
      <p className='price'>Price: {price}</p>
      <p className='discount'>Discounted Price: {discountedPrice.toFixed(2)}</p>
      <p className='stock'>Stock: {stock}</p>
      <button>View the product</button>
      </div>
    </div>
  );
};

export default ProductCard;

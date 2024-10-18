import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../store/store';
import { useCartStore } from '../store/cartStore'; 
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
import './ProductModal.scss';
import AddToCartNotification from './AddToCartNotification';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore(); 
  const [visible, setVisible] = useState(false);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  }; 

  const handleAddToCart = () => {
    setVisible(true);
    setQuantity(1)
    if (product) {
      addToCart({ ...product, quantity });
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  };

  if (!product) return null;

  return (
    <motion.div
      className="product-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <motion.div
        className="product-modal"
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'tween' }}
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '500px',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}  
      >
        <motion.button className="close" onClick={onClose}>
          <motion.div className="stick" 
            animate={{ y: isOpen ? 20 : 0, rotate: isOpen ? 45 : 0 }}
            transition={{ delay: 0.4, type: "tween" }}
          ></motion.div>
          <motion.div className="stick"
            animate={{ y: isOpen ? 20 : 0, rotate: isOpen ? -45 : 0 }}
            transition={{ delay: 0.4, type: "tween" }}
          ></motion.div>
        </motion.button>
        <AddToCartNotification isVisible={visible} />
        <div className="modal-content">
          {/* <Swiper
            navigation
            spaceBetween={10}
            slidesPerView={1}
            style={{ width: '100%' }}
          >
            <SwiperSlide>
              <img src={product.thumbnail} alt={product.title} style={{ width: '100%' }} />
            </SwiperSlide>
          </Swiper> */}
          <img src={product.thumbnail} alt="" /> 
          <div className="info">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p className='price'>Price: {product.price}</p>
            <p className='stock'>Stock: {product.stock}</p>
            <div className='amount-control' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button onClick={handleDecrement}>-</button>
              <span style={{ margin: '0 10px' }}>{quantity}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
            <button className='add-to-cart'
              onClick={handleAddToCart}
              style={{ marginTop: '20px', padding: '10px 20px', color: '#FFF', border: 'none' }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;

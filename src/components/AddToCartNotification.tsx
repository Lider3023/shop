
import React, { FC } from 'react';
import { motion } from 'framer-motion';
interface AddToCartNotificationProps {
  isVisible: boolean;
}

const AddToCartNotification:FC<AddToCartNotificationProps> = ({ isVisible }) => {
  return (
    <motion.div
      initial={{ x: '-100%', opacity: 0}}
      animate={{ x: isVisible ? 0 : '-100%', opacity: isVisible ? 1 : 0, backgroundColor: '#28a745',}}
      transition={{ duration: 0.5}}
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        padding: '10px 20px',
        color: '#FFF',
        borderRadius: '5px',
      }}
    >
      Product has been added to cart!
    </motion.div>
  );
};

export default AddToCartNotification;

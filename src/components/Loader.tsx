import React, { FC } from 'react';
import { motion } from 'framer-motion';
import './loader.scss';

const Loader:FC = () => {
  return (
    <motion.div
      className="loader"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: 'linear',
      }}
    >
      <div className="loader-circle"></div>
    </motion.div>
  );
};

export default Loader;

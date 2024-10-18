import React, { FC, useState } from 'react';
import { useCartStore, CartProduct } from '../store/cartStore';
import { motion, spring } from 'framer-motion';
import './cart.scss';
import { Link } from 'react-router-dom';
import { arrowIcon, rocketIcon } from '../utils/img';

const Cart: FC = () => {
  const { products, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const [showClearModal, setShowClearModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);


  return (
    <div className="cart-container">
      <motion.div
        className="cart-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h1>Your Cart</h1>
        <Link to='/'>
          <motion.img 
            src={arrowIcon} 
            height={50} 
            width={50} 
            alt="" 
            className="arrowIcon" 
            initial={{opacity: 0, }}
            animate={{ rotate: 225, opacity: 1, y: -100, x: 0}}
            whileTap={{ x: -10, }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        {products.length > 0 ? (
          products.map((product: CartProduct) => (
            <motion.div
              key={product.id}
              className="cart-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img src={product.thumbnail} alt={product.title} className="cart-item-thumbnail" />
              <div className="cart-item-info">
                <h3>{product.title}</h3>
                <p>Price: {product.price}</p>
                <p>{product.description}</p>
              </div>

              <div className="control_remove">
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
              </div>

              <motion.button
                className="remove-btn"
                onClick={() => removeFromCart(product.id)}
                whileHover={{scale: 1.1}}
                transition={{duration: 0.2}}
              >
                Remove
              </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        <motion.button className="clear-cart-btn" onClick={() => setShowClearModal(true)}
          
          
          whileHover={{scale: 1.2}}
          transition={{duration: 0.2}}>
          Clear Cart
        </motion.button>

        {showClearModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div className="modal">
              <h3>Are you sure you want to clear the cart?</h3>
              <button
                className="confirm-btn"
                onClick={() => {
                  clearCart();
                  setShowClearModal(false);
                }}
              >
                Yes
              </button>
              <button
                className="confirm-btn"
                onClick={() => setShowClearModal(false)}
              >
                No
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="cart-right"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        <button
          className="order-btn"
          onClick={() => setShowOrderModal(true)}
        >
          Place Order
        </button>

        {showOrderModal && products.length > 0 &&(
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div className="on_way"
            initial={{y: '100vh' , x:-160, opacity: 0 }}
            animate={{
              y:[0, -1000], x:[-160, 1000], 
              borderRadius:[10, 300],
              opacity: 1
            }}
            transition={{
              delay: 0.5,
              type:'tween',
              borderRadius:{
               delay: 2,
               duration: 1,
               type:'spring'
              },
              y:{
                delay: 4, 
                duration: 2,
                type: 'spring'
              },
              x:{
                delay: 4, 
                duration: 2,
                type: 'spring'
              }
            }}
            >
              <motion.h3
              initial={{opacity:1}}
              animate={{opacity: 0}}
              transition={{
                delay: 2
              }}
              >Your Order is on Way!!!</motion.h3>
              <motion.img src={rocketIcon} height={300} width={300} alt="" 
              initial={{ y: 0 , rotate: 0 }}
              animate={{rotate: 45}}
              transition={{
                delay:2.5,
                type:'spring',

              }}
              />
            </motion.div>
            <motion.div className="modal"
            initial={{
              scale: 0.1
          }}
            animate={{
              scale: 2
            }}
            transition={{duration: 0.2 , type: 'spring' , stiffness: 120}}
            
            >
              <motion.h2
              initial={{
                x: '-100vw', 
              }}
              animate={{x: 0, color: '#ffcc00'}}
              transition={{
                duration: 0.5, 
                type: 'spring',
              }}
              >Great!!!</motion.h2>
              <motion.h3
              initial={{
                x: '100vw', 
              }}
              animate={{x: 0, color: 'rgb(38, 190, 38)'}}
              transition={{
                delay: 1,
                duration: 0.5, 
                type: 'spring',
              }}
              >Your order has been placed!</motion.h3>
              <Link to='/'>
              <motion.button
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{
                delay: 4.5,
                duration: 0.5
              }}
                className="confirm-btn"
                onClick={()=>clearCart()}
              >
                Make Another Order
              </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
        {showOrderModal && products.length === 0 &&(
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={()=>setShowOrderModal(false)}
          >
            <motion.div className="modal"
            initial={{
              scale: 0.1
          }}
            animate={{
              scale: 1.4
            }}
            transition={{duration: 0.2 , type: 'spring' , stiffness: 120}}
            >
              <motion.h3
              animate={{color: 'red'}}
              >No products, the order can not proceed!</motion.h3>

            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;

import { useSelector, useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import Router from 'next/router'

import { cartActions } from "../../redux/cart-slice";
import { sendCartData } from "../../redux/cart-slice";

import classes from "./Cart.module.css";
import Modal from "../ui/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  // initialize useDispatch
  const dispatch = useDispatch();
  // state for showing checkout
  const [isCheckout, setIsCheckout] = useState(false);
  // state for submitting status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // state for submitting status
  const [didSubmit, setDidSubmit] = useState(false);
  // pass data that contains redux state, state.cart.items from redux/index.js
  const cart = useSelector((state) => state.cart);
  const cartContent = useSelector((state) => state.cart.items);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  const orderHandler = () => {
    setIsCheckout(true);
  };
  // function that will be pass to Checkout component
  // userData from Checkout component
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    // create object that will be save to database
    const orders = {
      items: cartContent,
      userId: cart.userId,
      totalAmount: cart.totalAmount,
      totalQuantity: cart.totalQuantity,
      name: userData.name,
      email: userData.email,
      contactNumber: userData.contactNumber,
      address: userData.address,
    };
    //fetch from internal api created from api folder
    await fetch("/api/add-order", {
      method: "POST",
      body: JSON.stringify(orders),
      headers: {
        "Content-type": "application/json",
      },
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    // clear cart in redux
    dispatch(cartActions.clearCart());
    // send to db the clearedCart data
    const clearedCart = { items: [], totalQuantity: 0, totalAmount: 0 };
    dispatch(sendCartData(clearedCart));

    // Router.push(data.response.hosted_url);
  };
  // modal content
  const cartModalContent = (
    <Fragment>
      <h2>Your Shopping Cart</h2>
      {cartContent.map((item) => (
        <CartItem
          key={item.id}
          item={{
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            total: item.totalPrice,
            price: item.price,
          }}
        />
      ))}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotalAmount}</span>
      </div>
      {isCheckout && cartContent.length != 0 && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && cartContent.length != 0 && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        </div>
      )}
    </Fragment>
  );
  const isSubmittingModalCotnent = <p>Sending Order...</p>;

  const didSubmittingModalCotnent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {/* when isSubmitting is false show cartModalContent*/}
      {!isSubmitting && !didSubmit && cartModalContent}
      {/* when isSubmitting is true show isSubmittingModalCotnent*/}
      {isSubmitting && isSubmittingModalCotnent}
      {!isSubmitting && didSubmit && didSubmittingModalCotnent}
    </Modal>
  );
};

export default Cart;

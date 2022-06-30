import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/cart-slice';

import classes from './CartItem.module.css';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price, id } = props.item;
  
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id))
  }

  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart({id, title, price}))
  }

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{title} (${parseFloat(price).toFixed(2)}/item)</h2>
        <div className={classes.summary}>
          <span className={classes.price}>${parseFloat(total).toFixed(2)}{' '}</span>
          <span className={classes.amount}>x {quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeItemHandler}>−</button>
        <button onClick={addItemHandler}>+</button>
      </div>
    </li>
  );
};


export default CartItem;

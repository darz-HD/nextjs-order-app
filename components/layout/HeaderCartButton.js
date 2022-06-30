import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useSelector } from 'react-redux';

const HeaderCartButton = (props) => { 
   // pass a value that contains redux state, state.cart.totalQuantity from redux/index.js
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <button className={classes.button} onClick={props.onClick} >
          <span className={classes.icon}>
            <CartIcon />
          </span>
          <span>Your Cart</span>
          <span className={classes.badge}>{cartQuantity}</span>
        </button>
      );

;}

export default HeaderCartButton;
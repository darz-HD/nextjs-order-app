import { uiActions } from "../../redux/ui-slice";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Layout.module.css";
import Header from "./Header";
import Cart from "../cart/Cart";


function Layout(props) {
  // initialize useDispatch
  const dispatch = useDispatch();
  // pass a function that contains redux state, state.ui.cartIsvisible from redux/index.js
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const toggleCartHandler = () => {
    // execute toggle in ui-slice reducers: toggle
    dispatch(uiActions.toggle());
  };

  return (
    <div>
      <Header onShowCart={toggleCartHandler} />
      <main className={classes.main}>{props.children}</main>
      {showCart && <Cart onClose={toggleCartHandler} />}
    </div>
  );
}

export default Layout;

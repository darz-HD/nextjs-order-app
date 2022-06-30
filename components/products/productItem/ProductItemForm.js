import { useDispatch } from "react-redux";

import { cartActions } from "../../../redux/cart-slice";
import classes from "./ProductItemForm.module.css";
// import Input from "../../ui/Input";

const ProductItemForm = (props) => {
  const { title, price, description, id } = props;
  // initialize useDispatch
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    // execute toggle in cart-slice reducers: addItemToCart
    dispatch(cartActions.addItemToCart({
      id: id,
      title: title,
      price: price
    }));
  };

  return (
    <form className={classes.form}>
      {/* <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      /> */}
      <button type="button" onClick={addToCartHandler}>+ Add</button>
    </form>
  );
};

export default ProductItemForm;

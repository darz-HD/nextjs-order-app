import ProductItemForm from "./ProductItemForm";

import { useRouter } from "next/router";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const router = useRouter();
  function showDetailsHandler() {
    router.push("/" + props.id);
  }
  return (
    <li className={classes.product}>
      <div>
        <h3>{props.title}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price}</div>
        <div className={classes.image}>
          <img
            src={props.image}
            alt={props.title}
            onClick={showDetailsHandler}
          />
        </div>
        <div>
          <ProductItemForm key={props.id} id={props.id} title={props.title} price={props.price} description={props.description}/>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;

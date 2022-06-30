import { Fragment } from "react";

// import ProductsSummary from "./ProductsSummary";
import AvailableProducts from "./AvailableProducts";

const Products = (props) => {
  return (
    <Fragment>
      {/* <ProductsSummary /> */}
      {/* pass props.products to AvailableProducts component */}
      <AvailableProducts products={props.products}/>
    </Fragment>
  );
};

export default Products;

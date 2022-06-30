import Link from "next/link";
import { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Products</h1>
        <nav>
          <ul>
            <li>
              <Link href="/">All Products</Link>
            </li>
            <li>
              <Link href="/new-product">Add New Product</Link>
            </li>
          </ul>
        </nav>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src="https://cdn.pixabay.com/photo/2018/05/04/20/01/website-3374825_960_720.jpg" alt="Product!" />
      </div>
    </Fragment>
  );
};

export default Header;

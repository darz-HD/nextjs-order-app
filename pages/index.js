import { MongoClient } from "mongodb";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Head from "next/head";
import Products from "../components/products/Products";
import Notification from "../components/ui/Notification";
import { sendCartData, fetchCartData } from "../redux/cart-slice";

let isInitial = true;

function HomePage(props) {
  // initialize useDispatch
  const dispatch = useDispatch();
  // pass a function that contains redux state, state.ui.cartIsvisible from redux/index.js
  const cart = useSelector((state) => state.cart);
  // pass a function that contains redux state, state.ui.notification from redux/index.js
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    //cart.changed initial value is false in cart-slice it only change to true when adding or removing to cart
    if (cart.changed) {
      // execute action creator sendCartData in cart-slice
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      <Head>
        <title>Marketplace</title>
        <meta name="description" content="Browse a huge list products!" />
      </Head>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {/* pass props.products to Products component */}
      <Products products={props.products} />
    </Fragment>
  );
}
//any code will never end up and execute in client side, this code will only executed during build, we no longer need to manage state and useEffect
// export async function getStaticProps() {
//   //connect to mongodb database market
//   const client = await MongoClient.connect(
//     "mongodb+srv://darz:123456789Dt11@cluster0.71egvam.mongodb.net/?retryWrites=true&w=majority"
//   );
//   // get the database market
//   const db = client.db();
//   // get the database collection
//   const productCollection = db.collection("products");
//   // use find method by default get all data from collection
//   const products = await productCollection.find().toArray();

//   client.close();
//   return {
//     // props that will be pass to HomePage component
//     props: {
//       products: products.map((product) => ({
//         title: product.title,
//         price: product.price,
//         image: product.image,
//         description: product.description,
//         id: product._id.toString(), //convert the auto generated id from mongo db
//       })),
//     },
//     //this page will not only generated tru build but also every couple of second
//     revalidate: 10,
//   };
// }
// run for every incoming request use when you have data that changes all the time
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  //connect to mongodb database market
  const client = await MongoClient.connect(
    process.env.CONNECTION_STRING
  );
  // get the database market
  const db = client.db();
  // get the database collection
  const productCollection = db.collection("products");
  // use find method by default get all data from collection
  const products = await productCollection.find().toArray();

  client.close();
  return {
    // props that will be pass to HomePage component
    props: {
      products: products.map((product) => ({
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        id: product._id.toString(), //convert the auto generated id from mongo db
      })),
    },
  };
}
export default HomePage;

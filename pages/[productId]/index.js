import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react/cjs/react.production.min";
import ProductDetail from "../../components/products/ProductDetail";

function ProductDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.productData.title}</title>
        <meta name="description" content={props.productData.description} />
      </Head>
      <ProductDetail
        image={props.productData.image}
        alt={props.productData.title}
        title={props.productData.title}
        price={props.productData.price}
        description={props.productData.description}
      />
    </Fragment>
  );
}
//this is used on dynamic pages when getStaticProps is used not when using getServerSideProps
export async function getStaticPaths() {
  //connect to mongodb database market
  const client = await MongoClient.connect(process.env.CONNECTION_STRING);
  // get the database market
  const db = client.db();
  // get the database collection
  const productCollection = db.collection("products");
  // use find method to get data from collection
  const products = await productCollection.find({}, { _id: 1 }).toArray(); // get the data on products in mongodb only include the id { _id: 1 }

  client.close();

  return {
    //fallback: false, // 404 when no meetup id match
    fallback: false, //does not respond 404 if id will not find immediately
    paths: products.map((product) => ({
      params: { productId: product._id.toString() },
    })),
  };
}
//any code will never end up and execute in client side
//this code will only executed during build
//we no longer need to manage state and useEffect
export async function getStaticProps(context) {
  const productId = context.params.productId; // get the id from the URL
  //connect to mongodb database market
  const client = await MongoClient.connect(process.env.CONNECTION_STRING);
  // get the database market
  const db = client.db();
  // use find mehod by default get data from collection
  const productCollection = db.collection("products");
  // use findOne method to get data from collection where _id = productId
  const selectedProduct = await productCollection.findOne({
    _id: ObjectId(productId), //convert string to ObjectId
  }); // get the data on meetups in mongodb

  client.close();

  return {
    //props that will be pass to ProductDetails component
    props: {
      productData: {
        id: selectedProduct._id.toString(),
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
        description: selectedProduct.description,
      },
    },
  };
}
export default ProductDetails;

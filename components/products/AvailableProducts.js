import Card from '../UI/Card';
import classes from './AvailableProducts.module.css';
import ProductItem from './productItem/ProductItem';
                 
const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'Keyboard',
    description: 'GMMK Pro White Ice',
    image: 'https://i.shgcdn.com/d66677c4-c061-4340-b1a8-3bb2ca53e466/-/format/auto/-/preview/3000x3000/-/quality/lighter/'
  },
  {
    id: 'p2',
    price: 5,
    title: 'Mouse',
    description: 'Wireless Mouse',
    image: 'https://cdn.pixabay.com/photo/2017/05/24/21/33/workplace-2341642_960_720.jpg'
  },
];

const AvailableProducts = (props) => {
    // map props.products
    // const productsList = DUMMY_PRODUCTS.map((product) => (
    /* uncomment this */
    const productsList = props.products.map((product) => (
    /* uncomment this */
        <ProductItem
          id={product.id}
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      ));
    
      return (
        <section className={classes.products}>
          <Card>
            <ul>{productsList}</ul>
          </Card>
        </section>
      );

}

export default AvailableProducts
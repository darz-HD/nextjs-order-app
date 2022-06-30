import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewProductForm.module.css';

function NewProductForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const productData = {
      title: enteredTitle,
      image: enteredImage,
      price: enteredPrice,
      description: enteredDescription,
    };

    props.onAddProduct(productData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Product Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Product Image</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Price</label>
          <input type='text' required id='price' ref={priceInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Product</button>
        </div>
      </form>
    </Card>
  );
}

export default NewProductForm;

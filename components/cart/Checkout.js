import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

// validation
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isContactNumber = (value) => value.includes("+63") && value.trim().length === 13;

const Checkout = (props) => {

  //call the custom hook
  //value, isValid, hasError, valueChangeHandler, inputBlurHandler, reset are function in the use-input
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);
  const {
    value: contactNumberValue,
    isValid: contactNumberIsValid,
    hasError: contactNumberHasError,
    valueChangeHandler: contactNumberChangeHandler,
    inputBlurHandler: contactNumberBlurHandler,
  } = useInput(isContactNumber);
  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput(isNotEmpty);

  // set initial value for formIsValid to false
  let formIsValid = false;

  if (nameIsValid && emailIsValid && contactNumberIsValid && addressIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    } else {
      // call function pass from Cart component
      props.onConfirm({
        name: nameValue,
        email: emailValue,
        contactNumber: contactNumberValue,
        address: addressValue,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className="control-group">
        <div
          className={`${classes.control} ${
            !nameHasError ? "" : classes.invalid
          }`}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && <p className="error-text">Please enter a name.</p>}
        </div>

        <div
          className={`${classes.control} ${
            !emailHasError ? "" : classes.invalid
          }`}
        >
          <label htmlFor="email">E-Mail Address</label>
          <input
            type="text"
            id="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <p className="error-text">Please enter a valid email address.</p>
          )}
        </div>

        <div
          className={`${classes.control} ${
            !contactNumberHasError ? "" : classes.invalid
          }`}
        >
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumberValue}
            onChange={contactNumberChangeHandler}
            onBlur={contactNumberBlurHandler}
          />
          {contactNumberHasError && (
            <p className="error-text">Please enter a valid contactNumber.</p>
          )}
        </div>

        <div
          className={`${classes.control} ${
            !addressHasError ? "" : classes.invalid
          }`}
        >
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={addressValue}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
          />
          {addressHasError && <p className="error-text">Please an address.</p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default Checkout;

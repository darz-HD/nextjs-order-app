import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    userId: 1,
    totalQuantity: 0,
    totalAmount: 0,
    changed: false
  },
  reducers: {
    clearCart(state, action) {
      state.items = [], 
      state.totalQuantity = 0,
      state.totalAmount = 0
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      // item that should be added
      const newItem = action.payload;
      // check if item already exist in the cart
      const existingItem = state.items.find((item) => item.id === newItem.id);
      // if it doesn't exist in the cart push it in the state.items array
      state.totalQuantity++;
      state.totalAmount = parseFloat(state.totalAmount) + parseFloat(newItem.price);
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          parseFloat(existingItem.totalPrice) + parseFloat(newItem.price);
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id == id);
      // if the quantity of the item in the cart is 1 remove it entirely
      state.totalQuantity--;
      state.totalAmount = parseFloat(state.totalAmount) - parseFloat(existingItem.price);
      state.changed = true;
      if (existingItem.quantity === 1) {
        // filter out that one item we want to remove then overwrite the items array
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});


// create action creator outside of slice
export const sendCartData = (cart) => {
  // returns another function
  return async (dispatch) => {
    // execute showNotification in ui-slice reducers: toggle
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending..",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      //fetch from internal api created from api folder
      const response = await fetch("/api/add-cart", {
        method: "PUT",
        body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity, totalAmount: cart.totalAmount}),
        headers: {
          "Content-type": "application/json",
        },
      });
      // const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Send cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            //fetch from internal api created from api folder
            const response = await fetch('/api/get-cart');
            
            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }
            const data = await response.json();
    
            return data;
        };
            try {
            const cartData = await fetchData();
            dispatch(cartSlice.actions.replaceCart({
                items: cartData[0].items || [],
                totalQuantity: cartData[0].totalQuantity,
                totalAmount: cartData[0].totalAmount
            }));
            } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
                );
            }
    };
};

// export cartSlice.actions addItemToCart removeItemFromCart
export const cartActions = cartSlice.actions;

export default cartSlice;

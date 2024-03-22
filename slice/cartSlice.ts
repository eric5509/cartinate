
import { createSlice } from "@reduxjs/toolkit";


const initialState: any =  [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state = action.payload
    },
    addItemToCart: (state, action) => {
      const { id, name, quantity, price } = action.payload;
      const product = { id, name, quantity, price };
      const ids = state.map((el: any) => {
        return el.id;
      });
      if (ids.includes(id)) {
        const newState = state.map((el: any) => {
          if (el.id === id) {
            return {
              ...el,
              quantity,
            };
          }
          return el;
        });
        state = newState;
        return;
      }
      const newState = [...state, product];
      state = newState;
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const newState = state.map((product: any) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        } else {
          return product;
        }
      });
      state = newState;
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const newState = state.map((product: any) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
          };
        } else {
          return product;
        }
      });
      state = newState;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const newState = state.filter((el: any) => el.id !== id);
      state = newState;
    },
    clearCart: (state) => {
      state = []
    },
    getCartQuantity: (state) => {
      let sum = 0;
      state.map((product: any) => {
        sum += product.quantity;
      });
      return sum;
    },
  },
  
});

export const {
  increaseQty,
  decreaseQty,
  getCartQuantity,
  setCart,
  removeFromCart,
  addItemToCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

import {createContext} from "react";

export const initialState = {
  inventories: [],
  cartItems: [],
  name: 'TigerLily',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_INVENTORIES":
      return {...state, inventories: action.payload}
    case "ADD_TO_CART":
      return {...state, cartItems: [ ...state.cartItems, action.payload]}
    default:
      return state;
  }
}

export const InventoryContext = createContext();
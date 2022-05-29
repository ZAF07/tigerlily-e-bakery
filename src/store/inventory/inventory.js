import {createContext} from "react";

export const initialState = {
  inventories: [],
  cartItems: [],
  name: 'TigerLily',
  wsInstance: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_INVENTORIES":
      return {...state, inventories: action.payload}
    case "ADD_TO_CART":
      return {...state, cartItems: [ ...state.cartItems, action.payload]}
    case "REMOVE_FROM_CART":
    // REMOVE ITEM FROM CART
    const currentItems = state.cartItems;
    currentItems.splice(action.payload, 1);
    return {...state, cartItems: currentItems}
    case "SET_WEBSOCKET_INSTANCE":
      return {...state, wsInstance: action.payload}
    case "DEDUCT_ITEM_QUANTITY":
      // GET ITEM NAME IN CART
      const inCart = {};
      state.cartItems.forEach(obj => {
        if (inCart[obj.name]) {
          inCart[obj.name] += 1
        } else {
          inCart[obj.name] = 1
        }
      })      
      console.log('ITEMS IN CART ==> ', inCart);
      const newState = []
      state.inventories.forEach(obj => {
        const toUpdate = obj.name in inCart
        if (toUpdate) {
          obj.quantity = obj.quantity - inCart[obj.name]
        }
        newState.push(obj)
      })
      const latestState = {...state, inventories: newState}
      const a = JSON.stringify({"inventories": latestState.inventories})
      console.log('oahsoabso -----> ', a);
      state.wsInstance.send(JSON.stringify({"inventories": latestState.inventories}))
      // state.wsInstance.send(JSON.stringify(string))
      // return {...state, inventories: newState}
      return latestState
    case 'REAL_TIME_UPDATE':
      console.log('GOTTEN ===> ', action.payload);
      return {...state, inventories: action.payload}
    default:
      return state;
  }
}

export const InventoryContext = createContext();
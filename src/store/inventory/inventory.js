import {createContext} from "react";
import Constants from "../../utils/constants";

export const initialState = {
  inventories: [],
  cartItems: [],
  name: 'TigerLily',
  wsInstance: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Constants.actions.GET_INVENTORIES:
      return {...state, inventories: action.payload}
    
    case Constants.actions.ADD_TO_CART:
      return {...state, cartItems: [ ...state.cartItems, action.payload]}

    case Constants.actions.REMOVE_FROM_CART:
    // REMOVE ITEM FROM CART
    const currentItems = state.cartItems;
    currentItems.splice(action.payload, 1);
    return {...state, cartItems: currentItems}
    case Constants.actions.SET_WEBSOCKET_INSTANCE:
      return {...state, wsInstance: action.payload}

    case Constants.actions.DEDUCT_ITEM_QUANTITY:
      // GET ITEM NAME IN CART
      if (state.cartItems.length < 1) {
        return {...state}
      }

      const inCart = {};
      state.cartItems.forEach(obj => {
        if (inCart[obj.name]) {
          inCart[obj.name] += 1
        } else {
          inCart[obj.name] = 1
        }
      })      

      const newState = []
      state.inventories.forEach(obj => {
        const toUpdate = obj.name in inCart
        if (toUpdate) {
          obj.quantity = obj.quantity - inCart[obj.name]
        }
        newState.push(obj)
      })

      const latestState = {...state, inventories: newState}
      // TECH DEBT: May have to pass actual JSON instead. JSON.stringify() will not reflect nil values for objects !!!
      state.wsInstance.send(JSON.stringify({"inventories": latestState.inventories}))
      return latestState

    case Constants.actions.REAL_TIME_INVENTORY_UPDATE:
      console.log('GOTTEN IN DEDUCT_ITEM_QUANTITY REDUCER ===> ', action.payload);
      return {...state, inventories: action.payload}
    default:
      return {...state};
  }
}

export const InventoryContext = createContext();
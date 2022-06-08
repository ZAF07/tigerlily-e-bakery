import {createContext} from "react";
import Constants from "../../utils/constants";

export const initialState = {
  inventories: [],
  cartItems: [],
  name: 'TigerLily',
  wsInstance: {},
};

export const reducer = (state, action) => {
  /*
    ❌ TODO:
      Could move all the case's logic into a helper. Can declutter the page
  */
  switch (action.type) {
    case Constants.actions.SET_INVENTORIES:
      return {...state, inventories: action.payload}
    
    case Constants.actions.ADD_TO_CART:
      return {...state, cartItems: [ ...state.cartItems, action.payload]}
    
      /*
        ❌ TODO: 
          Could refactor this. Currently it scans ALL items in inventory state. What if inventory has 1000 items...
      */
    case Constants.actions.DEDUCT_CURRENT_USER_ITEM_QUANTITY:
      console.debug('DEDUCTING FROM CURRENT USER')
      const skuToDeductQuantity = action.payload.sku_id;
      const deductedState = []
      state.inventories.forEach(item => {
        if (item.sku_id === skuToDeductQuantity) {
          item.quantity -= 1
        }
        deductedState.push(item)
      })
      return { ...state, inventories: deductedState }

    case Constants.actions.REMOVE_FROM_CART:
      // REMOVE ITEM FROM CART
      const currentItems = state.cartItems;
      currentItems.splice(action.payload, 1);
      return {...state, cartItems: currentItems}

    case Constants.actions.SET_WEBSOCKET_INSTANCE:
      return {...state, wsInstance: action.payload}

    case Constants.actions.CHECKOUT_UPDATE_QUANTITY:
      // GET ITEM NAME IN CART
      if (state.cartItems.length < 1) {
        return {...state}
      }
      
      // 🛠 TECH DEBT: May have to pass actual JSON instead. JSON.stringify() will not reflect nil values for objects !!!
      state.wsInstance.send(JSON.stringify({"inventories": state.inventories}))
      
      /*
      💡 This was previous implementation when i wanted a quick prototype.
      Uncommented (above) implementation is current and most probably the accurate one. 
      Live Inventory state update to send is CURRENT USER'S CURRENT INVENTORY AFTER CHECKOUT
      */ 
     // const inCart = {};
     // state.cartItems.forEach(obj => {
     //   if (inCart[obj.name]) {
     //     inCart[obj.name] += 1
     //   } else {
     //     inCart[obj.name] = 1
     //   }
     // })      

      // const newState = []
      // state.inventories.forEach(obj => {
      //   const toUpdate = obj.name in inCart
      //   if (toUpdate) {
      //     obj.quantity = obj.quantity - inCart[obj.name]
      //   }
      //   newState.push(obj)
      // })

      // const latestState = {...state, inventories: newState}
      // state.wsInstance.send(JSON.stringify({"inventories": latestState.inventories}))
      // return latestState
      return { ...state, cartItems: [] }

    case Constants.actions.RECEIVE_REAL_TIME_INVENTORY_UPDATE:
      console.debug('GOTTEN IN RECEIVE_REAL_TIME_INVENTORY_UPDATE REDUCER ===> ', action.payload);
      return {...state, inventories: action.payload}
    default:
      return {...state};
  }
}

export const InventoryContext = createContext();
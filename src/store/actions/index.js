import Constants from "../../utils/constants"

 const AddToCart = (payload) => {
  return { type: Constants.actions.ADD_TO_CART, payload }
}

const RemoveFromCart = (payload) => {
  return { type: Constants.actions.REMOVE_FROM_CART, payload: payload }
}

const DeductFromQuantity = (payload) => {
  return { type: Constants.actions.DEDUCT_ITEM_QUANTITY, payload }
}

const SetInventories = (payload) => {
  return { type: Constants.actions.SET_INVENTORIES, payload }
}

const SetWebsocketInstance = (payload) => {
  return { type: Constants.actions.SET_WEBSOCKET_INSTANCE, payload}
}

const RealTimeInventoryUpdate = (payload) => {
  return { type: Constants.actions.REAL_TIME_INVENTORY_UPDATE, payload }
}

const InitActions = () => {
  return { 
    AddToCart,
    RemoveFromCart,
    DeductFromQuantity,
    SetInventories,
    SetWebsocketInstance,
    RealTimeInventoryUpdate,    
  }
}

export default InitActions;
import Constants from "../../utils/constants"

 const AddToCart = (items) => {
  return {
    type: Constants.actions.ADD_TO_CART,
    payload: items,
  }
}

const RemoveFromCart = (skuID) => {
  return {
    type: Constants.actions.REMOVE_FROM_CART,
    payload: skuID,
  }
}

const DeductFromQuantity = (name) => {
  return {
    type: Constants.actions.DEDUCT_ITEM_QUANTITY,
    payload: name
  }
}

const Actions = () => {
  return { 
    AddToCart,
    RemoveFromCart,
    DeductFromQuantity,
  }
}

export default Actions;
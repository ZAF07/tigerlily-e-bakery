
const actions = {
  getAllInventories: "GET_INVENTORIES",
  addToCart: "ADD_TO_CART",
}

 const addToCart = (items) => {
  return {
    type: 'ADD_TO_CART',
    payload: items,
  }
}

const removeFromCart = (skuID) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: skuID,
  }
}

export {
  addToCart,
  removeFromCart
}
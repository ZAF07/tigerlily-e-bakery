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

const deductFromQuantity = (name) => {
  return {
    type: 'DEDUCT_ITEM_QUANTITY',
    payload: name
  }
}

export {
  addToCart,
  removeFromCart,
  deductFromQuantity
}
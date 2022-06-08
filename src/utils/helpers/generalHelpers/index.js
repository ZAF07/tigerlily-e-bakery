const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const BuildCheckoutModel = (cartItems, args) => {
  const { orderID, customerID, discountCode } = args
  const checkoutModel = [];
    cartItems.forEach(item => {
      const checkoutItem = {};
      checkoutItem.sku_id =  item.sku_id
      checkoutItem.order_id = orderID
      checkoutItem.customer_id = customerID
      checkoutItem.discount_code = discountCode
      checkoutModel.push(checkoutItem)
    }) 
    return checkoutModel;
}

const GeneralHelpers = () => {
  return { sleep, BuildCheckoutModel }
}
export default GeneralHelpers;
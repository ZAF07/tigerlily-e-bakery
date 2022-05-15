import axios from 'axios';
import GLOBALS from '../utils/index.js';
// API Gateway host 
// const baseURL = 'http://localhost:8080';
const baseURL = GLOBALS.urls.base;

export const getAllInventories = (dispatch, limit, offset) => {
  console.log(typeof limit);
  const url = `${baseURL}/inventory?limit=${limit}&offset=${offset}`;
  axios.get(url)
    .then(res => {
      const {data} = res;
      console.log(data.data.inventories);
      const payload = data.data.inventories
      dispatch({type: "GET_INVENTORIES", payload})
    })
}

export const checkout = (a) => {
  console.log('FROM CART : ', a);
  const checkoutURL = `${baseURL}/checkout`;
  const mockData = [{
    order_id: "071292",
    sku_id: "199292",
    customer_id: "9388",
    discount_code: "00112233"
  }]
  const paymentType = 'test_strategy'
  axios.post(checkoutURL, {checkout_items: mockData, payment_type: paymentType}, {
    headers: {
      'content-type': 'text/json'
    }
  })
  .then(res => {
    console.log(res);
  })
}
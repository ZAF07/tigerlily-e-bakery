import axios from 'axios';

// API Gateway host 
const baseURL = 'http://localhost:8080';

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
  axios.post(checkoutURL, {checkout_items: mockData}, {
    headers: {
      'content-type': 'text/json'
    }
  })
  .then(res => {
    console.log(res);
  })
}
import axios from 'axios';

// API Gateway host 
const baseURL = 'http://localhost:8080';

export const getAllInventories = (dispatch, limit, offset) => {
  console.log(typeof limit);
  const url = `${baseURL}/inventory?${limit}=0&offset=${offset}`;
  axios.get(url)
    .then(res => {
      const {data} = res;
      console.log(data.data.inventories);
      const payload = data.data.inventories
      dispatch({type: "GET_INVENTORIES", payload})
    })
}

export const checkout = () => {
  const checkoutURL = `${baseURL}/checkout`;
  axios.post(checkoutURL)
  .then(res => {
    console.log(res);
  })
}
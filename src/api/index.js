import axios from 'axios';

const baseURL = 'http://localhost:8000';

export const getAllInventories = (dispatch, limit, offset) => {
  const url = `${baseURL}/inventory?${limit}=0&offset=${offset}`;
  axios.get(url)
    .then(res => {
      const {data} = res;
      console.log(data.data.inventories);
      const payload = data.data.inventories
      dispatch({type: "GET_INVENTORIES", payload})
    })
}
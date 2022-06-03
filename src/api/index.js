import axios from 'axios';
import InitAPIClient from './client/index';
import RetryManager from '../api/retryManager/index';

const baseURL = 'http://localhost:8080';

const ApiClient = InitAPIClient();

/*
  TODO: SAME THING HERE. PLAN DESIGN PATTERN BEFORE CONTINUING CODE. VERY MESSY STRUCTURE
*/
export const getAllInventories = async (dispatch, limit, offset) => {
  const query = `limit=${limit}&offset=${offset}`;
  const resp = await ApiClient.GetAllInventories(query, 3, 1)
  console.log('DONE IN API AGGREFGATOR: ', resp);
  if (resp.status === 'retry') {
    const retryResp = await RetryManager(500,3,ApiClient.GetAllInventories, query)
    retryResp.status === 'ok' ? dispatch({type: 'GET_INVENTORIES', payload: retryResp.payload}) :  dispatch({type: 'GET_INVENTORIES', payload: []})
    return
  }
  dispatch({type: "GET_INVENTORIES", payload: resp.payload})
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

export const syncAllInventories = (dispatch) => {
   const conn = new WebSocket("ws://localhost:8080/inventory/ws?token=1234&name=zaffere");
    
    dispatch({type: "SET_WEBSOCKET_INSTANCE", payload: conn})
    conn.onopen = (evt) => {
    console.log("Open !!!!!!!!!!!!!!11");
  }
  
  conn.onmessage = (e) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@ --> ', e);
    console.log('MESSAGE RECEIVED : ', JSON.stringify(e.data))
    const payload = JSON.parse(e.data).inventories
    console.log('THIS PSYLAO : ', payload);
    dispatch({type: "REAL_TIME_UPDATE", payload})
    // dispatch action to store to sync inventories count
  }
}

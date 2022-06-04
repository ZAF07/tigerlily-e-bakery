import axios from 'axios';
import Constants from '../utils/constants';
import InitAPIClient from './client/index';
import APIHelper from '../utils/helpers/APIHelpers';
import AppErrors from '../utils/errors';

const baseURL = 'http://localhost:8080';

const ApiClient = InitAPIClient();

export const getAllInventories = async (dispatch, limit, offset) => {
  const query = APIHelper.BuildLimitAndOffsetString(limit, offset)
  try {
    const resp = await ApiClient.GetAllInventories(query, 3, 1)
    console.log('DONE IN API AGGREGATOR: ', resp);
    dispatch({type: "GET_INVENTORIES", payload: resp.payload})
  } catch (error) {

    /*
      TODO: 
      ABSTARCT ERROR HANDLING LOGIC AWAY FROM HERE. THIS SHOULD BE AGNOSTIC
    */

    // Here, based on the error, i send a retry, or alert the user that there was something wrong or that they entered a wrong value, please re-enter a valid value
    console.debug('CATCHING ERRPR ==> ', error); 
    // Construction the arguments for RetryManager to know which handler to call
    const errorHandlerArgs = {
      apiClient: ApiClient.GetAllInventories,
      query
    };
    const retryResp = await AppErrors.ErrorHandlers(error, errorHandlerArgs)
    console.debug('AFTER RETRY IN APP FACING API STUB: ', retryResp)
    retryResp.status === 'ok' ? dispatch({type: 'GET_INVENTORIES', payload: retryResp.payload}) :  dispatch({type: 'GET_INVENTORIES', payload: []})
  }
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

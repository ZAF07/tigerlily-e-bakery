import InventoryAPIInstance from '../../instance/InventoryAPIInstance';
import InitBinaryManager from '../../../utils/managers/binaryManager';
import appConfig from '../../../config';
import Helpers from '../../../utils/helpers';
import ErrorHandlers from '../../../utils/errors/errorHandlers';
import InitActions from '../../../store/actions'
import Constants from '../../../utils/constants';

const { DecodeBinary } = InitBinaryManager()
const actions = InitActions();
const InitInventoryAPIClient = () => {
  
  const GetAllInventories = async (dispatch, limit, offset) => {
    const query = Helpers.APIHelper.BuildLimitAndOffsetString(limit, offset)
    const { maxRetries, timeToWait } = appConfig;
    let retries = 0;
    let errMsg;

    while (retries < maxRetries + 1) {

      if (retries >= 1) {
        await Helpers.GeneralHelpers.sleep(timeToWait)
      }

      try 
      {
        const start = performance.now()
        const resp = await InventoryAPIInstance.get(`${Constants.paths.INVENTORY_PATH}?${query}`, {})
        const { data } = resp;
        const payload = data.data.inventories;
        dispatch(actions.SetInventories(payload))
        console.warn('PERFORMANCE @ INVENTORY REQ SERVER -> ', performance.now() - start)
        return 
      } 
      catch (error) {
        errMsg = error
      } 
      finally {
        retries += 1
      }
    }
    console.debug('will throw here -> ', errMsg)
    ErrorHandlers(errMsg)
  };

  /*
    ❌ TODO: 
      Set up error handling for cases when WS Client cannot establish a connection
  */ 
  const ConnectWSInventories = (dispatch) => {
    const conn = new WebSocket(Constants.paths.WS_PATH);
    conn.binaryType = 'arraybuffer'
    dispatch(actions.SetWebsocketInstance(conn))
    console.debug('💡💡💡 WEBSOCKET CONNECTION SUCCEED 💡💡💡') 
    
    conn.onmessage = (msg) => {
      const start = performance.now()
      console.log('📬📬📬 Received a new message from WebSocket 📬📬📬 --> ', msg);
      const payload = DecodeBinary(msg.data)
      console.debug('THIS PAYLAOD RECEIVED FROM WEBSOCKET CONNECTION AFTER DECODING: ', payload);
      dispatch(actions.ReceiveRealTimeInventoryUpdate(payload))
      console.warn('PERFORMANCE @ Updating realtime inventory updates -> ', performance.now() - start)
      // const payload = JSON.parse(msg.data).inventories
      // console.debug('MESSAGE RECEIVED : ', JSON.stringify(msg.data))
      // const payload = JSON.parse(msg.data)
    }
  }

  return {  
    GetAllInventories,
    ConnectWSInventories
  }
}

export default InitInventoryAPIClient;
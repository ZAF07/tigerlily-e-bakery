import InventoryAPIInstance from '../../instance/InventoryAPIInstance';
import appConfig from '../../../config';
import Helpers from '../../../utils/helpers';
import ErrorHandlers from '../../../utils/errors/errorHandlers';
import InitActions from '../../../store/actions'
import Constants from '../../../utils/constants';


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
        const resp = await InventoryAPIInstance.get(`${Constants.paths.INVENTORY_PATH}?${query}`, {})
        const { data } = resp;
        const payload = data.data.inventories;
        dispatch(actions.SetInventories(payload))
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
    dispatch(actions.SetWebsocketInstance(conn))
    console.debug('💡💡💡 WEBSOCKET CONNECTION SUCCEED 💡💡💡') 

    conn.onmessage = (msg) => {
      console.log('📬📬📬 Received a new message from WebSocket 📬📬📬 --> ', msg);
      console.debug('MESSAGE RECEIVED : ', JSON.stringify(msg.data))
      const payload = JSON.parse(msg.data).inventories
      console.debug('THIS PAYLAOD RECEIVED FROM WEBSOCKET CONNECTION : ', payload);
      dispatch(actions.ReceiveRealTimeInventoryUpdate(payload))
    }
  }

  return {  
    GetAllInventories,
    ConnectWSInventories
  }
}

export default InitInventoryAPIClient;
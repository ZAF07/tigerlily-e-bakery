import InventoryAPIInstance from '../instance/InventoryAPIInstance';
import appConfig from '../../config';
import Helpers from '../../utils/helpers';
import ErrorHandlers from '../../utils/errors/errorHandlers';


const InitInventoryAPIClient = () => {
  
  const GetAllInventories = async (dispatch, limit, offset) => {
    const query = Helpers.APIHelper.BuildLimitAndOffsetString(limit, offset)
    const { maxRetries, timeToWait } = appConfig;
    let retries = 0;
    let errMsg;

    while (retries < maxRetries + 1) {

      if (retries >= 1) {
        await Helpers.Sleep(timeToWait)
      }

      try 
      {
        const resp = await InventoryAPIInstance.get(`/inventory?${query}`, {})
        const { data } = resp;
        const payload = data.data.inventories;
        dispatch({type: "GET_INVENTORIES", payload})
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
    // throw new Error(errMsg)
  };
  
  return {  
    GetAllInventories,
  }
}

export default InitInventoryAPIClient;
import { InventoryAPIInstance } from './inventoryAPIInstance';
import Helpers from '../../utils/helpers';


const InitAPIClient = () => {

  const GetAllInventories = async (query, {maxRetries, timeToWait}) => {
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
        return { status: 'ok', payload }
      } 
      catch (error) {
        console.log('CATCH ERR !!!!!!!!! : ', error.message);
        errMsg = error.message
      } 
      finally {
        retries += 1
      }
    }
    throw new Error(errMsg)
  };

  return {  
    GetAllInventories,
  }
}

export default InitAPIClient;
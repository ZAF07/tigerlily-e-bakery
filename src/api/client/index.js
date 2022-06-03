import { InventoryAPIClient } from './inventoryClient';


const ApiClient = () => {
  /*
  TODO: REFACTOR THIS FILE. PLAN OUT THE DESIGN PATTERN BEFORE CONTINUING CODE
  */
  const GetAllInventories = async (query, maxRetries, timeToWait) => {
        const a = await InventoryAPIClient.get(`/inventory?${query}`, {})
          .then( res => {
            console.log('>>>>>>>: ', res);
            const { data } = res;
            const payload = data.data.inventories;
            return {
              status: 'ok',
              payload
            };
          }).catch(err => {
            /*
              TODO: 
              Create a helper function to switch between errors and return
            */

            console.log('CATCH ERR !!!!!!!!! : ', err.message);
            switch (err.message) {
              // Currently there are errors that triggers this. Ideally want only Status >=500 will trigger
              case 'Network Error':
                return { status: 'retry' }
              case 'Request failed with status code 200':
                return { status: 'retry' }
              case 'invalid auth':
                return { status: 'Invalid auth' }
              default:
                return { status: 'Unknown. Check api/client/index.js line 24' }
            }
          })
          return a
    }
    return {
      GetAllInventories,
    }
}

export default ApiClient;
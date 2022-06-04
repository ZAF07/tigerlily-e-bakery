import { InventoryAPIInstance } from './inventoryAPIInstance';


const InitAPIClient = () => {

  const GetAllInventories = async (query, maxRetries, timeToWait) => {
    try {
        const resp = await InventoryAPIInstance.get(`/inventory?${query}`, {})
        const { data } = resp;
        const payload = data.data.inventories;
        return { status: 'ok', payload }
    } catch (error) {
        console.log('CATCH ERR !!!!!!!!! : ', error.message);
        throw new Error(error.message)
    }
    };

    return {
      GetAllInventories,
    }
}

export default InitAPIClient;
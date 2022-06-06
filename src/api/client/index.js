import InitInventoryAPIClient from './inventoryAPIClient';
import PaymentAPIClient from './paymentAPIClient';

const InitAPIClient = () => {
  
  return {  
  InventoryAPIClient: InitInventoryAPIClient(),
  PaymentAPIClient: PaymentAPIClient(),
  }
}

export default InitAPIClient;
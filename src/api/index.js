import InitInventoryAPIClient from './client/inventory/inventoryAPIClient';
import PaymentAPIClient from './client/payment/paymentAPIClient'

const InitAPIClient = () => {
  
  return {  
  InventoryAPIClient: InitInventoryAPIClient(),
  PaymentAPIClient: PaymentAPIClient(),
  }
}

export default InitAPIClient;
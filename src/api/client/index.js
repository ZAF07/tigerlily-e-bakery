import InitInventoryAPIClient from './inventory/inventoryAPIClient';
import PaymentAPIClient from './payment/paymentAPIClient'

const InitAPIClient = () => {
  
  return {  
  InventoryAPIClient: InitInventoryAPIClient(),
  PaymentAPIClient: PaymentAPIClient(),
  }
}

export default InitAPIClient;
import PaymentAPIInstance from "../../instance/PaymentAPIInstance";
import ErrorHandlers from '../../../utils/errors/errorHandlers';
import Constants from "../../../utils/constants";


const PaymentAPIClient = () => {

  const checkout = async (a) => {
  const mockData = [{
    order_id: "071292",
    sku_id: "199292",
    customer_id: "9388",
    discount_code: "00112233"
  }]
  const paymentType = 'test_strategy'
  
  let checkoutSuccess = false;  
    while (!checkoutSuccess) {
      let errMsg;
      try 
      {
        const resp = await PaymentAPIInstance.post(Constants.CHECKOUT_PATH, {
          checkout_items: mockData,
          payment_type: paymentType,
          Headers: {
            'content-type': 'text/json'
          }
        });

        const { data } = resp;
        checkoutSuccess = data.data.success;
        console.debug(data.data)

        if (!checkoutSuccess) {
         console.debug("Going to retry payment. This will be an idempotent API. Don't forget to pass a requeset ID for the backend to check") 
        }
     } 
      catch (error) {
        errMsg = error
        ErrorHandlers(errMsg)
      } 
    }

  }

  return { checkout }
}

export default PaymentAPIClient;
import PaymentAPIInstance from "../../instance/PaymentAPIInstance";
import ErrorHandlers from '../../../utils/errors/errorHandlers';
import Constants from "../../../utils/constants";

const PaymentAPIClient = () => {

  /*
    ❌ TODO:
    Create idempotent requset here.
    To create and pass a request ID along with the payload
    Also set amount of times to retry if failure to checkout persists
  */
  const checkout = async (a, dispatch) => {
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
        const resp = await PaymentAPIInstance.post(Constants.paths.CHECKOUT_PATH, {
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
          /*
          ❌ TODO:
            If payment failure persists after all retries, return all items to inventory for other customers to consume (unlock).
          */
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
import { v4 as uuidv4 } from 'uuid';
import PaymentAPIInstance from "../../instance/PaymentAPIInstance";
import appConfig from '../../../config';
import InitActions from '../../../store/actions'
import ErrorHandlers from '../../../utils/errors/errorHandlers';
import Constants from "../../../utils/constants";
import Helpers from '../../../utils/helpers';

const { BuildCheckoutModel } = Helpers.GeneralHelpers
const actions = InitActions();

const PaymentAPIClient = () => {

  /*
    ❌ TODO:
    Create idempotent requset here.
    To create and pass a request ID along with the payload
    Also set amount of times to retry if failure to checkout persists
  */
  const checkout = async (checkoutItems, dispatch) => {
    console.debug('CHECKOUT ITEMS ==> ', checkoutItems);
    const orderID = uuidv4();
    const customerID = uuidv4();
    const discountCode = '1234';
    const { maxRetries, timeToWait } = appConfig;
    let retries = 0;
    /*
      💡 THIS IS THE DATA STRUCTURE PAYMENT SERVICE EXPECTS TO PROCESS A CHECKOUT.
      const mockData = [{
        order_id,
        customer_id,
        sku_id: "199292",
        discount_code: "00112233"
      }]
     */ 
    const checkoutModel = BuildCheckoutModel(checkoutItems, { orderID, customerID, discountCode })
    const paymentType = 'test_strategy'
  
    let checkoutSuccess = false;  
    while (!checkoutSuccess && retries < maxRetries + 1) {
      let errMsg;

      if (retries >= 1) {
        await Helpers.GeneralHelpers.sleep(timeToWait)
      }

      try 
      {
        const resp = await PaymentAPIInstance.post(Constants.paths.CHECKOUT_PATH, {
          checkout_items: checkoutModel,
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
      } finally {
        retries += 1
      }
      ErrorHandlers(errMsg)
      /*
        ❌ Work on this. Create a new action to recalculate returned inventories and send updates over WS for other customers to consume
      */
      // dispatch(actions.SetInventories())
    }

  }

  return { checkout }
}

export default PaymentAPIClient;
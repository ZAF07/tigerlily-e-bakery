import React, {useContext} from 'react';
import { InventoryContext } from '../../store/inventory/inventory';
import InitAPIClient from '../../api';
import InitActions from '../../store/actions'

import Cart from './cart/Cart';

const { DeductFromQuantity } = InitActions();
const { PaymentAPIClient } = InitAPIClient();

// CHECKOUT BUTTON HERE
// NEEDS STATE TO ACCESS CART ITEMS TO SEND TO THE SERVER FOR PROCESSING CHECKOUT

function Checkout({isBrowsing}) {
  const browsing = isBrowsing
  const {state, dispatch} = useContext(InventoryContext);

  const backToBrowse = (
    <React.Fragment>
      <button onClick={() => browsing(true)}>Back to browse</button>
    </React.Fragment>
  )

  // Handler to send a message to the websocket server
  // This should be on each time a user checks out an item
  const handleCheckout = () => {
    /*
      ❌ TODO:
        Dispatch DEDUCT_ITEM_QUANTITY here (lock).
        Customer is ready to checkout, pending payment,
        so items should be his/hers for now. 
        Only if checkout is not a success, return all items to inventory for other customers to consume
    */
    dispatch(DeductFromQuantity(state.cartItems))
    PaymentAPIClient.checkout(state.cartItems, dispatch)
  }

  return (
    <div>
      <h1>Checkout</h1>
      <Cart/>
      {backToBrowse}
      {/* Checkout API should be called in the dispatch. Dispatch should remove all items from cart first then calls Checkout API */}
      {/* <button onClick={() => checkout(state.cartItems)}>Checkout</button>  */}

    <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default Checkout

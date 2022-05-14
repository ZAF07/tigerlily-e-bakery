import React, {useContext} from 'react';
import { InventoryContext } from '../../store/inventory/inventory';
import { checkout } from '../../api';

import Cart from './cart/Cart';

// CHECKOUT BUTTON HERE
// NEEDS STATE TO ACCESS CART ITEMS TO SEND TO THE SERVER FOR PROCESSING CHECKOUT

function Checkout({isBrowsing}) {
  const browsing = isBrowsing
  const {state, dispatch} = useContext(InventoryContext);;
  // const inventoryItems = useContext(InventoryContext);

  const backToBrowse = (
    <React.Fragment>
      <button onClick={() => browsing(true)}>Back to browse</button>
    </React.Fragment>
  )

  return (
    <div>
      <h1>Checkout</h1>
      <Cart/>
      {backToBrowse}
      {/* Checkout API should be called in the dispatch. Dispatch should remove all items from cart first then calls Checkout API */}
      <button onClick={() => checkout(state.cartItems)}>Checkout</button> 
    </div>
  )
}

export default Checkout

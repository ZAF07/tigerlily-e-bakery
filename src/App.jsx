import React, {useEffect, useReducer, useState} from 'react';
import {InventoryContext, reducer, initialState} from './store/inventory/inventory'
import InitAPIClient from './api';

import Checkout from './components/checkout/Checkout';
import Browse from './components/browse/Browse';

const { InventoryAPIClient } = InitAPIClient()

function App() {
  const [browsing, setBrowsing] = useState(true)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.debug("RENDER")
    /*
      ❌ TODO:
        Move this guys to a separate function. These guys are to handle stripe webhook
    */
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      alert("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      alert(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }

    InventoryAPIClient.ConnectWSInventories(dispatch);
    InventoryAPIClient.GetAllInventoriesCache(dispatch)
    // InventoryAPIClient.GetAllInventories(dispatch, '0', '0');
  }, [])

  const CheckoutPage = state.inventories && !browsing && <Checkout isBrowsing={setBrowsing}/>
  const BrowsingPage = state.inventories && browsing && <Browse isBrowsing={setBrowsing}/>

  return (
    <InventoryContext.Provider value={{state, dispatch}}>
    <div className="App">
      <h1>TigerLily Bakery</h1>
      {CheckoutPage}
      {BrowsingPage}
    </div>
    </InventoryContext.Provider>
  );
}

export default App;

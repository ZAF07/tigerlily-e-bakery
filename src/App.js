import React, {useEffect, useReducer, useState} from 'react';
import {InventoryContext, reducer, initialState} from './store/inventory/inventory'
import * as API from './api/index';

import Checkout from './components/checkout/Checkout';
import Browse from './components/browse/Browse';

function App() {
  const [browsing, setBrowsing] = useState(true)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      alert("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      alert(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }

    // Websocket implementation to get realtime inventories
    API.syncAllInventories(dispatch)
    // API.getAllInventories(dispatch, '0','0');
  }, [])

  return (
    <InventoryContext.Provider value={{state, dispatch}}>
    <div className="App">
      <h1>TigerLily Bakery</h1>
      {state.inventories && !browsing && <Checkout isBrowsing={setBrowsing}/>}
      {state.inventories && browsing && <Browse isBrowsing={setBrowsing}/>}
    </div>
    </InventoryContext.Provider>
  );
}

export default App;

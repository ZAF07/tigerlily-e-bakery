import React, {useEffect, useReducer} from 'react';
import {InventoryContext, reducer, initialState} from './store/inventory/inventory'
import * as API from './api/index';
/*
 * COMPONENT IMPORTS
 */
import Checkout from './components/checkout/Checkout';

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
  
      API.getAllInventories(dispatch, 0,0);
    
  }, [])

  console.log(state.inventories);

  return (
    <InventoryContext.Provider value={{state, dispatch}}>
    <div className="App">
      <h1>TigerLily Bakery</h1>
      <Checkout />
    </div>
    </InventoryContext.Provider>
  );
}

export default App;

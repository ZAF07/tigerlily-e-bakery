import React, { useContext } from 'react';

import { InventoryContext } from '../../../store/inventory/inventory';

// DISPLAY ALL CART ITEMS HERE
// NO DISPATCH FUNCTION HERE

function Cart() {
  const {state} = useContext(InventoryContext);

  const cartItems = state.inventories.map((item, index) => {
    return (
      <React.Fragment key={index + item.name}>
        <h1>{item.name}</h1>
        <p>{item.price}</p>
        <small>{item.description}</small>
      </React.Fragment>
    )
  })
  return (
    <div>
      <h1>Cart</h1>  
    THIS ARE THE ITEMS :
    {cartItems}
    </div>
  )
}

export default React.memo(Cart)
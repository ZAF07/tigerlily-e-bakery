import React, {useContext} from 'react';
import { InventoryContext } from '../../store/inventory/inventory';

import Cart from './cart/Cart';

// DISPLAY ALL INVENTORIES HERE

function Checkout() {

  const inventoryItems = useContext(InventoryContext);
  console.log(inventoryItems);

  return (
    <div>
      <h1>Checkout</h1>
      <Cart/>
    </div>
  )
}

export default Checkout

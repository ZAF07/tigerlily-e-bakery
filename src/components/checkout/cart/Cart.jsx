import React, { useContext } from 'react';

import { InventoryContext } from '../../../store/inventory/inventory';
import {removeFromCart} from '../../../store/actions';

// DISPLAY ALL CART ITEMS HERE
// ABILITY TO ADD OR REMOVE ITEM QUANTITY

function Cart() {
  const {state, dispatch} = useContext(InventoryContext);

  const cartItems = state.cartItems.map((item, index) => {
    return (
      <React.Fragment key={index + item.name}>
        <h1>{item.name}</h1>
        <p>{item.price}</p>
        <small>{item.description}</small>
        <button onClick={() => dispatch(removeFromCart(index))}>Remove from cart</button>
      </React.Fragment>
    )
  })
  return (
    <div>
    <h1>Cart</h1>  
    THIS ARE THE ITEMS :
    {state.cartItems && cartItems}
    <br/>
    END CART
    <hr/>
    </div>
  )
}

export default React.memo(Cart)
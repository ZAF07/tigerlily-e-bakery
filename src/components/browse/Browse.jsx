import React, {useContext} from 'react';
/*
 *  CONTEXT IMPORT
 */
import { InventoryContext } from '../../store/inventory/inventory';
import {addToCart} from '../../store/actions';

// DISPATCH addToCart function here

function Browse() {
  const {state, dispatch} = useContext(InventoryContext)
  console.log(state);

  const pastriesDisplay = state.inventories.map((item, index) => {
    return (
      <React.Fragment key={index + item.name}>
        <hr/>
        <h1>{item.name}</h1>
        <small>{item.price}</small>
        <p>{item.description}</p>
        {/* <button onClick={() => dispatch({type: 'ADD_TO_CART', payload: item})}>ADD TO CART</button> */}
        <button onClick={() => dispatch(addToCart(item))}>ADD TO CART</button>
        <hr/>
      </React.Fragment>
    )
  })

  return (
    <div>
      <h1>Browse</h1>
      {pastriesDisplay}
    </div>
  )
}

export default Browse

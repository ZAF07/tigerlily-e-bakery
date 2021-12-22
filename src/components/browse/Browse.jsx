import React, {useContext} from 'react';
/*
 *  CONTEXT IMPORT
 */
import { InventoryContext } from '../../store/inventory/inventory';

function Browse() {
  const {state} = useContext(InventoryContext)
  console.log(state);

  const pastriesDisplay = state.inventories.map((item, index) => {
    return (
      <React.Fragment key={index + item.name}>
        <hr/>
        <h1>{item.name}</h1>
        <p>{item.price}</p>
        <small>{item.description}</small>
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

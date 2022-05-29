import React, { useContext } from 'react';
/*
 *  CONTEXT IMPORT
 */
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { InventoryContext } from '../../store/inventory/inventory';
import {addToCart} from '../../store/actions';
import cheese from '../../static/images/cheese_tart.jpg'
import egg from '../../static/images/egg_tart.jpg'
import lemon from '../../static/images/lemon_cake.jpg'

// DISPATCH addToCart function here

const getImageName = (name) => {
  switch (name) {
    case 'Lemon Cake':
      return lemon
    case 'Cheese Tart':
      return cheese
    case 'Egg Tart':
      return egg
    default:
      return egg
  }
}

function Browse({isBrowsing}) {
  const browsing = isBrowsing;
  const {state, dispatch} = useContext(InventoryContext)
//  API.syncAllInventories(dispatch)
  const pastriesDisplay = state.inventories.map((item, index) => {
    const imageName = getImageName(item.name)
    return (
      // <React.Fragment key={index + item.name}>
      <Grid item xs={6} key={index + item.name}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader title={item.name}>
              </CardHeader>
              <CardMedia 
              component="img"
              height="194"
              image={getImageName(item.name)}
              alt="egg_tart"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography> ${item.price} </Typography>
                <Typography> Quantity: {item.quantity} </Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="add to favorites" onClick={() => dispatch(addToCart(item))}>
                  <AddShoppingCartIcon/>
                 </IconButton>
                 <IconButton>
                  <FavoriteIcon />
                 </IconButton>
                  {/* <button onClick={() => dispatch(addToCart(item))}><AddShoppingCartIcon/></button> */}
              </CardActions>
            </Card>
        </Grid>

      // </React.Fragment>
    )
  })

  return (
    <div>
      <h1>Browse</h1>
      <button onClick={() => browsing(false)}>Checkout</button>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 6 }}>
          {pastriesDisplay}
      </Grid>
    </div>
  )
}

export default Browse

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
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { InventoryContext } from '../../store/inventory/inventory';
import Actions from '../../store/actions';

const action = Actions();

// DISPATCH addToCart function here
//effy sucks yes
function Browse({isBrowsing}) {
  const browsing = isBrowsing;
  const {state, dispatch} = useContext(InventoryContext)
//  API.syncAllInventories(dispatch)
  const pastriesDisplay = state.inventories.map((item, index) => {
    return (
      // <React.Fragment key={index + item.name}>
      <Grid item xs={6} key={index + item.name}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader title={item.name}>
              </CardHeader>
              <CardMedia 
              component="img"
              height="194"
              image={item.image_url}
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
                <IconButton aria-label="add to favorites" onClick={() => dispatch(action.AddToCart(item))}>
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

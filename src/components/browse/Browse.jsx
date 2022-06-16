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
import InitActions from '../../store/actions';
import egg from '../../static/images/egg_tart.jpg'
import lemon from '../../static/images/lemon_cake.jpg'
import cheese from '../../static/images/cheese_tart.jpg'

const { AddToCart, DeductCurrentUserItemQuantity } = InitActions();

// DISPATCH addToCart function here
//effy sucks yes
function Browse({isBrowsing}) {
  const browsing = isBrowsing;
  const {state, dispatch} = useContext(InventoryContext)
  const pastriesDisplay = state.inventories.map((item, index) => {
    
  // Before adding to cart, check that item's quantity is >1
  const HandleAddToCart = (item) => {
    if (item.quantity < 1) {
      console.debug('❌❌ CANNOT ADD ITEM ❌❌')
      return
    } 
    // Minus 1 to item quantity
    dispatch(DeductCurrentUserItemQuantity(item))
    dispatch(AddToCart(item))
  }
    /*
      ❌ TODO:
        This causes the page to load slow.
        This is only temporary. 
        In production, we would store all images in AWSS3 and and store image URL in DB
    */
    let imageURL ;
    // console.debug('IMAGE URL -> ', item.image_url)
     switch (item.image_url) {
      case 'egg':
        imageURL = egg
        break;
      case 'lemon':
        imageURL = lemon
        break;
      case 'cheese':
        imageURL= cheese
        break
      default:
        break;
    }
    return (
      // <React.Fragment key={index + item.name}>
      <Grid item xs={6} key={(item.price + item.quantity) + item.sku_id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader title={item.name}>
              </CardHeader>
              <CardMedia 
              component="img"
              height="194"
              image={imageURL}
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
                <IconButton aria-label="add to cart" disabled={item.quantity <1} onClick={() => HandleAddToCart(item)}>
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

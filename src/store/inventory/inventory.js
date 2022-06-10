import InitBinaryManager from '../../utils/managers/binaryManager';
import {createContext} from "react";
import Constants from "../../utils/constants";

const BinaryManager = InitBinaryManager();

export const initialState = {
  inventories: [],
  cartItems: [],
  name: 'TigerLily',
  wsInstance: {},
};

export const reducer = (state, action) => {
  /*
    ❌ TODO:
      Could move all the case's logic into a helper. Can declutter the page
  */
  switch (action.type) {
    case Constants.actions.SET_INVENTORIES:
      return {...state, inventories: action.payload}
    
    case Constants.actions.ADD_TO_CART:
      return {...state, cartItems: [ ...state.cartItems, action.payload]}
    
      /*
        ❌ TODO: 
          Could refactor this. Currently it scans ALL items in inventory state. What if inventory has 1000 items...
      */
    case Constants.actions.DEDUCT_CURRENT_USER_ITEM_QUANTITY:
      console.debug('DEDUCTING FROM CURRENT USER')
      const skuToDeductQuantity = action.payload.sku_id;
      const deductedState = []
      state.inventories.forEach(item => {
        if (item.sku_id === skuToDeductQuantity) {
          item.quantity -= 1
        }
        deductedState.push(item)
      })
      return { ...state, inventories: deductedState }

    case Constants.actions.REMOVE_FROM_CART:
      // REMOVE ITEM FROM CART
      const currentItems = state.cartItems;
      currentItems.splice(action.payload, 1);
      return {...state, cartItems: currentItems}

    case Constants.actions.SET_WEBSOCKET_INSTANCE:
      return {...state, wsInstance: action.payload}

    case Constants.actions.CHECKOUT_UPDATE_QUANTITY:
      // GET ITEM NAME IN CART
      if (state.cartItems.length < 1) {
        return {...state}
      }

      // const pa = [
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '78711',
      //     name: 'Eataaa',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '511',
      //     name: 'Eaa',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '62111',
      //     name: 'Eggrla',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '94222',
      //     name: 'Tartks',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '555511',
      //     name: 'E sasvrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '412111',
      //     name: 'Eg Tdvart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '99999111',
      //     name: 'Eg utase',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '774621',
      //     name: 'Egg Tarotis',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      // ]
      
      // const encoded = BinaryManager.ConvertBinary(pa)
      const encoded = BinaryManager.ConvertBinary(state.inventories)
      console.debug("This is converted to binary => ", encoded);
      state.wsInstance.send(encoded)

      // 🛠 TECH DEBT: May have to pass actual JSON instead. JSON.stringify() will not reflect nil values for objects !!!
      // state.wsInstance.send(JSON.stringify({"inventories": state.inventories}))

      
      /*
      💡 This was previous implementation when i wanted a quick prototype.
      Uncommented (above) implementation is current and most probably the accurate one. 
      Live Inventory state update to send is CURRENT USER'S CURRENT INVENTORY AFTER CHECKOUT
      */ 
     // const inCart = {};
     // state.cartItems.forEach(obj => {
     //   if (inCart[obj.name]) {
     //     inCart[obj.name] += 1
     //   } else {
     //     inCart[obj.name] = 1
     //   }
     // })      

      // const newState = []
      // state.inventories.forEach(obj => {
      //   const toUpdate = obj.name in inCart
      //   if (toUpdate) {
      //     obj.quantity = obj.quantity - inCart[obj.name]
      //   }
      //   newState.push(obj)
      // })

      // const latestState = {...state, inventories: newState}
      // state.wsInstance.send(JSON.stringify({"inventories": latestState.inventories}))
      // return latestState
      return { ...state, cartItems: [] }

    case Constants.actions.RECEIVE_REAL_TIME_INVENTORY_UPDATE:
      console.debug('GOTTEN IN RECEIVE_REAL_TIME_INVENTORY_UPDATE REDUCER ===> ', action.payload);
      return {...state, inventories: action.payload}
    default:
      return {...state};
  }
}

export const InventoryContext = createContext();
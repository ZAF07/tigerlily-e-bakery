import { serialize } from 'bson';
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
      //     sku_id: '11190909011',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2109234222411',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '755312111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '4118963459111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '557768623511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '222876511',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22112112222',
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
      //     sku_id: '12562112111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '11868901',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '117858711',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11764691111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2103222911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '755319070911',
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
      //     sku_id: '5553511',
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
      //     sku_id: '210977774211',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553003111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41132111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '093223422442243',
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
      //     sku_id: '00909099111',
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
      //     sku_id: '1196928111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2109079772911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '755332311111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '46571111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '5325511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22986078211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '228069758222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '0956765869111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12908578111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '11785785875701',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '11857598878711',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '111575785780000011',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210087070911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553907978565111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '4144444435111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55926986511',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22875287782211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22875087689222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09178558711',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '121785807911',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '186969811',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1164576987011',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11000000002111',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2106611232911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '00000000000007553111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41099055111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55578789411',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2299998798211',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2221111121212122',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09189888911',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '121010101111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '11101029011',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '11100920111',
      //     name: 'Egg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '1110908678611',
      //     name: 'Egg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2187979830911',
      //     name: 'Egg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7553665746111',
      //     name: 'Ehg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41787111',
      //     name: 'Eag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '5551108786046',
      //     name: 'Et',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22217711',
      //     name: 'Eggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22788521222',
      //     name: 'Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '0922111',
      //     name: 'E Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12133111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1986075968911',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '113411',
      //     name: 'Egg fdbTar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '1113411',
      //     name: 'Egg Tdbart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2104444911',
      //     name: 'Egdfbg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '755314444444411',
      //     name: 'Ehggrs Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '4155555555111',
      //     name: 'Eazzyg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '554444444444511',
      //     name: 'Ezzzzt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22454444211',
      //     name: 'Egazzgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2224222',
      //     name: 'Tadfart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '000099111',
      //     name: 'E Tartoo',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1215511',
      //     name: 'Eg Tarht',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1666547811',
      //     name: 'Eg ouuibTart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '10000111',
      //     name: 'Eghubuog Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '111342311',
      //     name: 'Egg Tttttttffart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2103333911',
      //     name: 'Egg Tttttgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '75533333111',
      //     name: 'Ehg Teffffart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '4112231111',
      //     name: 'Eag Ttttart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55222511',
      //     name: 'Etrrr',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22211111',
      //     name: 'Errrggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '222234411122',
      //     name: 'Tartyurt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '097637111',
      //     name: 'E Thgfart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: 'kjhg',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1136134511',
      //     name: 'Eg tTart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '11334111',
      //     name: 'Eg t tg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '11143611',
      //     name: 'Egg T . taart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '21054w911',
      //     name: 'Egg Tg rt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '75584253111',
      //     name: 'Ehg i trsjTart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '41183511',
      //     name: 'Eag Teasgart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '552564511',
      //     name: 'Esthbt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22574211',
      //     name: 'Eggrytnt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '222297562',
      //     name: 'Tebsart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09634111',
      //     name: 'E Tdssart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12142366811',
      //     name: 'Eg Tstdart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '11436341',
      //     name: 'Egdr Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1117835781',
      //     name: 'Egghkbaslbv Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '1108974111',
      //     name: 'Egg Tahhgjlgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '214210911',
      //     name: 'Egg jlhaousTgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '755443111',
      //     name: 'Ehvczg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '411411',
      //     name: 'Eag Tagsrrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55354511',
      //     name: 'Etw4asrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22532211',
      //     name: 'Ettesaggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '228909222',
      //     name: 'ooa',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '091109091',
      //     name: 'E Ttteart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12199911',
      //     name: 'Eg yyyTart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '115551',
      //     name: 'Eg Ttttttart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '11009876511',
      //     name: 'Egg llTar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '1142111',
      //     name: 'Egkalag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2100897911',
      //     name: 'Eggfte Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7535253111',
      //     name: 'Easvhg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '418890111',
      //     name: 'Eajjnag Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '556776511',
      //     name: 'Etbbz',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22422211',
      //     name: 'Erytggrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22855222',
      //     name: 'Tautljrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09675111',
      //     name: 'E Tuutart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1275111',
      //     name: 'Ebac',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '132',
      //     name: 'abc',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '115311',
      //     name: 'Egg Tttyar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '14551111',
      //     name: 'Eggh Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2104911',
      //     name: 'Ervgg Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '75539111',
      //     name: 'Ehgs4zsTart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '417889111',
      //     name: 'Eaghdhd Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '555112345431',
      //     name: 'Erfft',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22321211',
      //     name: 'rew',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '21232222',
      //     name: 'Trgart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '09155411',
      //     name: 'E Tggart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '12002111',
      //     name: 'Eg 4Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1434211',
      //     name: 'Eg 4aTart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1135211',
      //     name: 'Eggssg Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '115442111',
      //     name: 'Egghgg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2109911',
      //     name: 'Eggtv Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '5858884',
      //     name: 'Ehg gvzTart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '419097653111',
      //     name: 'Eag Thdhdart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '554432511',
      //     name: 'Efrsrvt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '22444432211',
      //     name: 'rrrrrrrrr',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '66474664',
      //     name: 'ytytyt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55753333333',
      //     name: 'E hhafe',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1288887887111',
      //     name: 'Eg lllllaz',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '3333333333322332111',
      //     name: 'Eg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '4222210',
      //     name: 'aa Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '1144444444444422111',
      //     name: 'Etgg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '24333310911',
      //     name: 'Egg fffff',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7544444453111',
      //     name: 'Eaaaaahg Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '4114411',
      //     name: 'ffff Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '8888882',
      //     name: 'tEt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '00000000000002',
      //     name: 'ooo',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '77777777',
      //     name: 'iuiuiu',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '6666666666',
      //     name: 'E hh55',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '55555555555',
      //     name: 'Eg ggggggggg',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '4444444444',
      //     name: 'Eg ji',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '1753111',
      //     name: 'uye Tar',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '111467511',
      //     name: 'Egg oaoTart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '218920911',
      //     name: 'Eggoo Tgrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '75530111',
      //     name: 'Ehg ooTart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '92',
      //     name: 'Eag kkTart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '93',
      //     name: 'ththt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '834',
      //     name: 'Eggtttrt',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '7878',
      //     name: 'd',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '009099421',
      //     name: 'jfu',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '444',
      //     name: 'n',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '99829',
      //     name: 't',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '89',
      //     name: 'yea',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '1190909111',
      //     name: 'celery',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '210900911',
      //     name: 'play',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   }, 
      //   {
      //     sku_id: '098766432',
      //     name: 'Ehg os',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '4321',
      //     name: 'peaps Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '4455',
      //     name: 'paa',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '2244211',
      //     name: 'o',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '34',
      //     name: 'i',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '0009',
      //     name: 'E yes',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '9',
      //     name: 'Eg plant',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '01',
      //     name: 'swet',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '101123411',
      //     name: 'p',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      //   {
      //     sku_id: '1',
      //     name: 'it',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '21010911',
      //     name: 'Eggplant',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '755333111',
      //     name: 'Yam',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '411110002',
      //     name: 'Strawberry',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '589005511',
      //     name: 'Cookies',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '223211',
      //     name: 'Egygrt',
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
      //     sku_id: '09199211',
      //     name: 'Eat me',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '129000111',
      //     name: 'Omelette',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '0974211',
      //     name: 'Vegan Tart',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },        {
      //     sku_id: '199111',
      //     name: 'Peas',
      //     price: 6.2,
      //     type: 'tart',
      //     description: "Swee and sour",
      //     quantity: 11,
      //     image_url: 'egg'
      //   },
      // ]

      // Test data
      // const payload = serialize({ inventories: pa});
      const payload = serialize({ inventories: state.inventories});
      state.wsInstance.send(payload)

      // 🛠 TECH DEBT: May have to pass actual JSON instead. JSON.stringify() will not reflect nil values for objects !!!
      // state.wsInstance.send(JSON.stringify({"inventories": state.inventories}))

      return { ...state, cartItems: [] }

    case Constants.actions.RECEIVE_REAL_TIME_INVENTORY_UPDATE:
      console.debug('GOTTEN IN RECEIVE_REAL_TIME_INVENTORY_UPDATE REDUCER ===> ', action.payload);
      return {...state, inventories: action.payload }
    default:
      return {...state};
  }
}

export const InventoryContext = createContext();
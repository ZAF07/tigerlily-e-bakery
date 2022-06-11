const Constants = {
  errors: {
    NETWORK_ERROR: 'Network Error',
    STATUS_200: 'Request failed with status code 200',
    RETRY: 'retry',
    INVALID_AUTH: 'invalid auth',
    STATUS_500: 'Request failed with status code 500',
  },
  paths: {
    CHECKOUT_PATH: '/checkout',
    INVENTORY_PATH: '/inventory',
    WS_PATH: 'ws://localhost:8080/inventory/ws?token=1234&name=zaffere',
  },
  actions: {
    SET_INVENTORIES: 'SET_INVENTORIES',
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CHECKOUT_UPDATE_QUANTITY: 'CHECKOUT_UPDATE_QUANTITY',
    SET_WEBSOCKET_INSTANCE: 'SET_WEBSOCKET_INSTANCE',
    RECEIVE_REAL_TIME_INVENTORY_UPDATE: 'RECEIVE_REAL_TIME_INVENTORY_UPDATE',
    DEDUCT_CURRENT_USER_ITEM_QUANTITY: 'DEDUCT_CURRENT_USER_ITEM_QUANTITY',
  },
  encoding: {
    UTF8: 'utf-8'
  },
  RETRY_INTERVAL: 500,
  X_RETRY: 3,
};


export default Constants;
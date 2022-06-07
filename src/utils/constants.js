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
    DEDUCT_ITEM_QUANTITY: 'DEDUCT_ITEM_QUANTITY',
    SET_WEBSOCKET_INSTANCE: 'SET_WEBSOCKET_INSTANCE',
    REAL_TIME_INVENTORY_UPDATE: 'REAL_TIME_INVENTORY_UPDATE',
  },
  RETRY_INTERVAL: 500,
  X_RETRY: 3,
};


export default Constants;
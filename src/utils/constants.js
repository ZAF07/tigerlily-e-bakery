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
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    DEDUCT_ITEM_QUANTITY: 'DEDUCT_ITEM_QUANTITY',
  },
  RETRY_INTERVAL: 500,
  X_RETRY: 3,
};


export default Constants;
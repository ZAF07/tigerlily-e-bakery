/*
  TODO: 
  1) SET UP AUTH IN THE BACKEND.  
  2) SET UP AUTH IN FE (PRIVATE KEY?) 
  
  AUTH KEY HAS TO MATCH JWT TOKEN? AFTER REFRESH, TOKEN CHANGES SO WILL THIS BE SUFFICIENT ??
  
  Have to throw a new error for us to handle in the client implementation
  // throw Error('❌ Invalid Auth header')

  Think about it, i can do a lot of things here
  - Check for auth headers, must throw error in return
  - 
*/
const auth = 'token 1234'
const requestValidation = (request) => {
  console.debug('REQUEST ==> ', request)
  const authHeaders = request.headers.Authorization;
  if (authHeaders !== auth) throw new Error('invalid auth')
  
  // 💡 IDEA !! Could intercept request to determine if  WS or HTTP
  // const upgradeProtocol = request.headers.Upgrade_Protocol;
  // if (upgradeProtocol) request.baseURL = Constants.WS_PATH;

  console.log('✅ REQUEST ACCEPTED -> ', request);
  return request
}

const RequestInterceptor = {
  request: requestValidation,
} 

export default RequestInterceptor;
const auth = 'token 1234'
const requestValidation = (response) => {
  const authHeaders = response.headers.Authorization;
  if (authHeaders !== auth) {
    
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

    // return { status: 'Invalid Auth' }
    // return response
    // return Promise.reject('invalid auth')
    throw new Error('invalid auth')
  } 
  console.log('✅ REQUEST ACCEPTED -> ', response);
  return response
}

const RequestInterceptor = {
  request: requestValidation,
  // statusNotOk: responseNotOkInterceptors
} 

export default RequestInterceptor;
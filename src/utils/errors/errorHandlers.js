import Constants from "../constants"
import RetryManager from '../managers/retryManager/retry_request';
import AlertInvalidAuthToken from '../managers/alert_invalid_auth';

// ErrorHandlers
const ErrorHandlers = async (type, additionalArgs) => {
  switch (type.message) {
  case Constants.NETWORK_ERROR:
    return { status: 'NetWork Error' }
    // Constants.RETRY
  case Constants.STATUS_500:
    /*
      TODO: 
      THIS ARGUMENTS SHOULD BE ASSEMBLED HERE. THIS IS WHERE THE ERROR LOGIC LIVES. ABSTRACTED AWAY FROM THE CLIENT
      */ 

     const { apiClient, query } = additionalArgs;

     const retryResp = await RetryManager(Constants.RETRY_INTERVAL, Constants.X_RETRY, apiClient, query)
     return retryResp
  case Constants.INVALID_AUTH:
    const { message }  = additionalArgs;
    AlertInvalidAuthToken(message)
    return { status: 'Invalid auth' }
  default:
    return { status: 'Unknown. Check api/client/index.js line 24' }
}
}

export default ErrorHandlers;
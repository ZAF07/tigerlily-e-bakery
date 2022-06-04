import Constants from "../constants";
import AlertInvalidAuthToken from '../managers/alert_invalid_auth';

// ErrorHandlers
const ErrorHandlers = async (type, additionalArgs) => {
  switch (type.message) {
  case Constants.NETWORK_ERROR:
    console.debug('HA! NETWORK')
    alert(' Set global state to trigger sending a 400 page tpo client')
    return { status: 'NetWork Error' }
  case Constants.INVALID_AUTH:
    const message  = 'Please send a refresh token request. Current token has expired';
    AlertInvalidAuthToken(message)
    return { status: 'Invalid auth' }
  default:
    return { status: 'Unknown. Check api/client/index.js line 24' }
}
}

export default ErrorHandlers;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const RetryManager = async (intervalMs, maxRetries, api, query) => {
  let count = 0;
  while (count < maxRetries) {
    await sleep(intervalMs)
    try {
      const resp = await api(query)
      if (resp.status === 'ok') {
        return resp
      }
    } catch (error) {
      console.debug('ERROR IN RETRY : ', error);
    } finally {
      count += 1
    }
  }
  return { status: 'error', payload: null }

}

export default RetryManager;
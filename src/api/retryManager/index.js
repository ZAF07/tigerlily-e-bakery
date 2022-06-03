import { logDOM } from "@testing-library/react";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const RetryManager = async (intervalMs, maxRetries, api, query) => {
  console.log(')))))))))))))) : ', query);
  let count = 0;
  while (count < maxRetries) {
    await sleep(intervalMs)
      const resp = await api(query)
      // const resp = await api(`?limit=0&offset=0`, 0, 0)
      if (resp.status === 'ok') {
        return resp
      }
      count += 1
  }
  return { status: 'error' }

}

export default RetryManager;
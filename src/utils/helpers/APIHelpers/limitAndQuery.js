const GenerateLimitAndOffsetString = (limit, offset) => {
  return `limit=${limit}&offset=${offset}`
}

export default GenerateLimitAndOffsetString;
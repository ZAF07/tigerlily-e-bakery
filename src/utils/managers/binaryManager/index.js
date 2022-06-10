const ConvertBinary = (payload) => {
  return new TextEncoder('utf-8').encode(JSON.stringify(payload)).buffer
}

const DecodeBinary = (payload) => {
  const decodedData = new TextDecoder('utf-8').decode(payload)
  return JSON.parse(decodedData)
}


const InitBinaryManager = () => {
  return { 
    ConvertBinary,
    DecodeBinary
  }
}

export default InitBinaryManager;
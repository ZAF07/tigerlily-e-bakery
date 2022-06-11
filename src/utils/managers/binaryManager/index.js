import Constants from "../../constants";

const ConvertBinary = (payload) => {
  // return new TextEncoder('utf-8').encode(JSON.stringify(payload)).buffer
    let output = '',
        input = JSON.stringify(payload) // convert the json to string.
    // loop over the string and convert each charater to binary string.
    for (let i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " ";
    }
    return output.trimEnd();  
}

const DecodeBinary = (payload) => {
  const start = performance.now()
  
  const decodedData = new TextDecoder(Constants.encoding.UTF8).decode(payload)
  var newBinary = decodedData.split(" ");
    var binaryCode = [];
    for (let i = 0; i < newBinary.length; i++) {
        binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
    }

    let jsonString = binaryCode.join("");
    console.warn('DECODING DATA => ', performance.now() - start);
    return JSON.parse(jsonString)  
    // Old implemetation when using TextEncode()
    // const decodedData = new TextDecoder().decode(payload)
    // console.warn(decodedData);
    // return JSON.parse(decodedData)
  }
  
  
  const InitBinaryManager = () => {
    return { 
      ConvertBinary,
      DecodeBinary
    }
  }
  
  export default InitBinaryManager;
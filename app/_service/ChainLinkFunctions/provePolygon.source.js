const tx = args[0];

const url = `https://polygon-mumbai.infura.io/v3/1b4fd85ec53748feae973ece5bc436bd`;

const txInfoRequest = Functions.makeHttpRequest({
  url: url,
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
  data: `{"method":"eth_getTransactionReceipt","params":["${tx}"],"id":43,"jsonrpc":"2.0"}`,
});

const txInfoResponse = await txInfoRequest;
if (txInfoResponse.error) {
  console.error(txInfoResponse.error);
  throw Error("Request failed");
}

// Execute the API request (Promise)
const data = txInfoResponse["data"];
if (data.error) {
  console.error(data.error.message);
  throw Error(`Functional error. Read message: ${data.error.message}`);
}

const gasUsed = data.result.gasUsed;
const sender = data.result.from;
const to = data.result.to;

return Functions.encodeString(JSON.stringify({ gasUsed, sender, to }));

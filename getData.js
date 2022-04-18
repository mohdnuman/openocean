const Web3 = require("web3");

const poolAbi = require("./abi.json");
const tokenAbi = require("./erc20.json");

let web3;

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

async function getBalance1(address) {
  const EthPoolAddress = "0x44Cdb4a71A806c30dfF34a8bDFD59551021e4947";
  const EthPoolInstance = new web3.eth.Contract(poolAbi, EthPoolAddress);
  const tokenAddress = "0x7778360F035C589fCE2f4eA5786CbD8B36e5396B";
  const tokenInstance = new web3.eth.Contract(tokenAbi, tokenAddress);

  const LPtokensRecieved = await EthPoolInstance.methods
    .userCollateral(address)
    .call();
  const totalSupplyLP = await EthPoolInstance.methods.totalCollateral().call();
  const decimals = await tokenInstance.methods.decimals().call();
  let Ethrewards = await EthPoolInstance.methods.pendingReward(address).call();
  Ethrewards = (Ethrewards / 10 ** decimals).toFixed(2);

  const percentage = (LPtokensRecieved / totalSupplyLP) * 100;

  const eth = (percentage * 0.377877).toFixed(2);
  const ooe = (percentage * 12060).toFixed(2);

  if (eth != 0 && ooe != 0) {
    console.log("WETH+OOE", eth,"+",ooe);
    console.log("rewards:", Ethrewards);
  }
}
async function getBalance2(address) {
  const USDCPoolAddress = "0x0d21A1db4d4beFD575E77D5D3F0d0D5f9E54bA44";
  const UsdcPoolInstance = new web3.eth.Contract(poolAbi, USDCPoolAddress);
  const tokenAddress = "0x7778360F035C589fCE2f4eA5786CbD8B36e5396B";
  const tokenInstance = new web3.eth.Contract(tokenAbi, tokenAddress);

  const decimals = await tokenInstance.methods.decimals().call();


  const USDCLPtokensRecieved = await UsdcPoolInstance.methods
    .userCollateral(address)
    .call();
  const USDCtotalSupplyLP = await UsdcPoolInstance.methods
    .totalCollateral()
    .call();

  let USDCrewards = await UsdcPoolInstance.methods
    .pendingReward(address)
    .call();
  USDCrewards = (USDCrewards / 10 ** decimals).toFixed(2);

  const USDCpercentage = (USDCLPtokensRecieved / USDCtotalSupplyLP) * 100;

  const usdc = (USDCpercentage * 2315.13).toFixed(2);
  const ooe2 = (USDCpercentage * 21184).toFixed(2);

  if (usdc != 0 && ooe2 != 0) {
    console.log("USDC+OOE", usdc,"+",ooe2);
    console.log("rewards:", USDCrewards);
  }
}

async function getBalance3(address) {
  const OEEPoolAddress = "0xB99D38eB69214e493B1183FFA3d561FC9F75D519";
  const OeePoolInstance = new web3.eth.Contract(poolAbi, OEEPoolAddress);
  const tokenAddress = "0x7778360F035C589fCE2f4eA5786CbD8B36e5396B";
  const tokenInstance = new web3.eth.Contract(tokenAbi, tokenAddress);

  const decimals = await tokenInstance.methods.decimals().call();


  let ooe3 = await OeePoolInstance.methods.userCollateral(address).call();
  let OEErewards = await OeePoolInstance.methods.pendingReward(address).call();

  ooe3 = (ooe3 / 10 ** decimals).toFixed(2);
  OEErewards = (OEErewards / 10 ** decimals).toFixed(2);

  if (ooe3 != 0) {
    console.log("OOE:", ooe3);
    console.log("rewards:", OEErewards);
  }
}

let address = "0x0ae25fbfc7b88a56123731fe62c9af1ee7507cfc";
getBalance1(address);
getBalance2(address);
getBalance3(address);

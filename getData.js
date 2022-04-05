const Web3 = require("web3");

const poolAbi = require("./abi.json");
const tokenAbi = require("./erc20.json");

const readline = require("readline-sync");

let web3;

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

const EthPoolAddress = "0x44Cdb4a71A806c30dfF34a8bDFD59551021e4947";
const OEEPoolAddress = "0xB99D38eB69214e493B1183FFA3d561FC9F75D519";
const USDCPoolAddress = "0x0d21A1db4d4beFD575E77D5D3F0d0D5f9E54bA44";

const tokenAddress = "0x7778360F035C589fCE2f4eA5786CbD8B36e5396B";

const EthPoolInstance = new web3.eth.Contract(poolAbi, EthPoolAddress);
const UsdcPoolInstance = new web3.eth.Contract(poolAbi, USDCPoolAddress);
const OeePoolInstance = new web3.eth.Contract(poolAbi, OEEPoolAddress);
const tokenInstance = new web3.eth.Contract(tokenAbi, tokenAddress);

async function getBalance() {
  let address = readline.question("enter address:");

  //----------------OEE/ETH pool-------------------------------------

  console.log("OOE/ETH pool:");

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

  console.log("ETH:", eth);
  console.log("OOE:", ooe);
  console.log("rewards:", Ethrewards);

  //---------------OEE/USDC-------------------------------


  console.log("OOE/USDC pool:");

  const USDCLPtokensRecieved = await UsdcPoolInstance.methods
    .userCollateral(address)
    .call();
  const USDCtotalSupplyLP = await UsdcPoolInstance.methods.totalCollateral().call();
//   const decimals = await tokenInstance.methods.decimals().call();
  let USDCrewards = await UsdcPoolInstance.methods.pendingReward(address).call();
  USDCrewards = (USDCrewards / 10 ** decimals).toFixed(2);

  const USDCpercentage = (USDCLPtokensRecieved / USDCtotalSupplyLP) * 100;

  const usdc = (USDCpercentage * 2315.13).toFixed(2);
  const ooe2 = (USDCpercentage * 21184).toFixed(2);

  console.log("USDC:", usdc);
  console.log("OOE:", ooe2);
  console.log("rewards:", USDCrewards);

  //-------------OEE staking---------------------
  console.log("OOE staking:");

//   const decimals=await tokenInstance.methods.decimals().call();
  let ooe3= await OeePoolInstance.methods.userCollateral(address).call();
  let OEErewards=await OeePoolInstance.methods.pendingReward(address).call();

  ooe3=(ooe3/(10**decimals)).toFixed(2);
  OEErewards=(OEErewards/(10**decimals)).toFixed(2);

  console.log('OOE:',ooe3);
  console.log('rewards:',OEErewards);
}

getBalance();

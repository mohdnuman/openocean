const Web3 = require("web3");
const prompt = require("prompt-sync")();

const Abi = require("./abi.json");

let web3;

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

async function getBalance1(address) {
  const EthPoolAddress = "0x44Cdb4a71A806c30dfF34a8bDFD59551021e4947";
  const EthPoolInstance = new web3.eth.Contract(Abi, EthPoolAddress);
  const tokenAddress = "0x7778360F035C589fCE2f4eA5786CbD8B36e5396B";
  const tokenInstance = new web3.eth.Contract(Abi, tokenAddress);

  const LPtokensRecieved = await EthPoolInstance.methods
    .userCollateral(address)
    .call();
  const totalSupplyLP = await EthPoolInstance.methods.totalCollateral().call();
  const decimals = await tokenInstance.methods.decimals().call();
  let Ethrewards = await EthPoolInstance.methods.pendingReward(address).call();
  Ethrewards = (Ethrewards / 10 ** decimals).toFixed(2);

  
  let stakeToken=await EthPoolInstance.methods.stakeToken().call();
  let LPtoken=new web3.eth.Contract(Abi,stakeToken);

  let reserves=await LPtoken.methods.getReserves().call();

  const percentage = (LPtokensRecieved / totalSupplyLP) ;

  const ooe = (percentage * (reserves._reserve0/10**18)).toFixed(2);
  const eth = (percentage * (reserves._reserve1/10**18)).toFixed(2);

  if (eth != 0 && ooe != 0) {
    console.log("OOE+WETH", ooe, "+", eth);
    console.log("rewards:", Ethrewards,'OOE');
  }
}
async function getBalance2(address) {
  const USDCPoolAddress = "0x0d21A1db4d4beFD575E77D5D3F0d0D5f9E54bA44";
  const UsdcPoolInstance = new web3.eth.Contract(Abi, USDCPoolAddress);
  const tokenAddress = "0x7778360F035C589fCE2f4eA5786CbD8B36e5396B";
  const tokenInstance = new web3.eth.Contract(Abi, tokenAddress);

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

  let stakeToken=await UsdcPoolInstance.methods.stakeToken().call();
  let LPtoken=new web3.eth.Contract(Abi,stakeToken);

  let reserves=await LPtoken.methods.getReserves().call();

  const USDCpercentage = (USDCLPtokensRecieved / USDCtotalSupplyLP);

  const ooe2 = (USDCpercentage * (reserves._reserve0/10**18)).toFixed(2);
  const usdc = (USDCpercentage * (reserves._reserve1/10**6)).toFixed(2);

  if (usdc != 0 && ooe2 != 0) {
    console.log("OOE+USDC", ooe2, "+", usdc);
    console.log("rewards:", USDCrewards ,'OOE');
  }
}

async function getBalance3(address) {
  const OEEPoolAddress = "0xB99D38eB69214e493B1183FFA3d561FC9F75D519";
  const OeePoolInstance = new web3.eth.Contract(Abi, OEEPoolAddress);
  const tokenAddress = "0x7778360F035C589fCE2f4eA5786CbD8B36e5396B";
  const tokenInstance = new web3.eth.Contract(Abi, tokenAddress);

  const decimals = await tokenInstance.methods.decimals().call();

  let ooe3 = await OeePoolInstance.methods.userCollateral(address).call();
  let OEErewards = await OeePoolInstance.methods.pendingReward(address).call();

  ooe3 = (ooe3 / 10 ** decimals).toFixed(2);
  OEErewards = (OEErewards / 10 ** decimals).toFixed(2);

  if (ooe3 != 0) {
    console.log("OOE:", ooe3);
    console.log("rewards:", OEErewards,'OOE');
  }
}

const userAddr = prompt("User Address-");
getBalance1(userAddr);
getBalance2(userAddr);
getBalance3(userAddr);

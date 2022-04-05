const Web3 = require("web3");

const poolAbi = require("./abi.json");
const tokenAbi=require("./erc20.json");


const readline = require("readline-sync");

let web3;

const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/287af69fca9142f3b1681a93ce4c3afa"
);
web3 = new Web3(provider);

const poolAddress="0x44Cdb4a71A806c30dfF34a8bDFD59551021e4947";
const tokenAddress="0x7778360F035C589fCE2f4eA5786CbD8B36e5396B";


const poolInstance = new web3.eth.Contract(
  poolAbi,
  poolAddress
);
const tokenInstance = new web3.eth.Contract(
    tokenAbi,
    tokenAddress
  );


async function getBalance() {
  let address = readline.question("enter address:");

  console.log("OOE/ETH pool:");

  const LPtokensRecieved= await poolInstance.methods.userCollateral(address).call();
  const totalSupplyLP= await poolInstance.methods.totalCollateral().call();
  const decimals=await tokenInstance.methods.decimals().call();
  let rewards=await poolInstance.methods.pendingReward(address).call();
  rewards=(rewards/(10**decimals)).toFixed(2);

  const percentage=(LPtokensRecieved/totalSupplyLP)*100;

  const eth=(percentage*0.377877).toFixed(2);
  const ooe=(percentage*12060).toFixed(2);


  console.log('ETH:',eth);
  console.log('OOE:',ooe);
  console.log('rewards:',rewards);



}

getBalance();


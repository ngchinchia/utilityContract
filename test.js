const { ethers } = require("ethers");

const ADDR = "0xD90045747714a0c2963B9C0dfD8a01ff543A9242"; // your contract address
const ABI =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "tokens",
          "type": "address[]"
        }
      ],
      "name": "getBalances",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

const ADDRESS = "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5"; // some wallet address with token balance
const TOKENS = [
  // token contract addresses
  "0x8C2Ce7793d5A986919bc7b77DF5D3b057B570321",
  "0xD0D8bff9335c90bd5FbFa0a06b5403843316fE61",
];

// you can use your own RPC provider URL (no need to deploy to mainnet)
const provider = new ethers.JsonRpcProvider("https://goerli.infura.io/v3/8e9f38bdefd240ffa298ed37a39376af");

const test = async () => {
  const contract = new ethers.Contract(ADDR, ABI, provider);
  // console.log('contract success', contract)
  const balanceObj = TOKENS.map((token) => contract.getBalances(ADDRESS, [token]));
  const balances = await Promise.all(balanceObj);
  const formatBalance = balances.map((balance, index) => ({
    token: TOKENS[index],
    balance: ethers.formatEther(balance[0])
  }));
  // console.log('balance success', balances)
  return formatBalance;
};

test().then((res) => {
	console.log(res)
}).catch(err => {
	console.log('failed:', err)
});

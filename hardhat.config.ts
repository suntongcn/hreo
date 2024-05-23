import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks:{
        hardhat:{
            chainId:1337
        },
        arb:{
            url: `https://cold-maximum-pond.arbitrum-mainnet.discover.quiknode.pro/`,
            accounts: [""]
        },
        test:{
            url: `https://goerli.infura.io/v3/`,
            accounts: [""]
        }
    }
};
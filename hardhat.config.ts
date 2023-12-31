import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import "hardhat-contract-sizer";
import "@nomiclabs/hardhat-solpp";
import "@nomicfoundation/hardhat-chai-matchers";

// setup the environment variables
dotenvConfig({ path: resolve(__dirname, "./.env") });

let testConfig = {
  SHUFFLE_UNIT_TEST: true,
};

let contractDefs = {
  test: testConfig,
  localhost: testConfig,
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.4", // semaphore is using 0.8.4
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  typechain: {
    target: "ethers-v5",
    outDir: "types",
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    artifacts: "./artifacts/contract-artifacts",
    cache: "./artifacts/cache",
  },
  networks: {
    env: {
      url: process.env.URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? process.env.PRIVATE_KEY.split(",")
          : [],
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
  mocha: {
    timeout: 100000000,
  },
};

export default {
  ...config,
  docgen: {
    pages: (contracts: any) => `${contracts.name}.md`,
  },
};

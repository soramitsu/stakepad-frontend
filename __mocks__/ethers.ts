import BigNumber from "bignumber.js";

type MockWeb3Provider = {
  gas: string;
  address: string;
  api_key: string;
  getCode(): string;
  getGasPrice(): BigNumber;
  estimateGas(): string;
  getFeeData(): { gasPrice: BigNumber };
  getTransactionCount(): string;
};

type MockJsonRpcProvider = {
  gas: string;
  node: string;
  getGasPrice(): BigNumber;
  estimateGas(): string;
  getFeeData(): { gasPrice: BigNumber };
  getTransactionCount(): string;
  getCode(): string;
};

type MockContract = {
  decimals: () => number;
  estimateGas: {
    transfer: () => BigNumber;
  };
  transfer: () => {
    hash: string;
  };
};

const gas = "21000";
const nonce = "1";
const code = "0x";

export const ethers = {
  providers: {
    Web3Provider: function (
      this: MockWeb3Provider,
      address: string,
      apiKey: string,
    ) {
      this.gas = gas;
      this.address = address;
      this.api_key = apiKey;
      this.getCode = () => code;
      this.getGasPrice = () => new BigNumber(this.gas);
      this.estimateGas = () => this.gas;
      this.getFeeData = () => ({ gasPrice: new BigNumber(this.gas) });
      this.getTransactionCount = () => nonce;
    },
    JsonRpcProvider: function (this: MockJsonRpcProvider, node: string) {
      this.gas = gas;
      this.node = node;
      this.getGasPrice = () =>
        Promise.resolve(new BigNumber(this.gas)) as unknown as BigNumber;
      this.estimateGas = () => this.gas;
      this.getFeeData = () => ({ gasPrice: new BigNumber(this.gas) });
      this.getTransactionCount = () => nonce;
      this.getCode = () => code;
    },
  },
  utils: {
    parseEther: (amount: string | number) => {
      return new BigNumber(amount).mul(Math.pow(10, 18)).toString();
    },
    formatEther: (amount: string | number) => {
      return "0.000001";
    },
    parseUnits: (amount: string, decimals: number) => {
      return new BigNumber(amount).mul(Math.pow(10, decimals)).toString();
    },
    isAddress: (address: string) => {
      return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
    },
    hexlify: (amount: number) => {
      const value = amount.toString(16);
      if (value.length % 2) {
        return "0x0" + value;
      }
      return code + value;
    },
  },
  Contract: function (this: MockContract) {
    this.decimals = () => 18;
    this.estimateGas = {
      transfer: () => new BigNumber(21000),
    };
    this.transfer = () => ({
      hash: "0x5555555555555555555555555555555555555555555555555555555555555555",
    });
  },
};

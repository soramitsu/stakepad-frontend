import { ethers } from "ethers";
import BN from 'bignumber.js'

export class EthersWrapper {
  async getProvider () {
    return new ethers.providers.JsonRpcProvider();
  }

  async getSigner (provider: ethers.providers.JsonRpcProvider) {
    return provider.getSigner()
  }

  async getMetamaskProvider () {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any)
    await provider.send("eth_requestAccounts", []);
    return provider
  }

  verifyAddress (address: string) {
    return ethers.utils.isAddress(address.toLowerCase())
  }

  createContract(contractAddress: string, abi: any, provider: ethers.providers.JsonRpcProvider) {
    return new ethers.Contract(contractAddress, abi, provider.getSigner())
  }

  transferContract(signer: ethers.providers.JsonRpcSigner, contract: ethers.Contract, amount: string) {
    const signedContract = contract.connect(signer)
    return signedContract.transfer("ricmoo.firefly.eth", amount)
  }

  sendTransaction (signer: ethers.providers.JsonRpcSigner, to: string, from: string, amount: string) {
    return signer.sendTransaction({
      to,
      from,
      value: amount,
      nonce: signer.getTransactionCount(from)
    })
  }

  signMessage (provider: ethers.providers.JsonRpcProvider, message: string) {
    const signer = provider.getSigner()
    return signer.signMessage(message)
  }

  async getGasNative (provider: ethers.providers.JsonRpcProvider, gasLimit: string | number) {
    const feeData = await provider.getFeeData()
    const gasPrice = feeData.gasPrice?.toString() || '0'
    const gasTotal = new BN(gasLimit).multipliedBy(gasPrice).toString()
    return new BN(gasTotal)
      .dividedBy(new BN(10).exponentiatedBy(18))
      .toString()
  }

  async getGasContract (provider: ethers.providers.JsonRpcProvider, contract: ethers.Contract) {
    const gasLimit = await contract.estimateGas.transfer()
    const gasPrice = await provider.getGasPrice()

    return new BN(gasPrice.toString())
      .multipliedBy(gasLimit.toString())
      .toString()
  }
}

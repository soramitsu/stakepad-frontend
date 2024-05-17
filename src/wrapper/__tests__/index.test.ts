import { EthersWrapper } from "..";
import { describe, it, expect, vi } from "vitest";

describe("ethersWrapper", async () => {
  const ethersWrapper = new EthersWrapper();

  const mockProvider = await ethersWrapper.getProvider("0x010") as any
  const mockSigner = await ethersWrapper.getSigner(mockProvider)
  const mockContract = ethersWrapper.createContract("0x0", {}, mockProvider) as any

  vi.mock('ethers')

  it("getProvider", async () => {
    const provider = await ethersWrapper.getProvider("0x010") as any
    expect(provider.node).toEqual("0x010");
  });

  it("getSigner", async () => {
    const signer = await ethersWrapper.getSigner(mockProvider)
    expect(signer.getTransactionCount()).toEqual(100);
  });

  it("verifyAddress", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("createContract", async () => {
    const contract = ethersWrapper.createContract("0x0", {}, mockProvider) as any
    expect(contract.decimals()).toEqual(18);
    expect(String(contract.estimateGas.transfer())).toEqual('21000');
  });

  it("transferContract", async () => {
    expect((ethersWrapper.transferContract(mockContract, mockContract, "100")).hash).toEqual('0x5555555555555555555555555555555555555555555555555555555555555555');
  });

  it("sendTransaction", async () => {
    expect(await ethersWrapper.sendTransaction(mockSigner, "0x0", "0x0", '100')).toEqual({
      hash: '0x0'
    });
  });

  it("signMessage", async () => {
    expect(await ethersWrapper.signMessage(mockProvider, 'message')).toEqual({message: 'message'});
  });

  it("getGasNative", async () => {
    expect(await ethersWrapper.getGasNative(mockProvider, '100')).toEqual("210000");
  });

  it("getGasContract", async () => {
    expect(await ethersWrapper.getGasContract(mockProvider, mockContract)).toEqual("441000000");
  });
});

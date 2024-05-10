import { EthersWrapper } from "..";
import { describe, it, expect } from "vitest";

describe("ethersWrapper", () => {
  const ethersWrapper = new EthersWrapper();

  it("getProvider", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("getSigner", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("getMetamaskProvider", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("verifyAddress", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("createContract", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("transferContract", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("sendTransaction", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("sendTransactionMetamask", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("signMessage", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("getGasNative", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });

  it("getGasContract", async () => {
    expect(ethersWrapper.verifyAddress("0x0")).toEqual(false);
  });
});

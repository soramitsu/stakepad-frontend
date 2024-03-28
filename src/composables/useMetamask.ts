import { ref } from "vue";
import detectEthereumProvider from "@metamask/detect-provider";

export const useMetamask = () => {
  const hasProvider = ref(false);
  const wallet = ref({
    accounts: [],
  });

  const getProvider = async () => {
    const provider = await detectEthereumProvider({ silent: true });
    hasProvider.value = Boolean(provider);
  };

  getProvider();

  const updateWallet = async (accounts: any) => {
    wallet.value.accounts = accounts;
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
    console.log(wallet.value);
  };

  return {
    hasProvider,
    wallet,
    handleConnect,
  };
};

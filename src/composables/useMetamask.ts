import { ref } from "vue";
import detectEthereumProvider from "@metamask/detect-provider";

// Metamask compose for getting the access to the user's accounts addresses
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
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  };

  return {
    hasProvider,
    wallet,
    handleConnect,
  };
};

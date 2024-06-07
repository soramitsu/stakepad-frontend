<template>
  <div class="flex gap-[24px] items-center justify-center h-full bg-[#2F2FA2]">
    <n-card hoverable class="w-[300px]">
      <div
        v-if="!isLoading"
        class="flex flex-col text-center h-[200px] justify-between"
      >
        <MetamaskIcon />
        <n-button
          class="relative mt-[24px]"
          dashed
          type="primary"
          @click="connectMetamask"
        >
          Connect to MetaMask
        </n-button>
      </div>

      <div
        v-else
        class="h-[150px] flex flex-col text-center justify-between items-center"
      >
        <p>Connected</p>
        <NSpin />
      </div>
    </n-card>

    <n-card v-if="!isLoading" hoverable class="w-[300px]">
      <div class="flex flex-col text-center h-[200px] justify-between">
        <WalletConnectIcon />
        <n-button
          class="relative mt-[24px]"
          dashed
          type="primary"
          @click="connectWalletConnect"
        >
          Connect to WalletConnect
        </n-button>
      </div>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { NCard, NButton, NSpin } from "naive-ui";
import { useAccountsStore } from "@/stores/accounts";
import { useMetamask } from "@/composables/useMetamask";
import MetamaskIcon from "@/assets/icons/metamask.svg";
import WalletConnectIcon from "@/assets/icons/walletconnect.svg";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5";

const accountsStore = useAccountsStore();
const { wallet, handleConnect } = useMetamask();

const isLoading = ref(false);
const router = useRouter();

const connectMetamask = async () => {
  await handleConnect();
  accountsStore.wallet = wallet.value;
  if (wallet.value.accounts?.length) {
    isLoading.value = true;
    setTimeout(() => {
      router.push("/select");
    }, 1000);
  }
};

const connectWalletConnect = () => {
  const mainnet = {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  };

  const metadata = {
    name: "Stakepad",
    description: "",
    url: "",
    icons: [],
  };

  const ethersConfig = defaultConfig({
    /*Required*/
    metadata,
  });

  const modal = createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId: "6254c63a50dd8ca1c162b5e0dd5b36b5",
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
  });

  modal.subscribeEvents((event) => {
    if (event.data.event === "MODAL_CLOSE") {
      accountsStore.wallet = { accounts: [modal.getAddress() as string] };
      isLoading.value = true;
      setTimeout(() => {
        router.push("/select");
      }, 100);
    }
  });
  modal.open();
};
</script>

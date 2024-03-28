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
          @click="connect"
        >
          Connect to MetaMask
        </n-button>
      </div>

      <div
        v-else
        class="h-[150px] flex flex-col text-center justify-between items-center"
      >
        <p>
          Connected as
          <n-text type="success" class="cursor-pointer">{{
            wallet.accounts[0]
          }}</n-text>
        </p>
        <NSpin />
      </div>
    </n-card>

    <n-card v-if="!isLoading" hoverable class="w-[300px]">
      <div
        class="flex flex-col text-center h-[200px] justify-between"
      >
        <MetamaskIcon />
        <n-button
          class="relative mt-[24px]"
          dashed
          type="primary"
          @click="router.push('/dashboard/pools')"
        >
          Connect to MetaMask
        </n-button>
      </div>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { NCard, NButton, NSpin, NText } from "naive-ui";
import { useAccountsStore } from "@/stores/accounts";
import { useMetamask } from "@/composables/useMetamask";
import MetamaskIcon from "@/assets/icons/metamask.svg";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AreaChartRound } from "@vicons/material";

const accountsStore = useAccountsStore();
const { wallet, handleConnect } = useMetamask();

const isLoading = ref(false);
const router = useRouter();

const connect = async () => {
  await handleConnect();
  accountsStore.wallet = wallet.value;
  if (wallet.value.accounts?.length) {
    isLoading.value = true;
    setTimeout(() => {
      router.push("/select");
    }, 1000);
  }
};
</script>

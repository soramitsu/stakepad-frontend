<template>
  <div class="flex justify-center items-center h-full">
    <div class="w-[1200px] p-[20px] bg-white shadow-md rounded-[4px]">
      <n-form>
        <n-grid :cols="2" :x-gap="24">
          <n-form-item-gi label="To" :span="1">
            <n-input
              v-model:value="tx.to"
              placeholder="0xb794f5ea0ba39494ce839613fffba74279579268"
            />
          </n-form-item-gi>

          <n-form-item-gi label="Amount" :span="1">
            <n-input v-model:value="tx.amount" placeholder="1000" />
          </n-form-item-gi>
        </n-grid>
      </n-form>

      <n-button type="success" strong dashed @click="sendTx">
        Send a transaction
      </n-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { NInput, NForm, NFormItemGi, NButton, NGrid } from "naive-ui";
import { EthersWrapper } from "@/wrapper";
import { useAccountsStore } from "@/stores/accounts";

const tx = ref({
  to: "",
  amount: "",
});

const accounts = useAccountsStore();
const ethersWrapper = new EthersWrapper();

const sendTx = () => {
  ethersWrapper.sendTransactionMetamask(
    tx.value.to,
    accounts.wallet.accounts[0],
    tx.value.amount,
  );
};
</script>

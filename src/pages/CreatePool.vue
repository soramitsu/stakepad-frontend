<template>
  <div class="flex justify-center items-center h-full">
    <div class="w-[1200px] p-[20px] bg-white shadow-md rounded-[4px]">
      <n-space justify="space-between">
        <n-h1> Pool Creation </n-h1>
        <n-button type="info" secondary strong @click="$router.push('/pools')">
          Go to staking pools
        </n-button>
      </n-space>

      <n-form>
        <n-grid :cols="2" :x-gap="24">
          <n-form-item-gi label="Contract address" :span="1">
            <n-input
              v-model:value="pool.contract"
              placeholder="0xb794f5ea0ba39494ce839613fffba74279579268"
            />
          </n-form-item-gi>

          <n-form-item-gi label="Token address" :span="1">
            <n-input
              v-model:value="pool.token"
              placeholder="0xb794f5ea0ba39494ce839613fffba74279579268"
            />
          </n-form-item-gi>

          <n-form-item-gi label="Reward token address" :span="1">
            <n-input
              v-model:value="pool.rewardToken"
              placeholder="0xb794f5ea0ba39494ce839613fffba74279579268"
            />
          </n-form-item-gi>

          <n-form-item-gi label="Reward per block" :span="1">
            <n-input-number
              v-model:number="pool.reward"
              :show-button="false"
              class="w-full"
              placeholder="0"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>

      <n-button type="success" strong dashed @click="create"> Create </n-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
} from "naive-ui";
import { usePoolsStore } from "@/stores/pools";
import { useRouter } from "vue-router";

const pool = ref({
  contract: "",
  token: "",
  rewardToken: "",
  reward: 0,
});

const poolsStore = usePoolsStore();
const router = useRouter();

const create = () => {
  poolsStore.createPool(pool.value);
  router.push("/pools");
};
</script>

<template>
  <div
    class="min-h-full bg-white shadow-md rounded-[4px] max-w-[1200px] mx-auto p-[30px]"
  >
    <n-space justify="space-between" class="mb-8">
      <n-h1> Pool </n-h1>
      <n-button type="info" secondary strong @click="$router.push('/pools')">
        Go to staking pools
      </n-button>
    </n-space>

    <n-grid :cols="2" :x-gap="16" :y-gap="16">
      <n-gi :span="2">
        <n-statistic label="Contract address" :value="pool.contract" />
      </n-gi>
      <n-gi :span="1">
        <n-statistic label="Stake amount" :value="pool.stake" />
      </n-gi>
      <n-gi :span="1">
        <n-statistic label="Tokens" :value="pool.tokens" />
      </n-gi>
      <n-gi :span="1">
        <n-statistic label="Rewards" :value="pool.rewards" />
      </n-gi>
      <n-gi :span="1">
        <n-statistic label="Claimed" :value="pool.claimed" />
      </n-gi>
      <n-gi :span="1">
        <n-statistic
          label="End time"
          :value="new Date(pool.endTime).toLocaleDateString()"
        />
      </n-gi>
      <n-gi :span="1"></n-gi>
      <n-gi :span="1">
        <n-statistic label="Claimed by you" :value="pool.claimedBy" />
      </n-gi>
      <n-gi :span="1">
        <n-statistic label="Staked by you" :value="pool.stakedBy" />
      </n-gi>
    </n-grid>

    <n-space
      class="mt-6"
      @click="
        () => {
          pool.claimedBy = pool.rewardsBy;
          pool.rewardsBy = 0;
        }
      "
    >
      <div class="cursor-pointer">
        <n-card hoverable embedded class="w-[200px] h-[200px]">
          <div class="flex flex-col text-center justify-between items-center">
            <n-h2> Claim </n-h2>
            <n-icon :size="60" color="#2F2FA2" class="mt-6">
              <WidgetsOutlined />
            </n-icon>
          </div>
        </n-card>
      </div>

      <div class="cursor-pointer" @click="pool.stakedBy += 100">
        <n-card hoverable embedded class="w-[200px] h-[200px]">
          <div class="flex flex-col text-center justify-between items-center">
            <n-h2> Stake </n-h2>
            <n-icon :size="60" color="#2F2FA2" class="mt-6">
              <AddChartFilled />
            </n-icon>
          </div>
        </n-card>
      </div>

      <div class="cursor-pointer" @click="pool.stakedBy = 0">
        <n-card hoverable embedded class="w-[200px] h-[200px]">
          <div class="flex flex-col text-center justify-between items-center">
            <n-h2> Withdraw </n-h2>
            <n-icon :size="60" color="#2F2FA2" class="mt-6">
              <MergeTypeSharp />
            </n-icon>
          </div>
        </n-card>
      </div>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { usePoolsStore } from "@/stores/pools";
import { Pool } from "@/types";
import {
  NSpace,
  NButton,
  NH1,
  NGrid,
  NGi,
  NStatistic,
  NCard,
  NH2,
  NIcon,
} from "naive-ui";
import { useRoute } from "vue-router";
import {
  AddChartFilled,
  MergeTypeSharp,
  WidgetsOutlined,
} from "@vicons/material";

const poolsStore = usePoolsStore();
const route = useRoute();
const pool = poolsStore.findByContract(route.params.id as string) as Pool;
</script>

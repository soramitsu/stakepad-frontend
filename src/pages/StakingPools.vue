<template>
  <div
    class="h-full bg-white shadow-md rounded-[4px] max-w-[1200px] mx-auto p-[30px]"
  >
    <n-space justify="space-between" class="mb-8">
      <n-h1> Staking Pools </n-h1>
      <n-button type="info" secondary strong @click="$router.push('/create')">
        Create a pool
      </n-button>
    </n-space>
    <n-data-table
      class="cursor-pointer"
      :pagination="{ defaultPage: 1, defaultPageSize: 10 }"
      :data="poolsStore.pools"
      :columns="columns"
    />
  </div>
</template>
<script setup lang="ts">
import { NDataTable, NSpace, NButton, NH1 } from "naive-ui";
import { usePoolsStore } from "@/stores/pools";
import { Pool } from "@/types";
import { h } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const columns = [
  {
    title: "Stake amount",
    key: "stake",
  },
  {
    title: "Contract address",
    key: "contract",
    render: (row: Pool) => {
      return h(
        "div",
        { onClick: () => router.push(`/pool/${row.contract}`) },
        row.contract,
      );
    },
  },
  {
    title: "Tokens",
    key: "tokens",
  },
  {
    title: "Claimed",
    key: "claimed",
  },
  {
    title: "Rewards",
    key: "rewards",
  },
  {
    title: "End time",
    key: "endTime",
    render: (row: Pool) => {
      return new Date(row.endTime).toLocaleDateString();
    },
  },
];

const poolsStore = usePoolsStore();
</script>

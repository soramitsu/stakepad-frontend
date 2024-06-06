<template>
  <div class="flex flex-col items-center justify-center h-full bg-[#2F2FA2]">
    <n-space>
      <div class="cursor-pointer" @click="$router.push('/create')">
        <n-card hoverable embedded class="w-[200px] h-[200px]">
          <div class="flex flex-col text-center justify-between items-center">
            <n-h2> Create a Pool </n-h2>
          </div>
        </n-card>
      </div>

      <div class="cursor-pointer" @click="$router.push('/pools')">
        <n-card hoverable embedded class="w-[200px] h-[200px]">
          <div class="flex flex-col text-center justify-between items-center">
            <n-h2> Staking Pools </n-h2>
          </div>
        </n-card>
      </div>

      <div class="cursor-pointer" @click="$router.push('/test')">
        <n-card hoverable embedded class="w-[200px] h-[200px]">
          <div class="flex flex-col text-center justify-between items-center">
            <n-h2> Test </n-h2>
          </div>
        </n-card>
      </div>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { NCard, NSpace, NH2 } from "naive-ui";
</script>

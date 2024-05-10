<template>
  <div class="flex flex-col items-center justify-center h-full bg-[#2F2FA2]">
    <n-space>
      <div class="cursor-pointer" @click="$router.push('/create')">
        <n-card hoverable embedded class="w-[200px] h-[200px]">
          <div class="flex flex-col text-center justify-between items-center">
            <n-h2> Create a Pool </n-h2>
            <n-icon :size="60" color="#2F2FA2" class="mt-6">
              <Coins />
            </n-icon>
          </div>
        </n-card>
      </div>

      <div class="cursor-pointer" @click="$router.push('/pools')">
        <n-card hoverable embedded class="w-[200px] h-[200px]">
          <div class="flex flex-col text-center justify-between items-center">
            <n-h2> Staking Pools </n-h2>
            <n-icon :size="60" color="#2F2FA2" class="mt-6">
              <BookCoins20Regular />
            </n-icon>
          </div>
        </n-card>
      </div>

      <div class="cursor-pointer" @click="$router.push('/test')">
        <n-card hoverable embedded class="w-[200px] h-[200px]">
          <div class="flex flex-col text-center justify-between items-center">
            <n-h2> Test </n-h2>
            <n-icon :size="60" color="#2F2FA2" class="mt-6">
              <BookCoins20Regular />
            </n-icon>
          </div>
        </n-card>
      </div>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { NCard, NSpace, NH2, NIcon } from "naive-ui";
import { Coins } from "@vicons/fa";
import { BookCoins20Regular } from "@vicons/fluent";
</script>

<template>
  <div class="rounded-[8px] border-[1px] border-[#DDE0E1] p-[16px]">
    <div class="flex flex-row justify-between">
      <div class="flex flex-row items-center gap-[4px]">
        <Token18 />
        <span class="font-semibold text-[14px] text-[#26292E]">
          Wrapped Ethereum
        </span>
      </div>

      <span v-if="showRequest" class="text-[#D0021B] font-bold text-[12px]">
        Get a staking token
      </span>
    </div>

    <p class="my-[8px] text-[#75787B] text-[12px]">Balance: 0.10054 WETH</p>

    <TextCopy text="0x40FD72257597aA14C7231A7B1aaa29Fce868F677" />
  </div>
</template>

<script setup lang="ts">
import Token18 from "@/assets/icons/token_18.svg";
import TextCopy from "./TextCopy.vue";

defineProps<{
  showRequest: boolean;
}>();
</script>

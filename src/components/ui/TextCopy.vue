<template>
  <div class="flex flex-row items-center gap-[4px]">
    <span :class="textClass">
      {{ text }}
    </span>
    <div class="relative flex flex-row">
      <div
        v-if="isCopied"
        class="absolute top-[-24px] -left-1/2 translate-x-1/2 bg-[#2D2926] rounded-[4px] py-[8px] px-[12px] text-white text-[12px] z-[1000000]"
      >
        Copied!
      </div>
      <CopyOff v-if="!isCopied" class="cursor-pointer" @click="copy" />
      <CopyOn v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import CopyOn from "@/assets/icons/copy_on.svg";
import CopyOff from "@/assets/icons/copy_off.svg";

const props = withDefaults(
  defineProps<{
    textClass: string;
    text: string;
  }>,
  {
    textClass: "text-[12px] text-[#75787B]",
    text: "",
  },
);

const isCopied = ref(false);

const copy = () => {
  navigator.clipboard.writeText(props.text);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 1500);
};
</script>

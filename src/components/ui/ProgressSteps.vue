<template>
  <div class="relative flex flex-row h-[44px] gap-[68px] mx-auto" :style="{ width: `${44 * length + 68 * (length - 1)}px` }">
    <div
      class="absolute h-[1px] bg-[#FAE6E8] top-1/2 left-1/2 w-full -translate-x-1/2"
    ></div>
    <div
      v-for="idx in length"
      :key="String(idx)"
      class="cursor-pointer z-10 text-[14px] rounded-[100%] w-[44px] h-[44px] text-center border-[1px] border-[#F1B3BB] flex items-center justify-center"
      :class="{
        'bg-[#D0021B] text-white': +currentStep === +idx,
        'bg-white text-[#F1B3BB]': +currentStep !== +idx,
      }"
      @click="$emit('select', idx)"
    >
      {{ idx }}
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  length: number;
  currentStep: number;
}>();

defineEmits(["select"]);
</script>

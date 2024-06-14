<template>
  <div class="grid grid-cols-2 gap-[16px]">
    <div
      v-for="option in options"
      :key="option.value"
      class="p-[16px] rounded-[8px] border-[1px] border-[#DDE0E1] cursor-pointer"
      :class="{ ' shadow-md': currentOption === option.value }"
      @click="$emit('select', option.value)"
    >
      <h2 class="font-bold mb-[8px]">
        {{ option.title }}
      </h2>
      <p
        v-for="optionDesc in option.description"
        :key="optionDesc"
        class="my-0 leading-[180%]"
      >
        {{ optionDesc }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  options: Array<{
    value: string;
    title: string;
    description: string[];
  }>;
  currentOption?: string;
}>();

defineEmits(["select"]);
</script>

<template>
  <div
    class="grid p-[4px] bg-[#F5F7F8] rounded-[8px]"
    :class="`grid-cols-${options.length}`"
  >
    <div
      v-for="option in options"
      :key="option.value"
      class="text-[14px] font-semibold rounded-[8px]"
      :class="{
        'text-[#2D2926] bg-white': selectedOption === option.value,
        'text-[#75787B]': selectedOption !== option.value,
      }"
      @click="$emit('select', option.value)"
    >
      {{ option.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  options: Array<{
    label: string;
    value: string;
  }>;
  selectedOption: string;
}>();

defineEmits(["select"]);
</script>

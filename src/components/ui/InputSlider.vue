<template>
  <div>
    <div class="slider-component">
      <div class="slidecontainer">
        <input
          ref="input"
          v-model="currentValue"
          type="range"
          :min="min"
          :max="max"
          class="slider"
          @input="onInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  value: number;
  min: number;
  max: number;
}>();

const emit = defineEmits(["input"]);

const currentValue = ref(props.value);

const onInput = () => {
  emit("input", parseInt(currentValue.value as unknown as string));
};
</script>

<style scoped>
.slider-component .slidecontainer {
  width: 100%;
}

.slider-component .slidecontainer .slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #f5f7f8;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider-component .slidecontainer .slider:hover {
  opacity: 1;
}

.slider-component .slidecontainer .slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #d0021b;
  cursor: pointer;
  border-radius: 50%;
}

.slider-component .slidecontainer .slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #d0021b;
  cursor: pointer;
  border-radius: 50%;
}
</style>

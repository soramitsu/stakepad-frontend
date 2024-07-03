<template>
  <div class="scrollbar">
    <slot />
  </div>
</template>

<style scoped>
.scrollbar {
  max-height: 800px;
  overflow-y: auto;
}

.scrollbar::-webkit-scrollbar {
  width: 6px;
}

.scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 100px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #d0021b;
  border-radius: 100px;
}
</style>

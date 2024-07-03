<template>
  <main class="w-full h-[100vh] bg-[#2F2FA2] overflow-x-hidden">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { useIpfsStore } from "./stores/ipfs";

const ipfsStore = useIpfsStore();
ipfsStore.initialize();
</script>

<style>
* {
  font-family: "Sora", sans-serif;
}
</style>

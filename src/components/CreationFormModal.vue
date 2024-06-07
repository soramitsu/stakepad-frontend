<template>
  <SModal :show="show">
    <template #title>
      Pool creation
    </template>
    <template #default>
      
    </template>
  </SModal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import SModal from './ui/ui-kit/components/Modal/SModal.vue'
import { PoolCreationStep } from '@/types/enums';

const step = ref(PoolCreationStep.Type)

defineProps<{
  show: boolean
}>()
</script>
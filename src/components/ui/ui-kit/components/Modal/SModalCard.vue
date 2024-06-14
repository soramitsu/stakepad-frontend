<script setup lang="ts">
import { SButton } from "../Button";
import { IconClose } from "../icons";
import { useModalApi } from "./api";

withDefaults(
  defineProps<{
    /**
     * If `title` slot is presented, this value is ignored
     */
    title?: string;

    /**
     * Flag to control whether to hide the close button
     *
     * @default true
     */
    close?: boolean;
  }>(),
  {
    close: true,
  },
);

const api = useModalApi();

function closeClick() {
  api.close();
}
</script>

<template>
  <div class="s-modal-card">
    <div class="s-modal-card__header flex items-center">
      <h2 :id="api.labelledBy" class="sora-tpg-h4-bold flex-1">
        <slot name="title">
          {{ title }}
        </slot>
      </h2>

      <SButton
        v-if="close"
        type="action"
        size="sm"
        data-testid="btn-close"
        @click="closeClick"
      >
        <template #icon>
          <IconClose />
        </template>
      </SButton>
    </div>

    <div class="px-6 py-8">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use "../../theme";

$col-surface: theme.token-as-var("sys.color.util.surface");
$shadow: theme.token-as-var("sys.shadow.floating-notification");
$shadow-header: theme.token-as-var("sys.shadow.modal-window-header");

.sora-tpg-h4-bold {
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: bold;
  line-height: 150%;
  letter-spacing: 0;
}

.s-modal-card {
  @apply rounded-xl overflow-hidden;

  background: #fff;
  box-shadow: (
            0px 68px 80px rgba(24, 24, 29, 0.09),
            0px 30.1471px 24.1177px rgba(24, 24, 29, 0.058643),
            0px 12.5216px 10.0172px rgba(24, 24, 29, 0.045),
            0px 4.5288px 3.62304px rgba(24, 24, 29, 0.031357),
          );
  min-width: 300px;

  &__header {
    @apply px-6 py-6 text-center;
    box-shadow: (
            0px -8px 80px rgba(10, 2, 34, 0.07),
            0px 1px 33.4221px rgba(10, 2, 34, 0.0558697),
            0px 0px 17.869px rgba(10, 2, 34, 0.05437),
            0px 2px 10.0172px rgba(10, 2, 34, 0.0484701),
            0px 1.59602px 5.32008px rgba(10, 2, 34, 0.0371562),
            0px 0.664142px 2.21381px rgba(10, 2, 34, 0.0208172),
          );
  }
}
</style>

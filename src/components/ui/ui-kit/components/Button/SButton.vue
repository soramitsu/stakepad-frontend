<script setup lang="ts">
import { SSpinner } from "../Spinner";
import { usePropTypeFilter } from "../../composables/prop-type-filter";
import {
  BUTTON_ICON_POSITION_VALUES,
  BUTTON_SIZE_VALUES,
  BUTTON_TYPE_VALUES,
  SPINNER_SIZE,
  SPINNER_WIDTH,
  FONT_SIZE,
} from "./consts";
import type {
  ButtonType,
  ButtonSize,
  ButtonIconPosition,
  HTMLButtonType,
} from "./types";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    type?: ButtonType;
    size?: ButtonSize;
    nativeType?: HTMLButtonType;
    icon?: string;
    iconPosition?: ButtonIconPosition;
    rounded?: boolean;
    disabled?: boolean;
    loading?: boolean;
    uppercase?: boolean;
  }>(),
  {
    type: "secondary",
    size: "md",
    nativeType: "button",
    icon: "",
    iconPosition: "left",
    rounded: false,
    disabled: false,
    loading: false,
    uppercase: false,
  },
);

const filterProp = usePropTypeFilter(props);

const definitelyType = filterProp("type", BUTTON_TYPE_VALUES, "primary");
const definitelySize = filterProp("size", BUTTON_SIZE_VALUES, "md");
const definitelyIconPosition = filterProp(
  "iconPosition",
  BUTTON_ICON_POSITION_VALUES,
  "left",
);
const isAction = computed(() => definitelyType.value === "action");
const font = computed(() => {
  if (definitelySize.value === "xs" && props.uppercase) {
    return "sora-tpg-ch3";
  }

  return FONT_SIZE[definitelySize.value];
});
</script>

<template>
  <button
    :type="nativeType"
    :class="[
      's-button',
      `s-button_type_${definitelyType}`,
      `s-button_size_${definitelySize}`,
      `s-button_icon-position_${definitelyIconPosition}`,
      font,
      {
        's-button_disabled': loading || disabled,
        's-button_rounded': isAction && rounded,
        's-button_loading': loading,
      },
    ]"
    :disabled="loading || disabled"
  >
    <SSpinner
      v-if="loading"
      class="flex-grow absolute"
      data-testid="spinner"
      :size="SPINNER_SIZE[definitelySize]"
      :width="SPINNER_WIDTH[definitelySize]"
    />

    <span class="s-button__icon" data-testid="icon">
      <i v-if="icon" :class="icon" />
      <slot v-else name="icon" />
    </span>
    <span class="s-button__text" data-testid="text">
      <slot v-if="!isAction" />
    </span>
  </button>
</template>

<style lang="scss">
@use "../../theme";

@mixin button-type($name, $default, $hover, $active, $disabled) {
  &_type_#{$name} {
    @apply #{$default};

    &:hover {
      @apply #{$hover};
    }

    &:active {
      @apply #{$active};
    }
  }

  &_type_#{$name}#{&}_disabled {
    @apply #{$disabled};
  }
}

@mixin button-size($name, $height, $padding, $icon-size, $border-radius: 4px) {
  &_size_#{$name} {
    height: $height;
    border-radius: $border-radius;
  }

  &_size_#{$name} &__icon {
    font-size: $icon-size;
  }

  &_size_#{$name}:not(&_type_action) {
    padding: $padding;
  }

  &_size_#{$name}#{&}_type_action {
    width: $height;
  }
}

.s-button {
  @apply cursor-pointer inline-flex rounded select-none items-center justify-center;
  fill: currentColor;
  $component: &;

  &_disabled {
    @apply cursor-default;
  }

  &_icon-position_left {
    @apply flex-row;
  }

  &_icon-position_left &__icon {
    @apply mr-[8px];
  }

  &_size_mini#{&}_icon-position_left &__icon {
    @apply mr-[6px];
  }

  &_icon-position_right {
    @apply flex-row-reverse;
  }

  &_icon-position_right &__icon {
    @apply ml-[8px];
  }

  &_size_mini#{&}_icon-position_right &__icon {
    @apply ml-[6px];
  }

  &_type_action &__icon,
  &_size_mini#{&}_type_action &__icon,
  & &__icon:empty {
    @apply mx-0;
  }

  &_type_primary {
    background-color: #d0021b;
    color: #fff;

    &:hover {
      background-color: #c6021a;
    }

    &:active {
      background-color: #bb0218;
    }
  }

  &_type_primary#{&}_disabled {
    background-color: #f6ccd1;
  }

  &_type_secondary,
  &_type_action {
    background-color: theme.token-as-var("sys.color.background");
    color: #d0021b;

    &:hover {
      background-color: theme.token-as-var("sys.color.background-hover");
    }

    &:active {
      background-color: theme.token-as-var("sys.color.border-primary");
    }
  }

  &_type_secondary#{&}_disabled,
  &_type_action#{&}_disabled {
    background-color: theme.token-as-var("sys.color.disabled");
    color: theme.token-as-var("sys.color.on-disabled");
  }

  &_type_outline {
    border: 1px solid #dde0e1;
    color: #2d2926;

    &:hover {
      border: 1px solid #c6021a;
      color: #c6021a;
    }

    &:active {
      border: 1px solid #bb0218;
      color: #bb0218;
    }
  }

  &_type_outline#{&}_disabled {
    border: 1px solid #f5f7f8;
    color: #f5f7f8;
  }

  .padding-8 {
    padding-left: 8px;
    padding-right: 8px;
  }

  .padding-12 {
    padding-left: 12px;
    padding-right: 12px;
  }

  .padding-16 {
    padding-left: 16px;
    padding-right: 16px;
  }

  .padding-24 {
    padding-left: 24px;
    padding-right: 24px;
  }

  @include button-size(
    xs,
    $height: 24px,
    $padding: 0px 8px 0px 8px,
    $icon-size: 12px,
    $border-radius: 2px
  );

  @include button-size(sm, $height: 32px, $padding: 0px 12px 0px 12px, $icon-size: 16px);

  @include button-size(md, $height: 40px, $padding: 0px 16px 0px 16px, $icon-size: 16px);

  @include button-size(lg, $height: 56px, $padding: 0px 24px 0px 24px, $icon-size: 24px);

  &_rounded {
    @apply rounded-full;
  }

  &_loading {
    #{$component}__icon,
    #{$component}__text {
      @apply invisible;
    }
  }
}
</style>

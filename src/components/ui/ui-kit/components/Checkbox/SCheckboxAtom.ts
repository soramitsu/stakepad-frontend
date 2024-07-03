import "./SCheckboxAtom.scss";

import IconCheck from "../../../../../assets/icons/checkbox_on.svg";
import IconMinus from "@/assets/icons/checkbox_on.svg";
import IconEmpty from "@/assets/icons/checkbox_off.svg";

import type { FunctionalComponent, PropType } from "vue";
import { h, mergeProps } from "vue";
import type { CheckboxSize, CheckboxState } from "./types";

interface Props {
  size: CheckboxSize;
  checked?: CheckboxState;
  hover?: boolean;
  disabled?: boolean;
}

const SCheckboxAtom: FunctionalComponent<Props> = (props, { attrs }) => {
  return h(
    "div",
    mergeProps(
      {
        class: [
          "s-checkbox-atom",
          {
            "s-checkbox-atom_disabled": props.disabled ?? false,
            "s-checkbox-atom_hover": props.hover ?? false,
          },
        ],
        "data-size": props.size,
        "data-checked": props.checked ?? false,
      },
      attrs,
    ),
    [
      props.checked
        ? props.checked === "mixed"
          ? h(IconMinus)
          : h(IconCheck)
        : h(IconEmpty),
    ],
  );
};

SCheckboxAtom.displayName = "SCheckboxAtom";

SCheckboxAtom.props = {
  size: {
    type: String as PropType<CheckboxSize>,
    required: true,
  },
  checked: {
    type: [Boolean, String] as PropType<CheckboxState>,
  },
  hover: Boolean,
  disabled: Boolean,
};

export default SCheckboxAtom;

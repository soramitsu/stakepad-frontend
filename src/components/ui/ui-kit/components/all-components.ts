// importing every component - for plugin & tests

// it is placed separately from the `index` file because
// `index` file is re-exported from the `lib` file, but there is
// no intention to expose `COMPONENTS` for the end user

import type { Component } from 'vue'
import { SButton } from './Button'
import { SModal, SModalCard } from './Modal'
import { SAlert } from './Alert'
import { SSpinner } from './Spinner'
import { SSwitch } from './Switch'
import { STextField } from './TextField'
import { SPopover, SPopoverWrappedTransition } from './Popover'
import { SLink } from './Link'
import { SRadio, SRadioAtom, SRadioGroup } from './Radio'
import { SCheckboxAtom, SCheckboxSolo } from './Checkbox'
import { SBodyScrollLockProvider } from './BodyScrollLockProvider'
import { SDatePicker } from './DatePicker'

/**
 * Component names should be identical to their variable names
 */
export const COMPONENTS: Record<string, Component> = {
  SButton,
  SModal,
  SModalCard,
  SAlert,
  SSpinner,
  SPopover,
  SPopoverWrappedTransition,
  SSwitch,
  STextField,
  SLink,
  SRadio,
  SRadioAtom,
  SRadioGroup,
  SCheckboxAtom,
  SCheckboxSolo,
  SBodyScrollLockProvider,
  SDatePicker,
}

import type { Component } from "vue";
import { Status } from "../../types";

// This module is a proxy to soramitsu brand icons

import IconClose from "./icomoon/basic-close-24.svg";
import IconStatusSuccess from "./icomoon/basic-circle-checked-24.svg";
import IconStatusInfo from "./icomoon/notifications-info-24.svg";
import IconStatusWarning from "./icomoon/notifications-alert-triangle-24.svg";
import IconStatusError from "./icomoon/notifications-x-octagon-24.svg";

import IconStatusSuccess16 from "./icomoon/status-success-clr-16.svg";
import IconStatusError16 from "./icomoon/status-error-ic-16.svg";

import IconArrowTop16 from "./icomoon/arrow-top-16.svg";
import IconArrowRight16 from "./icomoon/arrow-right-16.svg";

import IconArrowsChevronRightXs24 from "./icomoon/arrows-chevron-right-xs-24.svg";
import IconArrowsChevronLeftXs24 from "./icomoon/arrows-chevron-left-xs-24.svg";
import IconChevronsRight16 from "./icomoon/chevrons-right-16.svg";
import IconChevronsLeft16 from "./icomoon/chevrons-left-16.svg";

import IconArrowsChevronDownRounded24 from "./icomoon/arrows-chevron-down-rounded-24.svg";
import IconArrowsChevronRight24 from "./icomoon/arrows-chevron-right-24.svg";
import IconArrowsChevronLeft24 from "./icomoon/arrows-chevron-left-24.svg";
import IconArrowsChevronBottom24 from "./icomoon/arrows-chevron-bottom-24.svg";
import IconBasicCheckMark24 from "./icomoon/basic-check-mark-24.svg";

import IconChevronBottom16 from "./icomoon/chevron-bottom-16.svg";
import IconBasicExternalLink24 from "./icomoon/basic-external-link-24.svg";

import IconBasicSearch24 from "./icomoon/basic-search-24.svg";

export {
  IconClose,
  IconStatusError,
  IconStatusWarning,
  IconStatusSuccess,
  IconStatusInfo,
  IconStatusError16,
  IconStatusSuccess16,
  IconArrowsChevronDownRounded24,
  IconArrowsChevronRight24,
  IconArrowsChevronLeft24,
  IconBasicCheckMark24,
  IconArrowsChevronBottom24,
  IconChevronBottom16,
  IconBasicExternalLink24,
  IconArrowTop16,
  IconArrowRight16,
  IconArrowsChevronRightXs24,
  IconArrowsChevronLeftXs24,
  IconChevronsRight16,
  IconChevronsLeft16,
  IconBasicSearch24,
};

export const STATUS_ICONS_MAP: { [K in Status]: Component } = {
  [Status.Info as any]: IconStatusInfo,
  [Status.Warning as any]: IconStatusWarning,
  [Status.Error as any]: IconStatusError,
  [Status.Success as any]: IconStatusSuccess,
} as any;

/**
 * TODO append info icon? For now it is used only in STextField that doesn't
 * need "info" entry here
 */
export const STATUS_ICONS_MAP_16: {
  [K in Exclude<Status, typeof Status.Info>]: Component;
} = {
  [Status.Error as any]: IconStatusError16,
  [Status.Success as any]: IconStatusSuccess16,
} as any;

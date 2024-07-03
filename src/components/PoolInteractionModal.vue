<template>
  <SModal :show="show" @click:overlay="$emit('cancel')">
    <SModalCard class="w-[700px]">
      <template #default>
        <OptionsToggle
          :options="options"
          :selected-option="currentOption"
          @select="(v) => (currentOption = v)"
        />

        <TokenBlock
          :show-request="currentOption === 'stake'"
          class="mt-[32px] mb-[16px]"
        />

        <template v-if="['stake', 'unstake'].includes(currentOption)">
          <STextField v-model="amount" label="Amount">
            <template #append>
              <button
                class="rounded-[4px] bg-white py-[8px] px-[12px] font-bold text-[12px] text-[#2D2926]"
              >
                MAX
              </button>
            </template>
          </STextField>
          <div
            class="flex flex-row justify-between mt-[2px] mb-[32px] text-[#75787B] text-[10px]"
          >
            <span> Estimated value </span>

            <span> ~1300 USD </span>
          </div>

          <div
            class="rounded-[8px] bg-[#F3F6FF] p-[16px] text-[14px] text-[#26292E]"
          >
            <div class="flex justify-between">
              <span>{{
                currentOption === "stake"
                  ? "Estimated earnings"
                  : "Remaining tokens"
              }}</span>
              <span class="flex items-center">
                <Token16 />
                <span> 0 WETH </span>
              </span>
            </div>

            <div class="flex justify-between">
              <span>Total staked</span>
              <span>0.00054 -> 0.00141 WETH</span>
            </div>

            <div class="flex justify-between">
              <span>Shares of pool</span>
              <span>0.008% -> 0.012%</span>
            </div>

            <div class="flex justify-between">
              <span>Gas fee</span>
              <span>0.000012 WETH</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="grid grid-cols-2 gap-[16px] mt-[16px] mb-[32px]">
            <div class="rounded-[8px] bg-[#FFF2DF] p-[16px]">
              <p class="m-0 font-bold text-[12px] text-[#26292E]">
                Total claimed reward
              </p>

              <div class="flex justify-between items-end">
                <span class="text-[18px] text-[#26292E]"> 0.0021 WETH </span>
                <GiftTotal />
              </div>

              <p class="mt-8px text-[10px] text-[#75787B]">~0.000000045 USD</p>
            </div>

            <div class="rounded-[8px] bg-[#DDF4DD] p-[16px]">
              <p class="m-0 font-bold text-[12px] text-[#26292E]">
                Total claimed reward
              </p>

              <div class="flex justify-between items-end">
                <span class="text-[18px] text-[#26292E]"> 0.1 WETH </span>
                <GiftClaim />
              </div>

              <p class="mt-8px text-[10px] text-[#75787B]">~0.00045 USD</p>
            </div>
          </div>
        </template>

        <SButton type="primary" class="w-full">
          {{ options.find((option) => option.value === currentOption)?.label }}
        </SButton>
      </template>
    </SModalCard>
  </SModal>
</template>
<script setup lang="ts">
import { ref } from "vue";
import SModal from "./ui/ui-kit/components/Modal/SModal.vue";
import SModalCard from "./ui/ui-kit/components/Modal/SModalCard.vue";
import STextField from "./ui/ui-kit/components/TextField/STextField.vue";
import OptionsToggle from "./ui/OptionsToggle.vue";
import TokenBlock from "./ui/TokenBlock.vue";
import Token16 from "@/assets/icons/token_16.svg";
import SButton from "./ui/ui-kit/components/Button/SButton.vue";
import GiftTotal from "@/assets/icons/gift_total.svg";
import GiftClaim from "@/assets/icons/gift_claim.svg";

defineProps<{
  show: boolean;
}>();

defineEmits(["cancel"]);

const amount = ref("");

const options = [
  {
    label: "Stake",
    value: "stake",
  },
  {
    label: "Unstake",
    value: "unstake",
  },
  {
    label: "Claim",
    value: "claim",
  },
];

const currentOption = ref("stake");
</script>

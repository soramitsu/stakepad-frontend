<template>
  <SModal :show="show">
    <SModalCard class="w-[600px]">
    <template #title> Pool creation </template>
    <template #default>
        <ProgressSteps v-if="step !== PoolCreationStep.Validation" :length="4" :current-step="step + 1" class="mb-[24px]" />

        <template v-if="step === PoolCreationStep.Type">
          <OptionsGrid :options="poolOptions" :current-option="poolOption" class="mb-[16px]" @select="(e) => poolOption = e" />

          <div class="flex flex-row gap-[16px]">
            <SButton type="primary" :disabled="poolOption === undefined" @click="step++">
              Next step
            </SButton>

            <SButton type="outline" @click="$emit('cancel')"> Cancel </SButton>
          </div>
        </template>

        <template v-if="step === PoolCreationStep.Data">
          <STextField
            v-model="poolData.stakingToken"
            :status="symbols.staking === 'error' ? 'error' : undefined"
            label="Staking token address"
            class="mb-[16px]"
          >
            <template #append>
              {{ symbols.staking !== 'error' ? symbols.staking : undefined }}
            </template>
          </STextField>

          <STextField
            v-model="poolData.rewardToken"
            :status="symbols.reward === 'error' ? 'error' : undefined"
            label="Reward token address"
            class="mb-[16px]"
          >
            <template #append>
              {{ symbols.staking !== 'error' ? symbols.reward : undefined }}
            </template>
          </STextField>

          <div class="flex flex-row gap-[16px] mb-[16px] w-full">
            <STextField
              v-model="poolData.rewardSecond"
              label="Reward per second"
              class="grow"
            ></STextField>
            <STextField
              v-model="poolData.totalReward"
              label="Total reward"
              class="grow"
            ></STextField>
          </div>

          <div class="flex flex-row gap-[16px] mb-[16px] w-full">
            <STextField
              v-model="poolData.startTime"
              label="Start time (DD/MM/YY HH:MM)"
              class="grow"
            ></STextField>
            <STextField
              v-model="poolData.endTime"
              label="End time (DD/MM/YY HH:MM)"
              class="grow"
            ></STextField>
          </div>

          <div class="flex flex-row gap-[16px] mb-[16px]">
            <div class="p-[12px] border-[1px] border-[#DDE0E1] grow">
              <SCheckboxSolo v-model="poolData.isLockUp">Lock up</SCheckboxSolo>
            </div>

            <div v-if="poolData.isLockUp" class>
              <SRadioGroup v-model="poolData.lockupType">
                <SRadio value="hard">Hard lock up</SRadio>
                <SRadio value="soft">Soft lock up</SRadio>
              </SRadioGroup>
            </div>
          </div>

          <div class="flex flex-row gap-[16px]">
            <SButton
              type="primary"
              :disabled="
                Object.values(poolData).reduce((acc, next) => {
                  if (!next && next !== false && next !== null) {
                    return true;
                  }
                  return acc;
                }, false) as boolean
              "
              @click="step++"
            >
              Next step
            </SButton>

            <SButton type="outline" @click="$emit('cancel')"> Cancel </SButton>
          </div>
        </template>

        <template v-if="step === PoolCreationStep.Info">
          <STextField
            v-model="ipfsHash"
            label="IPFS Hash"
            class="mb-[16px]"
          >
          </STextField>

          <h2 class="text-[14px] font-bold mb-[16px]">
            {{ symbols.staking + ' ' + symbols.reward }} pool
          </h2>

          <h2 class="text-[14px] font-bold mb-[8px]">
            Staking token address
          </h2>

          <p class="mb-[8px] text-[14px] flex flex-row items-center">
            <span>{{ poolData.stakingToken }}</span>
          </p>

          <h2 class="text-[14px] font-bold">
            Reward token address
          </h2>

          <p class="mb-[8px] text-[14px] flex flex-row items-center">
            <span>{{ poolData.rewardToken }}</span>
          </p>

          <div class="flex flex-row gap-[16px]">
            <SButton
              type="primary"
              :disabled="
                Object.values(poolData).reduce((acc, next) => {
                  if (!next && next !== false && next !== null) {
                    return true;
                  }
                  return acc;
                }, false) as boolean
              "
              @click="step++"
            >
              Next step
            </SButton>

            <SButton type="outline" @click="$emit('cancel')"> Cancel </SButton>
          </div>
        </template>

        <template v-if="step === PoolCreationStep.Finish">
          <div class="flex justify-between text-[14px] mb-[8px]">
            <span>Pool name</span>
            <span></span>
          </div>

          <div class="flex justify-between text-[14px] mb-[8px]">
            <span>Staking token address</span>
            <span>{{ poolData.stakingToken }}</span>
          </div>

          <div class="flex justify-between text-[14px] mb-[8px]">
            <span>Reward token address</span>
            <span>{{ poolData.rewardToken }}</span>
          </div>

          <div class="flex justify-between text-[14px] mb-[8px]">
            <span>Reward per second</span>
            <span>{{ poolData.rewardSecond }}</span>
          </div>
          
          <div class="flex justify-between text-[14px] mb-[8px]">
            <span>Total reward</span>
            <span>{{ poolData.totalReward }}</span>
          </div>

          <div class="flex justify-between text-[14px] mb-[8px]">
            <span>Start time – End time</span>
            <span>{{ poolData.startTime + ' -- ' + poolData.endTime }}</span>
          </div>

          <div class="flex justify-between text-[14px] mb-[8px]">
            <span>Gas fee</span>
            <span></span>
          </div>

          <div class="flex justify-between text-[14px] mb-[8px]">
            <span>Creator fee</span>
            <span></span>
          </div>

          <div class="flex justify-between text-[14px] mb-[8px]">
            <span>IPFS Hash</span>
            <span>{{ ipfsHash }}</span>
          </div>

          <div class="flex flex-row gap-[16px] mb-[8px]">
            <SButton
              type="primary"
              @click="step++"
            >
              Request a pool creation
            </SButton>

            <SButton type="outline" @click="$emit('cancel')"> Cancel </SButton>
          </div>
        </template>

        <template v-if="step === PoolCreationStep.Validation">
          <SAlert status="success" title="Request sent" description="Your request to create a staking pool has been sent to the Administration.">
          </SAlert>

          <SButton type="outline" @click="$emit('cancel')"> Cancel </SButton>
        </template>
    </template>
    </SModalCard>
  </SModal>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import SModal from "./ui/ui-kit/components/Modal/SModal.vue";
import SModalCard from "./ui/ui-kit/components/Modal/SModalCard.vue";
import { PoolCreationStep } from "@/types/enums";
import ProgressSteps from "./ui/ProgressSteps.vue";
import OptionsGrid from "./ui/OptionsGrid.vue";
import SButton from "./ui/ui-kit/components/Button/SButton.vue";
import STextField from "./ui/ui-kit/components/TextField/STextField.vue";
import SRadioGroup from "./ui/ui-kit/components/Radio/SRadioGroup.vue";
import SRadio from "./ui/ui-kit/components/Radio/SRadio.vue";
import SCheckboxSolo from "./ui/ui-kit/components/Checkbox/SCheckboxSolo.vue";
import ERC20Abi from '../abi/erc20.json'
import { EthersWrapper } from "@/wrapper";
import SAlert from "./ui/ui-kit/components/Alert/SAlert.vue";

const step = ref(PoolCreationStep.Type);

const ipfsHash = ref('')

const poolOptions = [
  {
    value: "erc20",
    title: "Regular ERC20",
    description: [
      "ERC-20 Staking pool",
      "Such type of staking pools accepts ERC-20 tokens as staking tokens and as reward tokens as well.",
    ],
  },
  {
    value: "erc721",
    title: "Regular ERC721",
    description: [
      "ERC-20 Staking pool",
      "Such type of staking pools accepts ERC-721 tokens as staking tokens, and ERC-20 tokens as reward tokens.",
    ],
  },
];

const poolOption = ref(undefined);

const poolData = ref({
  stakingToken: "",
  rewardToken: "",
  rewardSecond: "",
  totalReward: "",
  startTime: '',
  endTime: '',
  isLockUp: false,
  lockupType: null,
});

const ethersWrapper = new EthersWrapper()

const symbols = ref({
  staking: '',
  reward: ''
})

watch(() => poolData.value.stakingToken, async () => {
  const provider = await ethersWrapper.getMetamaskProvider()
  if (poolData.value.stakingToken.length > 8)
    ethersWrapper.getSymbol(ERC20Abi, poolData.value.stakingToken, provider)
      .then((e) => {
        symbols.value.staking = e
      })
      .catch(() => {
        symbols.value.staking = 'error'
      })
})

watch(() => poolData.value.rewardToken, async () => {
  const provider = await ethersWrapper.getMetamaskProvider()
  if (poolData.value.rewardToken.length > 8)
    ethersWrapper.getSymbol(ERC20Abi, poolData.value.rewardToken, provider)
      .then((e) => {
        symbols.value.reward = e
        console.log(e)
      })
      .catch(() => {
        symbols.value.reward = 'error'
      })
})

defineProps<{
  show: boolean;
}>();

defineEmits(['cancel'])
</script>

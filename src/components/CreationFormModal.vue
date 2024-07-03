<template>
  <SModal :show="show" @click:overlay="$emit('cancel')">
    <SModalCard class="w-[700px]">
      <template #title> Pool creation </template>
      <template #default>
        <ProgressSteps
          v-if="step !== PoolCreationStep.Validation"
          :length="4"
          :current-step="step + 1"
          class="mb-[32px] mt-[8px]"
          @click="moveToStep"
        />

        <template v-if="step === PoolCreationStep.Type">
          <OptionsGrid
            :options="poolOptions"
            :current-option="poolOption"
            class="mb-[32px]"
            @select="(e) => (poolOption = e)"
          />

          <div class="flex flex-row gap-[16px] justify-end">
            <SButton
              type="primary"
              :disabled="poolOption === undefined"
              @click="step++"
            >
              Next step
            </SButton>
          </div>
        </template>

        <template v-if="step === PoolCreationStep.Data">
          <STextField
            v-model="poolData.stakingToken"
            :status="symbols.staking === 'error' ? 'error' : undefined"
            label="Staking token address"
          >
            <template #append>
              {{ symbols.staking !== "error" ? symbols.staking : undefined }}
            </template>
          </STextField>
          <p
            class="text-[#75787B] text-[10px] mt-[2px] mb-[16px] text-right h-[10px]"
          >
            {{ names.staking }}
          </p>

          <STextField
            v-model="poolData.rewardToken"
            :status="symbols.reward === 'error' ? 'error' : undefined"
            label="Reward token address"
          >
            <template #append>
              {{ symbols.reward !== "error" ? symbols.reward : undefined }}
            </template>
          </STextField>
          <p
            class="text-[#75787B] text-[10px] mt-[2px] mb-[16px] text-right h-[10px]"
          >
            {{ names.reward }}
          </p>

          <div class="flex flex-row gap-[16px] mb-[16px] w-full">
            <STextField
              v-model="poolData.rewardSecond"
              label="Reward per second"
              class="grow"
            >
              <template #append>
                {{ symbols.reward !== "error" ? symbols.reward : undefined }}
              </template>
            </STextField>
            <STextField
              v-model="poolData.totalReward"
              label="Total reward"
              class="grow"
            >
              <template #append>
                {{ symbols.reward !== "error" ? symbols.reward : undefined }}
              </template>
            </STextField>
          </div>

          <div class="grid grid-cols-2 flex-row gap-[16px] mb-[16px] w-full">
            <SDatePicker
              v-model="poolData.startTime"
              label="Start time"
              class="grow"
              type="pick"
              :time="true"
            ></SDatePicker>
            <SDatePicker
              v-model="poolData.endTime"
              label="End time"
              class="grow"
              type="pick"
              :time="true"
            ></SDatePicker>
          </div>

          <div class="flex flex-row gap-[16px] mb-[16px]">
            <div class="p-[12px] border-[1px] border-[#DDE0E1] grow">
              <SCheckboxSolo
                v-model="poolData.isLockUp"
                type="bordered-with-description"
              >
                <template #default> Lock up </template>
                <template #description>
                  Token lockup is a specific time frame when cryptocurrency
                  token can't be traded
                </template>
              </SCheckboxSolo>
            </div>

            <div v-if="poolData.isLockUp" class="flex flex-col">
              <SRadioGroup v-model="poolData.lockupType">
                <SRadio value="hard">Hard lock up</SRadio>
                <SRadio value="soft">Soft lock up</SRadio>
              </SRadioGroup>

              <p
                class="text-[#1070CA] underline text-[14px] mt-auto cursor-pointer"
              >
                Learn more
              </p>
            </div>
          </div>

          <template v-if="poolData.isLockUp">
            <p class="mt-[16px] text-[12px]">
              Lock up period, days {{ poolData.lockupDays }}
            </p>

            <InputSlider
              class="my-[32px]"
              :value="poolData.lockupDays"
              :min="1"
              :max="120"
              @input="(val) => (poolData.lockupDays = val)"
            ></InputSlider>
          </template>

          <div class="flex flex-row gap-[16px] justify-between">
            <SButton type="outline" @click="step--"> Back </SButton>

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
          </div>
        </template>

        <template v-if="step === PoolCreationStep.Info">
          <STextField v-model="ipfsHash" label="IPFS Hash"> </STextField>

          <template v-if="ipfsObj?.name && ipfsHash">
            <h2 class="text-[14px] text-[#26292E] font-bold mt-[24px] mb-[8px]">
              {{ ipfsObj.name }}
            </h2>

            <p class="text-[14px] text-[#26292E] mb-[16px]">
              {{ ipfsObj.description }}
            </p>

            <h2 class="text-[14px] text-[#26292E] font-bold mb-[8px]">
              Staking token address
            </h2>

            <TextCopy
              :text="ipfsObj.stakingToken"
              text-class="text-[14px] text-[#26292E]"
              class="mb-[16px]"
            />

            <h2 class="text-[14px] text-[#26292E] font-bold mb-[8px]">
              Reward token address
            </h2>

            <TextCopy
              :text="ipfsObj.rewardToken"
              text-class="text-[14px] text-[#26292E]"
              class="mb-[16px]"
            />

            <div
              class="flex flex-col gap-[8px] text-[14px] text-[#1070CA] underline"
            >
              <a :href="ipfsObj.stakingLink" 
                target="_blank"> Get a staking token </a>
              <a
                v-if="ipfsObj?.socials?.website"
                :href="ipfsObj?.socials?.website"
                target="_blank"
              >
                Website
              </a>
              <a
                v-if="ipfsObj?.socials?.medium"
                :href="ipfsObj?.socials?.medium"
                target="_blank"
              >
                Medium
              </a>
              <a
                v-if="ipfsObj?.socials?.twitter"
                :href="ipfsObj?.socials?.twitter"
                target="_blank"
              >
                Twitter
              </a>
              <a
                v-if="ipfsObj?.socials?.github"
                :href="ipfsObj?.socials?.github"
                target="_blank"
              >
                Github
              </a>
              <a
                v-if="ipfsObj?.socials?.telegram"
                :href="ipfsObj?.socials?.telegram"
                target="_blank"
              >
                Telegram
              </a>
              <a
                v-if="ipfsObj?.socials?.discord"
                :href="ipfsObj?.socials?.discord"
                target="_blank"
              >
                Discord
              </a>
            </div>
          </template>

          <div class="flex flex-row gap-[16px] justify-between mt-[32px]">
            <SButton type="outline" @click="step--"> Back </SButton>

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
              @click="estimateGas"
            >
              Next step
            </SButton>
          </div>
        </template>

        <template v-if="step === PoolCreationStep.Finish">
          <div class="flex flex-col gap-[8px] text-[14px] text-[#2D2926]">
            <div class="flex justify-between">
              <span>Pool name</span>
              <span>{{ ipfsObj.name }}</span>
            </div>

            <div class="flex justify-between">
              <span>Staking token address</span>
              <span><TextCopy :text="poolData.stakingToken" text-class="text-[14px] text-[#2D2926]" /></span>
            </div>

            <div class="flex justify-between">
              <span>Reward token address</span>
              <span><TextCopy :text="poolData.rewardToken" text-class="text-[14px] text-[#2D2926]" /></span>
            </div>

            <div class="flex justify-between">
              <span>Reward per second</span>
              <span>{{ poolData.rewardSecond + " " + symbols.reward }}</span>
            </div>

            <div class="flex justify-between">
              <span>Total reward</span>
              <span>{{ poolData.totalReward + " " + symbols.reward }}</span>
            </div>

            <div class="flex justify-between">
              <span></span>
              <span></span>
            </div>

            <div class="flex justify-between">
              <span>Creator fee</span>
              <span>4%</span>
            </div>

            <div class="flex justify-between">
              <span>IPFS Hash</span>
              <span class="underline text-[#1070CA]">{{ ipfsHash }}</span>
            </div>

            <div class="flex justify-between">
              <span>Gas fee</span>
              <span>{{ gas }}</span>
            </div>
          </div>

          <div class="flex flex-row gap-[16px] justify-between mt-[32px]">
            <SButton type="outline" @click="step--"> Back </SButton>

            <SButton type="primary" @click="step++">
              Request a pool creation
            </SButton>
          </div>
        </template>

        <template v-if="step === PoolCreationStep.Validation">
          <SAlert
            status="success"
            title="Request sent"
            description="Your request to create a staking pool has been sent to the Administration."
          >
          </SAlert>

          <SButton type="outline" class="mt-[24px]" @click="$emit('cancel')">
            Ok
          </SButton>
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
import ERC20Abi from "../abi/erc20.json";
import { EthersWrapper } from "@/wrapper";
import SAlert from "./ui/ui-kit/components/Alert/SAlert.vue";
import SDatePicker from "./ui/ui-kit/components/DatePicker/SDatePicker.vue";
import InputSlider from "./ui/InputSlider.vue";
import { useIpfsStore } from "@/stores/ipfs";
import TextCopy from "./ui/TextCopy.vue";

const step = ref(PoolCreationStep.Type);

const ipfsHash = ref("");
const ipfsObj = ref({} as any);

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
  startTime: undefined,
  endTime: undefined,
  isLockUp: false,
  lockupType: null,
  lockupDays: 1,
});

const ethersWrapper = new EthersWrapper();

const latestStep = ref(0);

const moveToStep = (idxStep: number) => {
  if (idxStep <= latestStep.value) {
    step.value = idxStep;
  }
};

const gas = ref("");

const estimateGas = async () => {
  const provider = await ethersWrapper.getMetamaskProvider();
  const contract = ethersWrapper.createContract(
    poolData.value.rewardToken,
    ERC20Abi,
    provider,
  );
  gas.value = await ethersWrapper.getGasContract(provider, contract, poolData.value.rewardToken, '0x0');
  step.value++;
};

watch(
  () => step.value,
  () => {
    if (latestStep.value < step.value) latestStep.value = step.value;
  },
  { immediate: true },
);

const symbols = ref({
  staking: "",
  reward: "",
});

const names = ref({
  staking: "",
  reward: "",
});

watch(
  () => poolData.value.stakingToken,
  async () => {
    const provider = await ethersWrapper.getMetamaskProvider();
    if (poolData.value.stakingToken.length > 8) {
      ethersWrapper
        .getSymbol(ERC20Abi, poolData.value.stakingToken, provider)
        .then((e) => {
          symbols.value.staking = e;
        })
        .catch(() => {
          symbols.value.staking = "error";
        });
      ethersWrapper
        .getName(ERC20Abi, poolData.value.stakingToken, provider)
        .then((e) => {
          names.value.staking = e;
        })
        .catch(() => {
          names.value.staking = "";
        });
    }
  },
);

watch(
  () => poolData.value.rewardToken,
  async () => {
    const provider = await ethersWrapper.getMetamaskProvider();
    if (poolData.value.rewardToken.length > 8) {
      ethersWrapper
        .getSymbol(ERC20Abi, poolData.value.rewardToken, provider)
        .then((e) => {
          symbols.value.reward = e;
        })
        .catch(() => {
          symbols.value.reward = "error";
        });
      ethersWrapper
        .getName(ERC20Abi, poolData.value.rewardToken, provider)
        .then((e) => {
          names.value.reward = e;
        })
        .catch(() => {
          names.value.reward = "";
        });
    }
  },
);

const ipfsStore = useIpfsStore();

const getIpfs = async () => {
  ipfsObj.value = await ipfsStore.getFile(ipfsHash.value);
};

watch(
  () => ipfsHash.value,
  () => {
    if (ipfsHash.value) getIpfs();
  },
);

defineProps<{
  show: boolean;
}>();

defineEmits(["cancel"]);
</script>

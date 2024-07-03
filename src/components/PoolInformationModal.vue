<template>
  <SModal :show="show" @click:overlay="$emit('cancel')">
    <SModalCard class="w-[700px]">
      <template #title> Pool info </template>
      <template #default>
        <ProgressSteps
          v-if="![PoolInfoStep.Validation, PoolInfoStep.Hash].includes(step)"
          :length="3"
          :current-step="step + 1"
          class="mb-[32px] mt-[8px]"
          @click="moveToStep"
        />

        <ScrollBar>
          <template v-if="step === PoolInfoStep.Pool">
            <STextField
              v-model="poolData.name"
              label="Staking pool name"
              class="mb-[16px]"
            >
            </STextField>

            <STextField
              v-model="poolData.description"
              label="Staking pool description"
              :multiline="true"
              class="mb-[16px]"
            >
            </STextField>

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
              v-model="poolData.stakingImg"
              label="Staking token image"
              class="mb-[16px]"
            >
              <template #append>
                <img class="w-[24px] h-[24px]" :src="poolData.stakingImg" />
              </template>
            </STextField>

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

            <STextField
              v-model="poolData.rewardImg"
              label="Staking token image"
              class="mb-[16px]"
            >
              <template #append>
                <img class="w-[24px] h-[24px]" :src="poolData.rewardImg" />
              </template>
            </STextField>

            <div class="flex flex-row gap-[16px] justify-end">
              <SButton type="primary" @click="step++"> Next step </SButton>
            </div>
          </template>

          <template v-if="step === PoolInfoStep.Socials">
            <STextField
              v-model="poolData.stakingLink"
              label="Link to get a staking token"
              class="mb-[16px]"
            >
            </STextField>

            <div class="grid grid-cols-2 gap-[16px]">
              <STextField
                v-model="poolData.socials.website"
                label="Project's website"
                class="mb-[16px]"
              >
              </STextField>

              <STextField
                v-model="poolData.socials.medium"
                label="Medium"
                class="mb-[16px]"
              >
              </STextField>

              <STextField
                v-model="poolData.socials.twitter"
                label="Project's twitter"
                class="mb-[16px]"
              >
              </STextField>

              <STextField
                v-model="poolData.socials.github"
                label="Github"
                class="mb-[16px]"
              >
              </STextField>

              <STextField
                v-model="poolData.socials.telegram"
                label="Project's telegram"
                class="mb-[16px]"
              >
              </STextField>

              <STextField
                v-model="poolData.socials.discord"
                label="Discord"
                class="mb-[16px]"
              >
              </STextField>
            </div>

            <div class="flex flex-row gap-[16px] justify-between">
              <SButton type="outline" @click="step--"> Back </SButton>

              <SButton type="primary" @click="step++"> Next step </SButton>
            </div>
          </template>

          <template v-if="step === PoolInfoStep.Company">
            <STextField
              v-model="poolData.company.email"
              label="Email address"
              class="mb-[16px]"
            >
            </STextField>

            <STextField
              v-model="poolData.company.name"
              label="Company name"
              class="mb-[16px]"
            >
            </STextField>

            <STextField
              v-model="poolData.company.telegram"
              label="Personal telegram"
              class="mb-[16px]"
            >
            </STextField>

            <div class="flex flex-row gap-[16px] justify-between">
              <SButton type="outline" @click="step--"> Back </SButton>

              <SButton type="primary" @click="step++"> Publish </SButton>
            </div>
          </template>

          <template v-if="step === PoolInfoStep.Validation">
            <p class="my-[32px] text-[14px] text-[#2D2926]">
              Staking pool information will be saved on IPFS and publicly
              available. Changes are not available. Confirm that the information
              filled in is correct?
            </p>
            <div class="flex flex-row gap-[16px] justify-between">
              <SButton type="outline" @click="step--"> Back </SButton>

              <SButton type="primary" @click="step++">
                Confirm and publish
              </SButton>
            </div>
          </template>
        </ScrollBar>
      </template>
    </SModalCard>
  </SModal>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import SModal from "./ui/ui-kit/components/Modal/SModal.vue";
import SModalCard from "./ui/ui-kit/components/Modal/SModalCard.vue";
import { PoolInfoStep } from "@/types/enums";
import ProgressSteps from "./ui/ProgressSteps.vue";
import SButton from "./ui/ui-kit/components/Button/SButton.vue";
import STextField from "./ui/ui-kit/components/TextField/STextField.vue";
import ERC20Abi from "../abi/erc20.json";
import { EthersWrapper } from "@/wrapper";
import ScrollBar from "./ui/ScrollBar.vue";

const step = ref(PoolInfoStep.Type);

const ipfsHash = ref("");

const poolData = ref({
  name: "",
  description: "",
  stakingImg: "",
  rewardImg: "",
  stakingToken: "",
  rewardToken: "",
  rewardSecond: "",
  totalReward: "",
  stakingLink: "",
  socials: {
    website: "",
    medium: "",
    twitter: "",
    github: "",
    telegram: "",
    discord: "",
  },
  company: {
    email: "",
    name: "",
    telegram: "",
  },
});

const ethersWrapper = new EthersWrapper();

const latestStep = ref(0);

const moveToStep = (idxStep: number) => {
  if (idxStep <= latestStep.value) {
    step.value = idxStep;
  }
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

defineProps<{
  show: boolean;
}>();

defineEmits(["cancel"]);
</script>

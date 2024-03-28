import { Pool } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePoolsStore = defineStore("pools", () => {
  const pools = ref([
    {
      contract: "0xb794f5ea0ba39494ce839613fffba7427957926",
      token: "0xb794f5ea0ba39494ce839613fffba74279579268",
      rewardToken: "0xb794f5ea0ba39494ce839613fffba74279579268",
      reward: 100,
      stake: 100,
      tokens: 100,
      claimed: 100,
      rewards: 100,
      endTime: Date.now() + 3600 * 24 * 5 * 1000,
      claimedBy: 100,
      stakedBy: 100,
      rewardsBy: 100,
      accounts: 10,
      staked_by_day: 20,
    },
    {
      contract: "0xb794f5ea0ba39494ce839613fffba7429579268",
      token: "0xb794f5ea0ba39494ce839613fffba74279579268",
      rewardToken: "0xb794f5ea0ba39494ce839613fffba74279579268",
      reward: 100,
      stake: 100,
      tokens: 100,
      claimed: 300,
      rewards: 100,
      endTime: Date.now() + 3600 * 24 * 6 * 1000,
      claimedBy: 100,
      stakedBy: 100,
      rewardsBy: 100,
      accounts: 10,
      staked_by_day: 20,
    },
    {
      contract: "0xb794f5ea0ba3949ce839613fffba74279579268",
      token: "0xb794f5ea0ba39494ce839613fffba74279579268",
      rewardToken: "0xb794f5ea0ba39494ce839613fffba74279579268",
      reward: 100,
      stake: 100,
      tokens: 200,
      claimed: 100,
      rewards: 100,
      endTime: Date.now() + 3600 * 24 * 7 * 1000,
      claimedBy: 100,
      stakedBy: 100,
      rewardsBy: 100,
      accounts: 10,
      staked_by_day: 20,
    },
  ] as Pool[]);

  const createPool = (pool: Partial<Pool>) => {
    pools.value.unshift({
      ...pool,
      stake: 0,
      tokens: 0,
      claimed: 0,
      rewards: 0,
      endTime: Date.now() + 3600 * 24 * 7 * 1000,
      claimedBy: 0,
      stakedBy: 0,
      accounts: 1,
      staked_by_day: 0,
    } as Pool);
  };

  const findByContract = (contract: string) => {
    return pools.value.find((pool) => pool.contract === contract);
  };

  return {
    pools,
    createPool,
    findByContract,
  };
});

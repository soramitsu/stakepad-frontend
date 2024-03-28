import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountsStore = defineStore("accounts", () => {
  const wallet = ref({
    accounts: [],
  });

  return {
    wallet,
  };
});

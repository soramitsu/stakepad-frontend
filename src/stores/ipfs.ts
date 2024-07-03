import { defineStore } from "pinia";
import { createHelia } from "helia";
import { ref } from "vue";

const randomID = (length: number = 24) => {
  const set = '0123456789ABCDEF'
  let _str = ''
  for (let i = 0; i < length; i++) {
    _str += set[Math.floor(Math.random() * 16)]
  }
  return '0x' + _str
}

export const useIpfsStore = defineStore("ipfs", () => {
  const json = (obj: any) => ({
    state: {},
    add (obj: any) {
      const uid = randomID()
      // @ts-ignore
      this.state[uid] = obj
      return uid
    },
    get (addr: string) {
      // @ts-ignore
      return this.state[addr]
    }
  })
  const j = ref(null as any);

  const initialize = async () => {
    j.value = json({});
  };

  const addFile = async (obj: any) => {
    return await j.value.add(obj);
  };

  const getFile = async (address: string) => {
    return await j.value.get(address);
  };

  return {
    j,
    initialize,
    addFile,
    getFile,
  };
});

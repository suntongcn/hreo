<script lang="ts">
export default {
  data() {
    return {
      msg: "hello vue",
      account: "",
    };
  },
  async mounted() {},
  methods: {
    async connect() {
      let eth = this.getEth();
      if (await this.hasAccounts()) {
        const accounts = (await eth.request({
          method: "eth_accounts",
        })) as string[];
        this.account = accounts[0]
      } else {
        const accounts = await eth.enable();
        this.account = accounts[0];
      }
    },
    getEth() {
      const eth = window.ethereum;
      if (!eth) {
        throw new Error("没有小狐狸");
      }
      return eth;
    },
    async hasAccounts() {
      const eth = this.getEth();
      const accounts = (await eth.request({
        method: "eth_accounts",
      })) as string[];

      console.log(accounts);

      return accounts && accounts.length;
    },
  },
};
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ account }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
  <div>
    <button @click="connect">连接钱包</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

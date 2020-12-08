<template>
  <header>
    <img class="logo" src="../../assets/img/logoImg.png" alt />
    <img class="logoname" src="../../assets/img/sepLogo.png" alt />
    <span @click="toLogin" v-if="!$store.state.login.isLogin">登录</span>
    <span v-if="$store.state.login.isLogin" @click="toMine">
      <img src="../../assets/img/loginStatus.png" alt="" class="logo">
    </span>
    
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toMine(){
      this.$router.push("/mine");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
header {
    position: relative;
  left: 0;
  right: 0;
  z-index: 5;
  top: 0;
  height: vw(50);
  padding: vw(18) vw(30) vw(17) vw(30);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
 

  .logo {
    width: vw(60);
    height: vw(60);
  }
  .logoname {
    width: vw(310);
    height: vw(60);
  }
}
</style>
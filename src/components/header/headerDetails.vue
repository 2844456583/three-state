<template>
  <header>
    <a href="#">
      <img class="logo" src="../../assets/img/shape.png" alt @click="toBack"/>
    </a>
    <van-search v-model="value" placeholder="请输入搜索关键词" @click="goSearch" />
    <span @click="toLogin" v-if="!$store.state.login.isLogin">登录</span>
    <van-icon name="manager-o" v-if="$store.state.login.isLogin" @click="toMine"/>
  </header>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },

  components: {},
  created(){
    this.value = this.$route.query.content;
    // console.log();
  },
  methods: {
    // 返回上一个页面
    toBack(){
      this.$router.push("/home");
    },
    toLogin() {
      this.$router.push("/login");
    },
    toMine(){
      this.$router.push("/mine");
    },
    //去到搜索页面
    goSearch(){
       this.$router.push("/search");
    }

  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
header {
  position: fixed;

  left: 0;
  right: 0;
  z-index: 5;
  top: 0;
  height: vw(88);
  padding: 0 vw(30) 0 vw(30);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  .logo {
    width: vw(40);
    height: vw(40);
    color: rgb(138, 135, 135);
    margin-top: vw(10);
  }
  .van-search {
    width: vw(544);
    // height: vw(60);
    padding: vw(10) 0 vw(10) 0;
  }
  .van-icon{
    font-size: vw(50);
    color: rgb(102, 100, 100);
  }
}
</style>
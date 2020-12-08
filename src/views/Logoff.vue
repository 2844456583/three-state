<template>
  <div class="main">
    <header>
      <a href="#">
        <img class="logo" src="../assets/img/shape.png" alt @click="go()" />
      </a>
      <span class="text">账号管理</span>
      <a href="#"></a>
    </header>
    <div class="user">
      <div class="left">
        <img src="../assets/img/userImg (1).png" alt="" class="pic" />
        <span class="text">{{ user }}</span>
      </div>
      <div>
        <img src="../assets/img/right-arrow-xi.png" alt="" class="pic1" />
      </div>
    </div>
    <div class="content">
      <li class="li">
        <span>管理收货地址</span>
        <img src="../assets/img/right-arrow-xi.png" alt="" class="pic1" />
      </li>
      <li class="li">
        <span>更换会员卡</span>
        <img src="../assets/img/right-arrow-xi.png" alt="" class="pic1" />
      </li>
      <li class="li">
        <span>更改登录密码</span>
        <img src="../assets/img/right-arrow-xi.png" alt="" class="pic1" />
      </li>
      <li class="li li2">
        <span>注销账户</span>
        <img src="../assets/img/right-arrow-xi.png" alt="" class="pic1" />
      </li>
    </div>
    <div class="logoff" @click="mounted">
      <span>退出当前账户</span>
    </div>
  </div>
</template>

<script>
import { removeCookie } from "../utlis/auth";
export default {
  data() {
    return {
      user: ""
    };
  },

  components: {},

  methods: {
    mounted() {
      this.$dialog
        .confirm({
          // title: "标题",
          message: "你确定退出当前账号吗"
        })
        .then(() => {
          
          this.logoff();
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(this);
    },
    go() {
      this.$router.go(-1);
    },
    logoff() {
      removeCookie("sifulan-token");
      removeCookie("sifulan-user");
      removeCookie("cart");
      this.$router.push("/home");
    }
  },
  created() {
    // console.log(getCookie('sifulan-user'));
    // this.$store.dispatch("changeuser", getCookie('sifulan-user'));
    this.$store.commit("uploaduser");
    if (this.$store.state.login.currentUser != null) {
      // console.log(this.$store.state.login.currentUser);
      this.user = this.$store.state.login.currentUser.replace(
        /^(\d{3})\d*(\d{4})$/,
        "$1****$2"
      );
      // console.log(this.user,111);
      // console.log(this.$store, 444);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
.main {
  background: #f5f5f5;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
header {
  position: fixed;
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
  // border-bottom: vw(1) solid rgb(228, 222, 222);
  .logo {
    width: vw(40);
    height: vw(40);
  }
  .text {
    font-size: vw(36);
  }
}
.user {
  height: vw(172);
  width: 100%;
  background: #fff;
  // position: relative;
  margin-top: vw(95);
  display: flex;
  padding: 0 vw(50);
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: vw(360);
    .pic {
      width: vw(112);
    }
  }
  .pic1 {
    width: vw(14);
  }
}
.content {
  width: 100%;
  background-color: #f5f5f5;
  margin-top: vw(10);
  .li {
    border-bottom: vw(1) solid #f5f5f5;
    background-color: #fff;
    font-size: vw(30);
    height: vw(100);
    // box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 vw(50);
    .pic1 {
      width: vw(14);
    }
  }
  .li2 {
    margin-top: vw(10);
  }
}
.logoff {
  height: vw(108);
  background-color: #fff;
  margin-top: vw(8);
  text-align: center;
  line-height: vw(108);
}
</style>
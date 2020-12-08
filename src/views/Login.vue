<template>
  <div>
    <header>
      <img
        class="pic1"
        src="../assets/img/shape.png"
        alt
        @click="goto('/home')"
      />
      <span cla>手机验证码登录</span>
    </header>
    <div class="content">
      <h3 class="text1">密码登录</h3>
      <p class="text2">用户名</p>
      <!-- 账号框 -->
      <van-cell-group>
        <van-field v-model="value1" />
      </van-cell-group>
      <p class="text2">密码</p>
      <!-- 密码框 -->
      <van-cell-group>
        <van-field v-model="value2" type="password" />
      </van-cell-group>
      <p class="p1 clearfix">
        <van-checkbox v-model="check">
          <span class="mdl">是否七天免登陆</span>
        </van-checkbox>
        <a href class="text3">忘记密码</a>
      </p>
      <van-button type="primary" size="large" class="login" @click="login"
        >登录</van-button
      >
      <p class="p2">
        <span>——</span>
      </p>
      <p class="p3">
        <a href>还没有账号?</a>
        <span class="text4" @click="goto('./reg')">免费注册</span>
      </p>
      <van-checkbox v-model="checked" shape="square" class="p4"
        >已阅读《丝芙兰用户服务协议》和《丝芙兰隐私政策》</van-checkbox
      >
      <div class="picture">
        <a href>
          <img src="../assets/img/weibo_icon.png" alt class="pic" />
          <em>新浪微博</em>
        </a>
        <a href>
          <img src="../assets/img/qq_icon.png" alt class="pic" />
          <em>QQ好友</em>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import cart from "../api/cart";
import user from "@/api/user";
import { setToken, setUser, setCookie, getCookie } from "../utlis/auth";
// console.log(user);
export default {
  data() {
    return {
      value1: "", //用户名
      value2: "", //密码
      check: false, //是否七天免登陆
      checked: false //是否勾选用户协议
    };
  },

  components: {},

  methods: {
    goto(path) {
      this.$router.push(path);
    },
    // 实现登录
    login() {
      // console.log(this.value1,this.value2,this.checked);
      // console.log(0);
      if (this.checked) {
        // console.log(2);
        let password = this.$md5(this.value2);
        user
          .login(this.value1, password)
          .then(res => {
            // console.log(3);
            // console.log(res.data);//登录返回的信息
            if (res.data.code) {
              this.$toast.success({
                message: "登录成功,即将跳转",
                position: top
              });
              if (this.check) {
                setToken(res.data.token, 7);
                //第一个写死为sifulan-token第二个为token或者手机号码第三个过期时间
                setUser(this.value1, 7);
                cart
                  .checkCartName(this.value1)
                  .then(req => {
                    if (req.data.code == "1") {
                      // console.log(1);
                      var n = req.data.data[0].goodArr.replace(/'/g, '"');
                      setCookie("cart", n, 7);
                    }
                    // console.log(req);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                setToken(res.data.token);
                setUser(this.value1);
                cart
                  .checkCartName(this.value1)
                  .then(req => {
                    // console.log(req.data.data[0].goodArr);
                    var n = req.data.data[0].goodArr.replace(/'/g, '"');
                    console.log(JSON.parse(n));
                    setCookie("cart", n);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
              setTimeout(() => {
                // console.log(5);
                this.$router.push("/");
              }, 2000);
              // console.log(6);
              // console.log(this.$store.state,555);
            } else {
              // console.log("登录失败");
              this.$toast.fail({
                message: "登录失败,密码或账号不正确",
                position: top
              });
            }
          })
          .catch(err => {
            // console.log(4);
            console.log(err);
          });
      } else {
        this.$toast.fail({
          message: "请阅读用户协议",
          position: top
        });
      }
    }
  },
  created() {
    console.log(this.$route);
    this.value1 = this.$route.query.username;
    this.value2 = "";
  }
};
</script>

<style scoped lang='scss'>
@import "@/assets/scss/public/common.scss";
header {
  height: vw(88);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 vw(20);
  .pic1 {
    height: vw(36);
    height: vw(36);
  }
  span {
    font-size: vw(30);
    color: #666;
  }
}
.content {
  padding: 0 vw(20);
  .text1 {
    font-size: vw(60);
    font-weight: 400;
    margin: vw(36) vw(16) vw(12) 0;
  }
  .text2 {
    font-size: vw(15);
    color: #ccc;
  }
  .text3 {
    font-size: vw(30);
    color: #666;
    // display: inline-block;
  }
  .p1 {
    margin: vw(55) 0;
    .van-checkbox {
      float: left;
      .mdl {
        color: #666;
      }
    }
    a {
      float: right;
    }
  }
  .login {
    background-color: #000;
    border: none;
  }
  .p2 {
    text-align: center;
    line-height: vw(2);
    padding-top: vw(42);
  }
  .p3 {
    text-align: center;
    a {
      color: #666;
      line-height: vw(100);
    }
    .text4 {
      color: black;
    }
  }
  .p4 {
    font-size: vw(24);
    text-align: center;
  }
  .picture {
    display: flex;
    justify-content: space-around;
    margin: vw(50) 0 vw(100);
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: vw(182);
      justify-content: space-between;
      .pic {
        height: vw(120);
      }
      em {
        font-size: vw(22);
        font-style: initial;
        color: #666;
      }
    }
  }
}
</style>
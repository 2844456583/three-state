<template>
  <div class="reg">
    <header>
      <img
        src="../assets/img/shape.png"
        alt
        class="pic1"
        @click="goto('/login')"
      />
    </header>
    <div class="content">
      <h3>注册</h3>
      <!-- <div class="security">
        <p class="text1">图形验证码</p>
        <div class="cont">
          <van-field v-model="text" class="input1" />
          <div class="sec"></div>
        </div>
      </div>-->
      <div class="security">
        <p class="text1">手机</p>
        <div class="cont">
          <van-field v-model.trim="text1" class="input1" @blur="checkNumber" />
          <!-- <div class="getsec">获取验证码</div> -->
        </div>
      </div>
      <!-- <div class="security">
        <p class="text1">短信验证码</p>
        <van-field v-model="text2" class="input2" />
      </div>-->
      <div class="security">
        <p class="text1">密码</p>
        <van-field
          v-model.trim="text3"
          class="input2"
          type="password"
          @blur="checkPsd"
        />
      </div>
      <div class="securit">
        <van-field
          v-model.trim="text4"
          class="input2"
          type="password"
          placeholder="确认密码"
          @blur="isqual"
        />
      </div>
      <van-button
        type="primary"
        size="large"
        :class="{ login: !lock4, login1: lock4 }"
        @click="reg()"
        >同意条款并注册</van-button
      >
      <!-- login:灰色，login1:绿色 -->
      <p class="p2">
        <span>——</span>
      </p>
      <van-checkbox
        v-model="checked"
        shape="square"
        class="p4"
        @click="iscanreg"
        >已阅读《丝芙兰用户服务协议》和《丝芙兰隐私政策》</van-checkbox
      >
      <img src="../assets/img/mobile_register.png" alt class="pic2" />
    </div>
  </div>
</template>

<script>
import check from "../utlis/check";
import user from "@/api/user";
import cart from "../api/cart";
// const toast = Toast.loading({
//   message: '加载中...',	//加载的时候显示的文字
//   duration:0,						//展示时长(ms)，值为 0 时，toast 不会消失
//   overlay:true, 				//是否显示遮罩层
//   forbidClick: true			//是否禁止背景点击
// });
export default {
  data() {
    return {
      text: "",
      text1: "", //手机号
      text2: "",
      text3: "", //密码
      text4: "", //确认密码
      checked: false, //是否已勾选
      lock1: false, //表示是否是手机号
      lock2: false, //表示密码是否符合规则
      lock3: false, //表示第二次输入密码是否跟第一次输入密码相同
      lock4: false, //是否可以注册，可以按钮变成绿色
      isexist: 0 //手机号在数据库是否存在 0表示已存在不能再注册
    };
  },

  components: {},

  methods: {
    goto(path) {
      this.$router.push(path);
    },
    // 检查是否是一个手机号
    checkNumber() {
      if (check.checkPhone(this.text1)) {
        this.lock1 = true;
        // console.log("this.lock1:",this.lock1);
        user
          .checkName(this.text1)
          .then(res => {
            console.log(res.data);
            this.isexist = res.data.code;
          })
          .catch(err => {
            console.log(err);
          });
        // console.log(this.$options.methods);
        // console.log(1);
        // check
      } else {
        this.lock1 = false;
        // console.log(0);
        this.$toast.fail({
          message: "您输入的不是一个手机号",
          position: top
        });
      }
    },
    // 检查密码是否有数字和字母，且长度要在8-16位之间
    checkPsd() {
      if (check.checkPassword(this.text3)) {
        this.lock2 = true;
        // console.log("密码符合条件");
      } else {
        this.lock2 = false;
        // console.log("密码必须有数字和字母，且长度要在8-16位之间");
        this.$toast.fail({
          message: "密码必须有数字和字母，且长度要在8-16位之间",
          position: top
        });
      }
      if (this.text3 == this.text4 && this.text3 != "") {
        this.lock3 = true;
        // console.log("xiangdeng");
      }
      if (this.text4 != "" && this.text3 != this.text4) {
        this.$toast.fail({
          message: "两次输入的密码不一致",
          position: top
        });
      }
    },
    // 判断确认密码是否跟上一次相同
    isqual() {
      // console.log(1);
      if (this.text3 == this.text4 && this.text4 != "") {
        this.lock3 = true;
        console.log("xiangdeng");
      } else {
        console.log(2);
        this.lock3 = false;
        if (this.text4 == "") {
          this.$toast.fail({
            message: "请确认您的密码",
            position: top
          });
        } else {
          this.$toast.fail({
            message: "两次输入的密码不一致",
            position: top
          });
        }
      }
    },
    // 判断是否可以注册，如果可以注册，按钮变成绿色
    iscanreg() {
      if (this.lock1 && this.lock2 && this.lock3 && this.checked) {
        this.lock4 = true;
      } else {
        this.lock4 = false;
      }
      // console.log(this.lock1,this.lock2,this.lock3,this.checked);
      // console.log("this.lock4:",this.lock4);
    },
    reg() {
      // console.log(this.isexist);
      if (this.lock4 && this.isexist) {
        // console.log(this.text1, this.text3);
        // md5加密
        let password = this.$md5(this.text3);
        user
          .reg(this.text1, password)
          .then(res => {
            // console.log(res);
            this.$toast.success({
              message: "注册成功",
              position: top
            });
            cart.addCart(this.text1, []).then(() => {
              console.log("添加新用户购物车成功");
            });
            this.$router.push({
              path: "/login",
              query: { username: this.text1 }
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$toast.fail({
          message: "该手机号已被占用",
          position: top
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
.reg {
  overflow: scroll;
}
.reg::-webkit-scrollbar {
  display: none;
}
header {
  height: vw(88);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 vw(20);
  .pic1 {
    height: vw(36);
    width: vw(36);
  }
}
.content {
  padding: 0 vw(18);
  h3 {
    font-size: vw(60);
    margin-top: vw(40);
    font-weight: 400;
  }
  .security {
    height: vw(120);
    border-bottom: vw(4) solid #999;
    .text1 {
      font-size: vw(15);
      color: #ccc;
    }
    .cont {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .van-cell::after {
        border-bottom: none;
      }
      .input1 {
        padding: vw(20) 0;
        width: vw(514);
      }
      .sec {
        width: vw(200);
        height: vw(70);
        background-color: rgb(167, 164, 164);
      }
      .getsec {
        width: vw(180);
        height: vw(60);
        background-color: rgb(196, 190, 190);
        text-align: center;
        line-height: vw(60);
        color: white;
      }
    }
    .input2 {
      padding: vw(20) 0;
    }
  }
  .securit {
    display: flex;
    height: vw(120);
    border-bottom: vw(4) solid #999;
    align-items: center;
    .input2 {
      padding: vw(20) 0;
    }
  }
  .p2 {
    text-align: center;
    line-height: vw(2);
    padding-top: vw(42);
  }
  .p4 {
    font-size: vw(24);
    text-align: center;
    margin-top: vw(50);
  }
  .login {
    background: #999;
    border: none;
    margin-top: vw(50);
  }
  .login1 {
    background: #58bc58;
    border: none;
    margin-top: vw(50);
  }
  .pic2 {
    width: 100%;
    margin-top: vw(100);
  }
}
</style>
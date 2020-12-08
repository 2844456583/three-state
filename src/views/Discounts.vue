<template>
  <div>
    <header>
      <a href="###">
        <img class="logo" src="../assets/img/shape.png" alt @click="toBack" />
      </a>
      <h3 class="title">每周特惠</h3>
      <van-icon name="ellipsis" />
    </header>
    <div class="content">
      <li>
        <img src="../assets/img/ws1001_01.jpg" alt="" class="pic1" />
      </li>
      <li>
        <img src="../assets/img/ws1001_02.jpg" alt="" class="pic2" />
      </li>
      <li>
        <ul class="ul_outside">
          <li
            class="li_inside"
            v-for="item in List"
            :key="item._id"
            @click="
              godetails(
                item.url,
                item.brand,
                item.title,
                item.price,
                item.type
              )
            "
          >
            <img
              src="../assets/img/listtag20201003_640x160.png"
              alt=""
              class="miaosha"
            />
            <div class="pic">
              <img :src="item.url" alt="" />
            </div>
            <div class="pinpai">
              {{ item.brand }}
            </div>
            <div class="shangpin">
              {{ item.title }}
            </div>
            <div class="pri">
              <span class="text1">折前价{{ item.price }}</span>
              <span>折后价{{ item.pricel }}</span>
            </div>
            <div class="liji"></div>
          </li>
        </ul>
      </li>
    </div>
  </div>
</template>

<script>
import good from "../api/good";
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
// console.log(good);
export default {
  data() {
    return {
      listname: "hufu",
      page: 1,
      maxcount: 6,
      List: []
    };
  },

  components: {},
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.onScroll2, true);
    });
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    },
    //点击商品到详情页
    godetails(url, brand, title, price, type) {
      this.$router.push({
        path: "/productDetails",
        query: { url, brand, title, price, type }
      });
    },
    getScrollTop2() {
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    // 获取当前可视范围的高度
    getClientHeight2() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      }
      return clientHeight;
    },

    // 获取文档完整的高度
    getScrollHeight2() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
    },
    // 滚动事件触发下拉加载
    onScroll2() {
      if (
        this.getScrollHeight2() -
          this.getClientHeight2() -
          this.getScrollTop2() <=
        1
      ) {
        delay(() => {
          // console.log(this.page, 11);
          this.page++;
          good
            .getDetailsMessage(this.listname, this.page, this.maxcount)
            .then(res => {
              // console.log(res);
              res.data.data.forEach(item => {
                item.price = item.price.split("<")[0];
                item.pricel = parseInt(item.price.slice(1)) * 0.5;
                // console.log(item);
                this.List.push(item);
              });
            })
            .catch(err => {
              // console.log(err);
            });
        }, 300);
      }
    }
  },
  created() {
    good
      .getDetailsMessage(this.listname, this.page, this.maxcount)
      .then(res => {
        // console.log(res);
        res.data.data.forEach(item => {
          item.pricel = parseInt(item.price.slice(1)) * 0.5;
          // console.log(item);
          this.List.push(item);
        });
      })
      .catch(err => {
        // console.log(err);
      });
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
  .title {
    font-weight: 400;
  }
  .van-icon {
    font-size: vw(50);
    color: rgb(102, 100, 100);
  }
}
.content {
  margin-top: vw(88);
  width: 100vw;
  .pic1 {
    width: vw(750);
    height: vw(850);
  }
  .pic2 {
    width: vw(750);
    height: vw(322);
  }
  .ul_outside {
    width: 100vw;
    background-image: url(../assets/img/ws0924_03.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    padding: vw(50) 0;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    .li_inside {
      width: vw(345);
      height: vw(520);
      border: vw(1) solid #ccc;
      background-color: #fff;
      margin: 0 0 vw(19) vw(19);
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: vw(24);
      .miaosha {
        position: absolute;
        top: 0;
        width: vw(345);
      }
      .pic {
        width: vw(280);
        height: vw(280);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .pinpai {
        margin-top: vw(20);
      }
      .shangpin {
        height: vw(62);
        margin: vw(5) 0;
      }
      .pri {
        margin-top: vw(8);
        .text1 {
          margin-right: vw(10);
          color: #767676;
        }
      }
      .liji {
        margin-top: vw(5);
        width: vw(160);
        height: vw(38);
        background-image: url(../assets/img/button_0331.jpg);
        background-size: cover;
      }
    }
  }
}
</style>
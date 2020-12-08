<template>
  <div class="content">
    <div class="sort">
      <van-dropdown-menu active-color="red" :overlay="false">
        <van-dropdown-item v-model="value1" :options="option1" title="综合" />
        <van-dropdown-item v-model="value2" :options="option2" title="销量" />
        <van-dropdown-item v-model="value3" :options="option3" title="价格" />
        <van-dropdown-item v-model="value2" :options="option2" title="筛选" />
        <van-dropdown-item v-model="value2" title />
        <div class="div_icon">
          <van-icon name="apps-o" size="24" color="#666" />
        </div>
      </van-dropdown-menu>
    </div>

    <!-- 品牌部分 -->
    <div class="brand">
      <div class="brand_top">
        <div class="brand_top_left">
          <img src="../../assets/img/sephoracollection.png" alt class="pic1" />
          <span class="text1">{{ smalltype }}</span>
        </div>
        <div class="brand_top_right">
          <!-- <span class="text2">品牌故事</span> -->
          <!-- <span class="text3">></span> -->
        </div>
      </div>
      
      <div class="brand_bottom">
        <a href="#">
          <img
            src="../../assets/img/mb-seb-top-banner_brand.jpg"
            class="pic1"
            alt
          />
        </a>
      </div>
    </div>
    <!--写死的7个小的品牌 -->
    <div class="brand_con">
      <div class="brand_screen">
        <div class="brand_screen_cont" @click="changedetails">
          <a href="javascript:;">
            <img src="../../assets/img/1_n_09183.jpg" alt />
            <p>护肤</p>
          </a>
        </div>
        <div class="brand_screen_cont" @click="changedetails">
          <a href="javascript:;">
            <img src="../../assets/img/1_n_06595_150x150.jpg" alt />
            <p>彩妆</p>
          </a>
        </div>
        <div class="brand_screen_cont" @click="changedetails">
          <a href="javascript:;">
            <img src="../../assets/img/1_n_06675_150x150.jpg" alt />
            <p>香水</p>
          </a>
        </div>
        <div class="brand_screen_cont" @click="changedetails">
          <a href="javascript:;">
            <img src="../../assets/img/1_n_06817_150x150.jpg" alt />
            <p>工具</p>
          </a>
        </div>
        <div class="brand_screen_cont" @click="changedetails">
          <a href="javascript:;">
            <img src="../../assets/img/1_n_07551_150x150.jpg" alt />
            <p>男士</p>
          </a>
        </div>
        <div class="brand_screen_cont" @click="changedetails">
          <a href="javascript:;">
            <img src="../../assets/img/1_n_08845_150x150.jpg" alt />
            <p>洗浴护体</p>
          </a>
        </div>
        <div class="brand_screen_cont" @click="changedetails">
          <a href="javascript:;">
            <img src="../../assets/img/1_n_07637_150x150.jpg" alt />
            <p>美发护发</p>
          </a>
        </div>
        <div class="brand_screen_cont" @click="changedetails">
          <a href="javascript:;">
            <img src="../../assets/img/1_n_07775_150x150.jpg" alt />
            <p>肤食</p>
          </a>
        </div>
      </div>
    </div>
    <!-- 渲染请求的数据的部分 -->
    <div class="data_goods">
      <a
        href="javascript:;"
        v-for="item in List"
        :key="item._id"
        @click="
          godetails(item.url, item.brand, item.title, item.price, item.type)
        "
      >
        <div class="cont">
          <div class="pic">
            <img :src="item.url" alt />
            <van-icon name="cart-o" size="20" color="#999" />
          </div>
          <div class="text">
            <p
              :class="{ text1: item.bool1, text4: item.bool2 }"
              v-text="item.value"
            ></p>
            <p class="text2">{{ item.brand }}</p>
            <p class="text3">{{ item.title }}</p>
            <p>{{ item.price }}</p>
          </div>
        </div>
      </a>
    </div>
    <van-icon name="bag" size="50" color="#ddd6d6" />
  </div>
</template>

<script>
import good from "../../api/good";
// 节流用
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
// 伪造数据还没有接收回来的假现象数据

// 护肤:hufu 彩妆：caizhuang 香水：xiangshui 工具：tools 男士：man
//洗浴护体：muyu 美发护发：hair 肤食：food
const objc = {
  hufu: "护肤",
  caizhuang: "彩妆",
  xiangshui: "香水",
  tools: "工具",
  man: "男士",
  muyu: "洗浴护体",
  hair: "美发护发",
  food: "肤食"
};
export default {
  data() {
    return {
      listname: "hufu",
      page: 1,
      maxcount: 6,
      value1: 0,
      value2: -1,
      value3: -1,
      bool1: false, //记录是否按销量递减排序
      smalltype: "",
      origin: "",
      option1: [
        { text: "按新品排序", value: 0 },
        { text: "综合排序", value: 1 },
        { text: "按人气排序", value: 2 }
      ],
      option2: [
        { text: "销量增序", value: 0 },
        { text: "销量降序", value: 1 }
      ],
      option3: [
        { text: "价格增序", value: 0 },
        { text: "价格降序", value: 1 }
      ],
      List: [], //存放拿回来的数据的地方
      // bool1: true,//判断text1是否显示
      // bool2: false,//判断text4是否显示
      List1: [], //记录请求回来的相反的顺序，来做新品功能
      lock: true, //true表示数据没有到最后一条，还可以请求
      content: ""
    };
  },
  components: {},
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.onScroll2, true);
    });
  },
  // destroyed() {
  //   this.$nextTick(function() {
  //     window.removeEventListener("scroll", this.onScroll2);
  //   });
  // },
  methods: {
    // 上面八个小的牌子的跳转
    changedetails() {
      this.$router.push("./list");
    },
    //点击商品到详情页
    godetails(url, brand, title, price, type) {
      this.$router.push({
        path: "/productDetails",
        query: { url, brand, title, price, type }
      });
    },
    // 获取滚动条当前的位置
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
      // if (
      //   this.lock == false &&
      //   this.getScrollHeight2() -
      //     this.getClientHeight2() -
      //     this.getScrollTop2() <=
      //     1
      // ) {
      //   this.$toast.fail({
      //     message: "已经到底了喔~~",
      //     position: top
      //   });
      // }
      if (
        this.getScrollHeight2() -
          this.getClientHeight2() -
          this.getScrollTop2() <=
          1 &&
        this.lock
      ) {
        //延时加载防止抖动
        // console.log("hahhahha");
        delay(() => {
          // 做的懒加载效果
          // for (let i = 0; i < 6; i++) {
          //   this.List.push(obj[i]);
          //   // console.log(this.List);
          // }
          good
            .getDetailsMessage(this.listname, this.page, this.maxcount)
            .then(res => {
              // for (let i = 0; i < 6; i++) {
              //   this.List.pop();
              // }
              // console.log(res.data.data, 99999);
              if (res.data.data == undefined) {
                this.lock = false;
                return;
              }

              this.page += 1;
              // console.log(res.data.data,2222);
              let arr = ["新品", "独家", ""];
              let bool1 = false;
              let bool2 = false;

              res.data.data.forEach((item, index) => {
                // console.log(item.price.split("<")[0],item.price.split(">")[2],666);
                // 截取出想要的部分的价格
                if (item.price.split(">")[2] != undefined) {
                  item.price =
                    item.price.split("<")[0] + item.price.split(">")[2];
                } else {
                  item.price = item.price.split("<")[0];
                }
                // 随机一个上面数组中的值
                var k = parseInt(Math.random() * 3);
                item.value = arr[k];
                if (k == 0) {
                  bool1 = false;
                  bool2 = true;
                } else if (k == 1) {
                  bool1 = true;
                  bool2 = false;
                } else {
                  bool1 = false;
                  bool2 = false;
                }
                item.bool1 = bool1;
                item.bool2 = bool2;
                // console.log(item);
                this.List.push(item);
              });
              this.List1 = this.List.slice(0, this.List.length);
            })
            .catch(err => {
              console.log(err);
            });
        }, 300);
      }
    }
  },
  watch: {
    value1: {
      handler(newval) {
        // console.log(newval);
        if (newval == 0) {
          this.List = this.List1.slice(0, this.List1.length);
        } else if (newval == 1) {
          this.List.sort((a, b) => {
            var c = a.salenum + a.hotnum;
            var d = b.salenum + b.hotnum;
            return d - c;
          });
        } else if (newval == 2) {
          this.List.sort((a, b) => {
            var c = a.hotnum;
            var d = b.hotnum;
            return d - c;
          });
        }
      }
    },
    value2: {
      handler(newval) {
        if (newval == 0) {
          this.List.sort((a, b) => {
            return a.salenum - b.salenum;
          });
        } else {
          this.List.sort((a, b) => {
            return b.salenum - a.salenum;
          });
        }
      }
    },
    value3: {
      handler(newval) {
        console.log(newval);
        if (newval == 0) {
          this.List.sort((a, b) => {
            var index1 = a.price.indexOf("￥");
            var index2 = a.price.indexOf(".");
            console.log(a.price, typeof a.price, b.price, typeof b.price);
            var c = parseInt(a.price.substring(index1 + 1, index2));
            var index3 = b.price.indexOf("￥");
            var index4 = b.price.indexOf(".");
            // console.log("b:",index3+1,index4);
            var d = parseInt(b.price.substring(index3 + 1, index4));
            // console.log(c,typeof c,d,typeof d);
            // console.log("-------------------");
            return c - d;
          });
        } else {
          this.List.sort((a, b) => {
            var index1 = a.price.indexOf("￥");
            var index2 = a.price.indexOf(".");
            console.log(a.price, typeof a.price, b.price, typeof b.price);
            var c = parseInt(a.price.substring(index1 + 1, index2));
            var index3 = b.price.indexOf("￥");
            var index4 = b.price.indexOf(".");
            // console.log("b:",index3+1,index4);
            var d = parseInt(b.price.substring(index3 + 1, index4));
            // console.log(c,typeof c,d,typeof d);
            // console.log("-------------------");
            return d - c;
          });
        }
        // console.log(this.List);
      }
    }
  },
  created() {
    // console.log(1);
    // 获取收索的关键字
    if (this.$route.query.content) {
      this.content = this.$route.query.content;
    }
    // good.search(this.content)
    this.List = [];
    this.listname = this.$route.query.listname;
    this.smalltype = this.$route.query.smalltype;
    // this.number = this.$route.query.number;
    // for (let i = 0; i < 6; i++) {
    //   this.List.push(obj[i]);
    // }
    // console.log(this.smalltype,5555);
    let promis;
    if (this.content != "") {
      console.log(this.content, 88888);
      this.origin = this.content;
      promis = good.search(this.content);
    } else {
      if (this.smalltype) {
        this.origin = this.smalltype;
        promis = good.getSmallTypeListImg(
          this.listname,
          this.page,
          this.maxcount,
          this.smalltype
        );
      } else {
        this.smalltype = objc[this.listname];
        promis = good.getDetailsMessage(
          this.listname,
          this.page,
          this.maxcount
        );
      }
    }

    promis
      .then(res => {
        // for (let i = 0; i < 6; i++) {
        //   this.List.pop();
        // }
        console.log(res);
        this.page += 1;
        // console.log(res.data.data,2222);
        let arr = ["新品", "独家", ""];
        let bool1 = false;
        let bool2 = false;
        res.data.data.forEach((item, index) => {
          // console.log(item.price.split("<")[0],item.price.split(">")[2],666);
          // 截取出想要的部分的价格
          if (item.price.split(">")[2] != undefined) {
            item.price = item.price.split("<")[0] + item.price.split(">")[2];
          } else {
            item.price = item.price.split("<")[0];
          }
          // 随机一个上面数组中的值
          var k = parseInt(Math.random() * 3);
          item.value = arr[k];
          if (k == 0) {
            bool1 = false;
            bool2 = true;
          } else if (k == 1) {
            bool1 = true;
            bool2 = false;
          } else {
            bool1 = false;
            bool2 = false;
          }
          item.bool1 = bool1;
          item.bool2 = bool2;
          // console.log(item);
          this.List.push(item);
        });
        this.List1 = this.List.slice(0, this.List.length);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
.content {
  margin-top: vw(184);
  // height: vw(1246);
  background-color: #f5f5f5;
  // color: #ddd6d6;
  // overflow-y: auto;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  // position: relative;
  .sort {
    position: fixed;
    width: 100vw;
    top: vw(90);
    z-index: 100;
    .van-dropdown-menu {
      position: relative;
      div.van-dropdown-menu__bar {
        height: vw(96);
      }
      .div_icon {
        position: absolute;
        left: vw(652);
        top: vw(24);
        width: vw(50);
        height: vw(50);
        background-color: #fff;
        z-index: 10000;
        .van-icon {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .brand {
    background-color: #fff;
    width: 100vw;
    // height: vw(500);
    box-sizing: border-box;
    padding: vw(14) vw(20);
    // 品牌部分
    .brand_top {
      padding: vw(14) vw(20);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .brand_top_left {
        display: flex;
        align-items: center;
        .pic1 {
          width: vw(144);
          height: vw(60);
        }
        .text1 {
          font-size: vw(30);
          line-height: vw(60);
        }
      }

      .brand_top_right {
        position: relative;
        line-height: vw(60);
        .text2 {
          font-size: vw(24);
          display: inline-block;
          padding-right: vw(10);
          color: #666;
        }
        .text3 {
          position: absolute;
          top: vw(2);
          font-size: vw(40);
          color: #666;
        }
      }
    }
    
    .brand_bottom {
      width: vw(710);
      height: vw(308);
      position: relative;
      background: url(../../assets/img/product_loading.gif) center center;
      .pic1 {
        width: 100%;
        // height: vw(50);
      }
    }
  }
  .brand_con {
    width: 100%;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .brand_screen {
      padding: vw(20) 0 0 vw(20);
      height: vw(180);
      width: vw(1280);
      display: flex;
      flex-wrap: nowrap;
      .brand_screen_cont {
        flex-shrink: 0;
        width: vw(140);
        height: vw(160);
        padding: vw(10) 0;
        margin-right: vw(20);
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img {
          width: vw(100);
          margin-bottom: vw(20);
        }
        p {
          font-size: vw(26);
          text-align: center;
        }
      }
    }
  }
  .data_goods {
    margin-top: vw(20);
    padding: 0 vw(20) 0;
    width: vw(710);
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    a:nth-child(2n-1) {
      .cont {
        border-right: 1px solid rgb(228, 223, 223);
      }
    }
    .cont {
      width: vw(355);
      height: vw(576);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      background-color: white;
      border-bottom: 1px solid rgb(228, 223, 223);
      .pic {
        width: vw(320);
        height: vw(346);
        // background-color: #58bc58;
        position: relative;
        background: url(../../assets/img/product_loading.gif) center center;
        img {
          margin-top: vw(26);
          width: 100%;
        }
        .van-icon {
          position: absolute;
          right: vw(5);
          bottom: vw(10);
        }
      }
      // 下面字体部分
      .text {
        width: 100%;
        box-sizing: border-box;
        padding: vw(20);
        // display: flex;
        // flex-direction: row;
        .text1 {
          width: vw(50);
          padding: vw(3) vw(10);
          font-size: vw(22);
          background-color: #2dbeff;
          color: #fff;
        }
        .text4 {
          width: vw(50);
          padding: vw(3) vw(10);
          font-size: vw(22);
          background-color: #ee0105;
          color: #fff;
        }
        .text2 {
          font-size: vw(18);
          line-height: vw(30);
          font-weight: 600;
        }
        .text3 {
          font-size: vw(26);
          margin-bottom: vw(14);
          line-height: vw(30);
        }
      }
    }
  }
  .van-icon {
    position: absolute;
    right: vw(50);
    bottom: vw(150);
  }
}
</style>
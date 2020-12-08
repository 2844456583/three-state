<template>
  <div class="good">
    <img :src="goodData.url" alt />
    <p>{{ goodData.title }}</p>
    <p>{{ goodData.brand }}</p>
    <p>{{ goodData.price }}</p>

    <!-- 选择商品 -->
    <div class="selectgood">
      <span>
        选择 已选
        <i>套装</i>
      </span>
      <em>    
        <van-icon color="#bbb" name="arrow" @click="show=true" />
      </em>
    </div>
    <!-- 信息选中的信息 -->
    <div>
      <van-action-sheet v-model="show" title="规格" :round="false">
        <div class="selectCondiction">
          <div class="goodinfo">
            <div class="image"><img :src="goodData.url" alt=""></div>
            <div class="info">
                <p>{{ goodData.title }}</p>
                 <p>{{ goodData.price }}</p>
                 <span>品牌:{{ goodData.brand }}</span>
            </div>
          </div>
          <div class="goodtype">
            <div class="boxleft">
              <span>选择其他</span>
              <em>套装</em>
            </div>
            <div class="boxright">
              <span>已选 <i>套装</i></span>
            </div>
          </div>
          <div class="paynum">
            <div class="word">
              <span>购买数量(每人限购10件)</span>
            </div>
            <div class="number">
              <i class="decrease" @click="paycount<=1?1:paycount--">-</i><span>{{ paycount }}</span><i class="increase" @click="paycount>=10?10:paycount++">+</i>
            </div>
            <div class="footerbutton">
              <div class="buttonLeft" @click="addCart">加入购物车</div>
              <div class="buttonRight" @click="quickBuy">立即购买</div>
            </div>
          </div>
        </div>
      </van-action-sheet>
    </div>

    <!-- 显示品牌 -->
    <div class="brand">
      <p>{{ goodData.brand }}</p>
      <span>
        <van-icon name="arrow" color="#bbb" />
      </span>
    </div>
    <!-- 商品评论 -->
    <div class="comment">
      <span>商品评论</span>
      <em>
        
        <router-link to="/productDetails/comment"><i>此商品还没有评论</i><van-icon color="#bbb" name="arrow"  /></router-link>
      </em>
    </div>

    <!-- 产品咨询 -->
    <div class="contact">
      <span>产品咨询</span>
      <em>
         <router-link to="/productDetails/contact">
        <i>有疑问来发第一个问题</i>
        <van-icon color="#bbb" name="arrow" />
        </router-link>
      </em>
    </div>

    <!-- 商品详情+规格参数 -->
    <div class="detail">
      <div class="top">
        <p>
          <span :class="{redColor:currentbox=='one'}" @click="changeColor('one')">商品详情</span>|
          <span :class="{redColor:currentbox=='two'}" @click="changeColor('two')">规格参数</span>
        </p>
      </div>
      <div class="bigcontent" v-show="currentbox=='one'">
        <div class="context">
          <h3>产品功效</h3>
          <h4>
            纪梵希高定香榭红丝绒唇膏N37 3.4g
            纪梵希高定香榭红丝绒唇膏N36 3.4g
            唇膏壳水蜜桃粉
            丝芙兰中国，限量5000套，售完为止。
          </h4>

          <h3>产地</h3>
          <h4>中国/法国</h4>
          <h5>支付及配送</h5>
          <h6>
            1 在线支付
            <br />支持支付宝、微信、及目前市场所有主流银行卡的在线支付。请在确认订单后选择相应支付界面进行支付。
          </h6>
        </div>
        <div class="price">
          <h5>价格声明</h5>
          <h6>本店商品标注的促销价，为此商品的实际售价。本店标注的其他价格信息，如划线价、专柜价、建议零售价、价值等，为仅供消费者参考的市场价格信息，来源为有关商品实体店的柜台售价、品牌方建议零售价或者根据有关商品正装产品售价和容量推算的价值等，便于您了解市场行情和价格变动。但是，由于地区、时间和行情波动因素，这些价格的实际情况可能与本店标注的其他价格信息有所不同。</h6>
        </div>
        <div class="tuihuo">
          <h5>退换货声明</h5>
          <h6>
            1. 我们不接受包装盒已被开封的商品的退换货（商品外包装盒上的透明封装胶纸已被撕开同样视为开封），请您谅解！
            <br />2. 所有未开封的商品如需退换请于签收日算起14日内办理，退货收到并确认无误后于一周内办理退款。
            <br />3. 如您需整单退换，请您务必将当次订单中所有商品（包括免费赠品、包装礼盒）全部退回。
            <br />4. 因顾客自身原因造成退换货时，由顾客承担商品退回时的邮资和再次发送时的运费。
            <br />5. 如该商品曾被积分，退货后，该笔金额产生的积分将被从积分数中扣除。
            <br />6. 如您希望调换其它等价商品，请您先为需要退回的订单办理退货，我们收到退货并确认无误后，将为您发送新的商品。若您希望调换的为非等价商品，请您先为您的订单办理退货及退款，然后至网站另行订购您喜欢的其它商品，我们将另行发送。
            <br />7. 如您在使用了于丝芙兰网站购买的产品后出现过敏症状，在提供相关医院出具的有效证明后，我们将接受此产品的退货。
          </h6>
        </div>
        <div class="consume">
          <h5>消费提醒</h5>
          <h6>国家药监局提示您：请正确认识化妆品功效，化妆品不能替代药品，不能治疗皮肤病等疾病。国家药监局提示您：宣称用于祛斑美白、防晒、染发、烫发等的化妆品为特殊用途化妆品，产品标签上应标注‘国妆特字’或者‘国妆特进字’的批准文号。</h6>
        </div>
      </div>
      <div class="guige" v-show="currentbox=='two'">
        <h3>适用部位：{{goodData.type}}</h3>
        <h3>功效：造型</h3>
        <h3>适合肤质：各种肤质</h3>
        <h3>质地：固态</h3>
        <h3>妆效：各种妆效</h3>
        <h3>遮盖力：高度</h3>
        <h3>规格：套装</h3>
        <h3>货号：528586</h3>
      </div>
    </div>
  </div>
</template>
<script>
import cartApi from "@/api/cart.js";

export default {
  data() {
    return {
      //是否显示弹出
      show: false,
      // 默认显示详情
      currentbox: "one",
      //默认商品数量为1
      paycount:1,

      //接收的商品信息
      goodData:{},

          //获取当前的登录用户名
      name:this.$store.state.login.currentUser,

      //当前选中的商品信息
      goodArr:[],
      goodObj:{},



    };
  },


  components: {},
  created() {
     this.goodObj={...this.$route.query}
    this.goodData={...this.$route.query};

  },

  methods: {
    changeColor(name) {
      this.currentbox = name;
    },

    //加入购物车按钮
    addCart(){
      cartApi.checkCartName(this.name).then(res=>{
       //该用户已存在
        if(res.data.code){
            // 获取到该用户的商品数据goodsData
            var goodsData = res.data.data[0].goodArr.replace(/\'/g,"\""); 
            goodsData = JSON.parse(goodsData);

          //判断商品是否被添加过
           let isadd =  goodsData.some((item)=>{
              return item.title==this.goodObj.title
            })
            let idx ;
            goodsData.forEach((item,index)=>{
              if( item.title==this.goodObj.title){
                  idx = index;
                  return
              }
            })
        
            //如果被添加过那就添加数量
            if(isadd){
               goodsData[idx]['count']= goodsData[idx].count +1;
          
              goodsData = JSON.stringify(goodsData).replace(/\"/g,"'"); 
              cartApi.updateCartGood(this.name,goodsData);
                 this.$toast.success({
                   message: "已加入购物车",
                  position: top
                  });
             
            }else{
               this.goodObj['ischeck']=false;
               this.goodObj['count']=1;
             
                goodsData.push(this.goodObj);
                 goodsData = JSON.stringify(goodsData).replace(/\"/g,"'"); 
                cartApi.updateCartGood(this.name,goodsData);
                this.$toast.success({
                   message: "已加入购物车",
                  position: top
                  });
             
            }  
        }else{
     // 新用户添加商品数据
        this.goodObj['count']=1;
        this.goodObj['ischeck']=false;
        this.goodArr.push(this.goodObj);
        this.goodArr = JSON.stringify(this.goodArr).replace(/\"/g,"'"); 

        cartApi.addCart(this.name,this.goodArr+"").then(res=>{
        this.$toast.success({
                   message: "已加入购物车",
                  position: top
                  });
             
      })
        }
      })

    },
      //立即购买按钮
    quickBuy() {
      this.addCart();
      this.$router.push("/cart");
    },

    
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";

.good {
  overflow-y: auto;
  height: 85vh;

  img {
    display: block;
    margin: 0 auto;
    width: 85vw;
    height: 85vw;
  }
  p {
    margin: 1vh 5vw;
  }
  .selectCondiction {
    padding: 0px vw(32) ;
    height: 60vh;
    .goodinfo{
      display: flex;
      height: 14vh;
      border-bottom: vw(1) solid #eee;
      padding-bottom: vw(6);
      .image{
        flex: 2;

        padding: 2vw;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        flex: 5;
        position: relative;
        p{
          font-size: vw(28);
        }
        span{
          position: absolute;
          color: #ccc;
          font-size: vw(26);
          right: vw(8);
          bottom: vw(8);
        }
      }
    }
    .goodtype{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 15vh;
      border-bottom: vw(1) solid #eee;
      .boxleft{
        width: 30vw;
        height: 12vh;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
       align-items:flex-start;
        span{
          font-size: vw(26);
        }
        em{
          border: vw(2) solid #000;
          padding: vw(14);
          font-style: normal;
          font-size: vw(30);

        }
      }
      .boxright{
        width: 30vw;
        height: 12vh;
        display: flex;
       justify-content: flex-end;
       color: #666;
         
         padding-top: vw(16);
         font-size: vw(26);
       i{
         font-style: normal;
         color: #000;
         font-size: vw(26);
         
       }
      }
    }
    .paynum{
      display: flex;
      justify-content: space-between;
      margin-top: vw(28);
      width: 100%;
      .word{
        width: 36vw;
        height: 5vh;
        font-size: vw(24);
   
      }
      .number{
         width: 30vw;
        height: 5vh;
       color: #666;
       display: flex;
       justify-content: flex-end;
       align-items: center;
       span{
         border: vw(2) solid #eee;
         padding: vw(6) vw(12);
       }
       i{
          border: vw(2) solid #eee;
         padding: vw(6) vw(12);
       }
      }

    }
    .footerbutton{
      position: fixed;
      display: flex;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100vw;
      height: 8vh;
      .buttonLeft{
        flex: 1;
       
        background-color: #000;
        color: #fff;
        text-align: center;
        line-height: 8vh;

      }
      .buttonRight{
        flex: 1;
        text-align: center;
        line-height: 8vh;
         color: #fff;
        background-color: #e00;

      }
    }
  }

  //选择商品规格
  .selectgood {
    margin-top: 4vh;
    // padding: 0 3vw;
    border-top: 1vh solid #f5f5f5;
    border-bottom: 1vh solid #f5f5f5;
    height: 5vh;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin-left: 3vw;
      i {
        font-style: normal;
        color: #666;
      }
    }
    em {
      font-style: normal;
      margin-right: 3vw;
      margin-top: 2vw;
    }
  }

  //展示品牌
  .brand {
    border-top: 3vh solid #f5f5f5;
    border-bottom: 3vh solid #f5f5f5;
    height: 5vh;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    p {
      border: vw(8) solid #fff;
      padding: vw(10);
    }
    span {
      margin-right: 3vw;
    }
  }

  // 产品评论+咨询
  .comment,
  .contact {
    // padding: 0 3vw;
    border-top: 1vh solid #f5f5f5;
    border-bottom: 1vh solid #f5f5f5;
    height: 5vh;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin-left: 3vw;
    }
    em {
      margin-right: 3vw;
      margin-top: 2vw;
      i {
        font-style: normal;
        font-size: vw(24);
        color: #666;
      }
    }
  }
}

// 产品详情+规格参数
.detail {
  width: 100vw;
  height: 80vh;
  background-color: #fff;
  .top {
    width: 100vw;
    height: 8vh;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    p {
      display: flex;
      justify-content: space-between;
      width: 70vw;
      color: #999;
      span {
        &.redColor {
          color: #ee0000;
        }
        color: #999;
        font-size: vw(30);
      }
    }
  }
  .context {
    box-sizing: border-box;
    width: 100vw;
    padding: 0 3vw;
    h3 {
      border-bottom: 1px solid #eee;
      font-weight: normal;
      font-size: vw(28);
      padding: 1vh 0;
    }
    h4 {
      margin-top: 1vh;
      font-weight: normal;
      font-size: vw(26);
      padding-bottom: 3vh;
      color: #666;
    }
    h5 {
      font-weight: normal;
      font-size: vw(28);
    }
    h6 {
      margin-top: 1vh;
      font-weight: normal;
      font-size: vw(26);
      padding-bottom: 2vh;
      color: #666;
    }
  }
  .tuihuo,
  .price,
  .consume {
    border-top: 1.5vh solid #f5f5f5;
    padding: 3vw;
    h5 {
      font-weight: normal;
      font-size: vw(28);
    }
    h6 {
      margin-top: 1vh;
      font-weight: normal;
      font-size: vw(26);
      padding-bottom: 2vh;
      color: #666;
    }
  }
  .guige {
    box-sizing: border-box;
    width: 100vw;
    padding: 0 3vw;
    h3 {
      border-bottom: 1px solid #eee;
      font-weight: normal;
      font-size: vw(28);
      padding: 2vh 0;
    }
  }
}
</style>
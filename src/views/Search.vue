<template>
  <div>
   <header>
    <div class="cancel" @click="goback">
     <van-icon size="25" name="cross" />
    </div>
   <div class="search"> 
     <van-search v-model="content" placeholder="请输入搜索关键词"  @keyup="get($event)" @keydown.down="changeDown()" @keydown.up="changeUp()"  />

     </div>
   
   <div class="btn" @click="searchgoods"><span>搜索</span></div>
  </header>

<div class="hotsearch">
        <h2>历史记录</h2>
        <ul>
            <li v-for="(item,index) in  historyArr" :key="index" @click="content = item">{{item}}</li>
         
        </ul>
    </div>
  <div v-if="content!=''" >
        <section>
            <!-- 这里注意给class添加属性的时候采用的是{属性:true/false}的形式 -->
            <li v-for="(item, index) in myData" :key="index" :class="{grey: index==now}" @click="content=item">
                {{item}}
            </li>
        </section>
  </div>


  </div>
</template>

<script>
import {setSearch,getSearch} from "../utlis/auth"
export default {
  data () {
    return {
        // 搜索记录
        historyArr:[],

        content: '',//搜索内容 
        myData: [],//相关信息 
        now: -1,
    }
  },

  components: {},

  created(){
    if(getSearch()){
       this.historyArr =JSON.parse(getSearch());  
    }
     
    },
  methods: {
    //返回上一层
    goback(){
      this.$router.back();
    },

    //搜索商品
    searchgoods(){
      if(this.content!=''){
    
        let flag = this.historyArr.some(item=>{
          return item == this.content
        })
        if(!flag){
             this.historyArr.push( this.content);
          setSearch(JSON.stringify(this.historyArr),1)
        }
      
       this.$router.push({
         path:"/details",
         query: { content: this.content}
         });
      }
      //清空搜索商品
      this.content=''

    },

    //获取的搜索相关信息
    get: function(ev) {
            // 这里的键码只能通过事件对象$event传进来，因为输入大多数键都应该可以进行搜素，我们要排除的就是up(38)和down(40)
            if (ev.keyCode == 38 || ev.keyCode == 40) {
                return;
            }
            // 这里当按下的键是Enter时，应实现搜索跳转功能
            if(ev.keyCode == 13) {
                window.open('https://www.baidu.com/s?wd=' + this.content);
                this.content = '';
            }
            this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + this.content, {
                jsonp: 'cb'
            }).then(function(res) {
                this.myData = res.data.s;
            }, function() {
                // alert("搜索失败");
            })
        },
        changeDown: function() {
            this.now++;
            if(this.now == this.myData.length) {
                this.now = -1;
            }
            // 这里实现输入框中也显示同样的内容
            this.content = this.myData[this.now];
        },
        changeUp: function() {
            this.now--;
            if (this.now == -2) {
                this.now = this.myData.length;
            }
            this.content = this.myData[this.now];
        }
    },
            

  
}
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
  justify-content:space-evenly;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  .cancel {
    flex: 1;
    color: rgb(138, 135, 135);
    margin-top: vw(10);
    text-align: center;
  }
  .search {
    flex: 7;
    // height: vw(60);
   
  }
  .btn{
    flex: 1;
  
   
  }
}

.hotsearch{
    margin-top: 9vh;
    h2{
        font-weight: normal;
        font-size: vw(30);
      padding: vw(20) ;
    }
    ul{
            padding: 0 vw(30) ;

        li{
        // width: 20vw;
        height: 2vh;
        background-color: #eee;
        color: #333;
        font-size: vw(24);
        padding: vw(20);
        text-align: center;
        float: left;
        margin-right: vw(20);
        margin-bottom: vw(20);;

      
         }
    }
  
}
section{
  position: fixed;
  top: 9vh;
  left: 17vw;
  background-color: #F7F8FA;
   width: 66vw;
  li{
    margin: vw(15);
   
  }
}
</style>
<template>
    <div id="myChart" style="height:500px;width:100%">

    </div>
</template>

<script>
    import Vue from 'vue'
    import {findMaoyan} from '@/api/chat'
    import store from '@/store'

    export default {
        name: "chatview",
        data  () {
          return {
            msg: "Welcome to Your Vue.js App",
          };
        },
        mounted() {
          this.drawLine();
        },
        methods: {
          drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            // 绘制图表
            myChart.setOption({
              title: { text: "在Vue中使用echarts" },
              tooltip: {},
              xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
              },
              yAxis: {},
              series: [
                {
                  name: "销量",
                  type: "bar",
                  data: [5, 20, 36, 10, 10, 20],
                },
              ],
            });
          },
        },
    }
</script>

<style scoped>
    .icontent{
        width: 100%;
        overflow: hidden;
    }
    .my-chat-item{
        height: 51px;
        width: 100%;
        /* background-color: brown; */
        padding: 5px;
        border-bottom: 1px solid gainsboro;
        overflow: hidden;
    }
    .my-chat-ico{
        width: 40px;
        height: 40px;
        float: left;
        position: relative;
    }
    .my-chat-ico img{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .my-chat-msg{
        float: left;
        width: calc(100% - 100px);
        height: 40px;
        /* background-color: aquamarine; */
        padding: 0 5px 0 5px;
        overflow: hidden;
    }
    .my-ms-right{
        float: left;
        width: 60px;
        height: 40px;
        overflow: hidden;
    }
    .my-chat-msg-top{
        width: 100%;
        height: 22px;
        overflow: hidden;
        font-size: 18px;
        line-height: 22px;
    }
    .my-chat-msg-bot{
        width: 100%;
        height: 18px;
        overflow: hidden;
        font-size: 14px;
        line-height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .my-ms-fight-left{
        width: 100%;
        height: 20px;
        text-align: center;
        line-height: 20px;
    }
    .my-ms-fight-right{
        width: 100%;
        height: 20px;
        text-align: center;
        line-height: 20px;
    }
    .add_friend{
        color: rgb(7, 187, 127);
    }
</style>

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

          get_info(){
            findMaoyan().then(response => {
              const data = response.data;
              let file = [];
              for(let i=0;i<7;i++){
                let name = data[1]["电影名称"]
                file.push(data[i]);
              }

            }).catch(error => {
                alert(error)
            });
          },

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
</style>

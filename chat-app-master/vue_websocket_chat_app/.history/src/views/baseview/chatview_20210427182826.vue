<template>
  <div class="far">
    <div id="myChart" class="char"></div>
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
            film : [],
          };
        },
        created:function(){
          this.get_info();
        },
        methods: {

          get_info(){
            findMaoyan().then(response => {
              const data = response.data;
              for(let i=0;i<7;i++){
                let name = data[i]["电影名称"] ;
                let  boxsite = parseFloat(data[i]["综合票房占比"]) 
                let boxtota = data[i]["累计票房"]
                if(boxtota.includes("亿")){
                  boxtota = parseFloat(boxtota) * 10000
                }else{
                  boxtota = parseFloat(boxtota)
                }
                this.film.push([name,boxsite,boxtota]);
              }
              console.log(this.film);
              this.drawLine();
            }).catch(error => {
                alert(error)
            });
          },

          drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            let name = [] , site=[],num=[];
            for(let i of this.film){
              name.push(i[0])
              site.push(i[1])
              num.push(i[2])
            }
            // 绘制图表
            myChart.setOption({
              title: { text: "在Vue中使用echarts" },
              tooltip: {},
              xAxis: {},
              yAxis: {
                data:name,
              },
              series: [
                {
                  name: "销量",
                  type: "bar",
                  data: site,
                },
              ],
            });
          },
        },
    }
</script>

<style scoped>
    .far{
      width: 100%;
      height: ;
    }
    .char{
        width: 100%;
        overflow: hidden;
        height: ;
    }
</style>

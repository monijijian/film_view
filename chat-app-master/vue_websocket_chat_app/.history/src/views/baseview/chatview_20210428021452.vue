<template>
  <div class="far">
    <div id="myChart" class="char"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { findMaoyan } from "@/api/chat";
import store from "@/store";

export default {
  name: "chatview",
  data() {
    return {
      name: [],
      site: [],
      num: [],
      myChart:{}
    };
  },
  mounted: function() {
    this.myChart = this.$echarts.init(document.getElementById("myChart"));
    this.get_info();
    setInterval(()=>{
      this.up_info();
    },3000)
  },
  methods: {

    get_info() {
      findMaoyan()
        .then(response => {
          const data = response.data;
          for (let i = 7; i >= 0; i--) {
            this.name.push(data[i]["电影名称"]);
            this.site.push(parseFloat(data[i]["综合票房占比"]));

            if (data[i]["累计票房"].includes("亿")) {
              this.num.push(parseFloat(data[i]["累计票房"]) * 10000);
            } else {
              this.num.push(parseFloat(data[i]["累计票房"]));
            }
          }
          this.drawLine();
        })
        .catch(error => {
          alert(error);
        });
    },
    up_info() {
      findMaoyan()
        .then(response => {
          const data = response.data;
          for (let i = 7; i >= 0; i--) {
            this.site[i]  = parseFloat(data[i]["综合票房占比"]);

            if (data[i]["累计票房"].includes("亿")) {
              this.num[i] = parseFloat(data[i]["累计票房"]) * 10000;
            } else {
              this.num[i] = parseFloat(data[i]["累计票房"]);
            }
            
          this.drawLine();
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      // let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      console.log("绘制图表")
      this.myChart.setOption({
        title: { text: "排片占比" },
        grid: {
          top: 10,
          bottom: 10,
          left: 130,
          right: 30
        },
        tooltip: {},
        xAxis: {
          max:'dataMax'
        },
        yAxis: {
          type: 'category',
          data: this.name,
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 2 // only the largest 3 bars will be displayed
        },
        series: [
          {realtimeSort: true,
            name: 'X',
            type: 'bar',
            data: this.num,
            label: {
                show: true,
                position: 'right',
                valueAnimation: true
            }
          }
        ],
        legend: {
            show: true
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      });
    },
  }
};
</script>

<style scoped>
.far {
  width: 100%;
  height: 750px;
}
.char {
  width: 100%;
  overflow: visible;
  height: 100%;
  background-color: antiquewhite;
  margin: auto;
}
</style>

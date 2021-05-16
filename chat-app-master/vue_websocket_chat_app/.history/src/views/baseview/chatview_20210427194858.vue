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
      num: []
    };
  },
  created: function() {
    this.get_info();
  },
  mounted: function() {
    // setInterval(this.up_info, 10000);
    setInterval(()=>{
      this.site[0]+=1;
      console.log(this.site[0],this.name[0])
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
          console.log("hello!!!");
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
            this.name.push(data[i]["电影名称"]);
            this.site.push(parseFloat(data[i]["综合票房占比"]));

            if (data[i]["累计票房"].includes("亿")) {
              this.num.push(parseFloat(data[i]["累计票房"]) * 10000);
            } else {
              this.num.push(parseFloat(data[i]["累计票房"]));
            }
          }
          console.log("upupupup!!!");
        })
        .catch(error => {
          alert(error);
        });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
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
          realtimeSort:true,
          inverse:true,
          data: this.name,
          animationDuration:3000,
          animationDurationUpdata:3000,
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.site,
            label:{
              valueAnimation:true,
            }
          }
        ]
      });
    }
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

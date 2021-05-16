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
      myChart:{},
      res:[]
    };
  },
  mounted: function() {
    this.myChart = this.$echarts.init(document.getElementById("myChart"));
    this.get_info();
    this.myChart.on('click', function (params) {
      console.log(params)
        // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
    });
    setInterval(()=>{
      this.up_info();
    },3000)
  },
  methods: {

    get_info() {
      findMaoyan()
        .then(response => {
          const data = response.data;
          for (let i = 8; i >= 0; i--) {
            let obj = {};
            obj.name = data[i]["电影名称"];
            obj.id = 
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
       this.myChart.setOption({
        title: { text: "累计票房" },
        grid: {
          top: 10,
          bottom: 150,
          left: 150,
          right: 50
        },
        tooltip: {
          type:'shadow'
        },
        xAxis: {
          name:'单位:万',
          max:'dataMax'
        },
        yAxis: {
          type: 'category',
          data: this.name,
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 5 
        },
        series: [
          {realtimeSort: true,
            name: '累计票房',
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
  margin: auto;
}
</style>

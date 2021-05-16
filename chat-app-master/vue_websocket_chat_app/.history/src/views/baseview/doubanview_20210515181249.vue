<template>
  <div class="far">
    <div id="myChart" class="char"></div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import { findDouban} from '@/api/chat'

    export default {
        name: "doubanview",
        data() {
            return {
                names:[],
                socre:[],
                actor:[],
                duration:[]
            };
        },
        mounted: function() {
            this.myChart = this.$echarts.init(document.getElementById("myChart"));
            this.get_info();
        },
        methods: {

            get_info() {
                findDouban().then(response => {
                    const data = response.data;
                    for(let i of data){
                        if(i[1] == '0'){
                            continue
                        }
                        this.names.push(i[0]);
                        this.socre.push(i[1]);
                        for(let j = 2;j<i.length;j++){
                            if(data[j].includes("分钟")){
                                this.duration.push(i[j]);
                            }else{
                                this.actor.push(i[j]);
                            }
                        }
                    }
                    console.log(this.names,this.socre,this.actor,this.duration);
                    this.drawLine();
                }).catch(error => {
                    alert(error);  
                });
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                // let myChart = this.$echarts.init(document.getElementById("myChart"));
                // 绘制图表
                console.log("绘制图表")
                // this.myChart.setOption({
                //     title: { text: "豆瓣评分" },
                //     grid: {
                //     top: 10,
                //     bottom: 150,
                //     left: 150,
                //     right: 50
                //     },
                //     tooltip: {},
                //     xAxis: {
                //     max:'dataMax'
                //     },
                //     yAxis: {
                //     type: 'category',
                //     data: this.names,
                //     inverse: true,
                //     animationDuration: 300,
                //     animationDurationUpdate: 300,
                //     max: 4 // only the largest 3 bars will be displayed
                //     },
                //     series: [
                //     {realtimeSort: true,
                //         name: '评分',
                //         type: 'bar',
                //         data: this.socre,
                //         label: {
                //             show: true,
                //             position: 'right',
                //             valueAnimation: true
                //         }
                //     }
                //     ],
                //     legend: {
                //         show: true
                //     },
                //     animationDuration: 0,
                //     animationDurationUpdate: 3000,
                //     animationEasing: 'linear',
                //     animationEasingUpdate: 'linear'
                // });
            
                this.myChart.setOption( {
                    title:{text:"豆瓣评分"},
                     tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: '评分'
                    },
                    grid: {
                        top:'10%',
                        bottom: '10%',
                        left:'10%'
                    },
                    xAxis: {
                        name:'评分',
                        max:10,
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        max:8,
                        data: this.names
                    },
                    series: [{
                        realtimeSort: true,
                        name:"评分",
                        data: this.socre,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }]
                })
            },
        }
    }
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

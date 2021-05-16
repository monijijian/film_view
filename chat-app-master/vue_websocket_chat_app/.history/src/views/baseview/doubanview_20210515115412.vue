<template>
    <div class="far">
        <div id="myChart" class="char"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '@/store'
    import { findDouban ,findMaoyan} from '@/api/chat'

    export default {
        name: "doubanview",
        data() {
            return {
                sdata:[],
                ndata:[],
                myChart:{}
            };
        },
        mounted: function() {
            //this.myChart = this.$echarts.init(document.getElementById("myChart"));
            this.get_info();
        },
        methods: {

            get_info() {
            findDouban().then(response => {
                const data = response.data;
                console.log(JSON.stringify(response))
                console.log(JSON.stringify(data))
                // this.drawLine();
            }).catch(error => {
                alert(error);  
            });
            },
            drawLine() {
            // 基于准备好的dom，初始化echarts实例
            // let myChart = this.$echarts.init(document.getElementById("myChart"));
            // 绘制图表
            console.log("绘制图表")
            this.myChart.setOption({
                 title: {
                    text: '今日实时票房占比',
                    subtext: '仅前十名',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    data: this.ndata
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                series: [
                    {
                        name: '半径模式',
                        type: 'pie',
                        radius: [20, 140],
                        center: ['25%', '50%'],
                        roseType: 'radius',
                        itemStyle: {
                            borderRadius: 5
                        },
                        label: {
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: this.sdata
                    },
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [20, 140],
                        center: ['75%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5
                        },
                        data: this.sdata
                    }
                ]
            });
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

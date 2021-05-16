<template>
    <div class="far">
        <div id="myChart" class="char"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '@/store'
    import { findMaoyan} from '@/api/chat'
    import * as echarts from 'echarts'
    import 'echarts-wordcloud';

    export default {
        name: "userinfoview",
        data () {
            return {
                data:[],
                option:{},
                obj:{}
            }
        },
        methods: {
            d_chart (){

                var data = this.data;
                for (let i = 0; i < 5; ++i) {
                    data.push(Math.round(Math.random() * 200));
                }
                var option = this.option;
                option = {
                    xAxis: {
                        max: 'dataMax',
                    },
                    yAxis: {
                        type: 'category',
                        data: ['A', 'B', 'C', 'D', 'E'],
                        inverse: true,
                        animationDuration: 300,
                        animationDurationUpdate: 300,
                        max: 2 // only the largest 3 bars will be displayed
                    },
                    series: [{
                        realtimeSort: true,
                        name: 'X',
                        type: 'bar',
                        data: data,
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
                        }
                    }],
                    legend: {
                        show: true
                    },
                    animationDuration: 0,
                    animationDurationUpdate: 3000,
                    animationEasing: 'linear',
                    animationEasingUpdate: 'linear'
                };
                
            },
            run (){
                var data = this.data;
                for (var i = 0; i < data.length; ++i) {
                    if (Math.random() > 0.9) {
                        data[i] += Math.round(Math.random() * 2000);
                    }
                    else {
                        data[i] += Math.round(Math.random() * 200);
                    }
                }
                this.obj.myChart1.setOption(this.option);
            }
        },
        mounted: function() {
            this.obj.myChart1 = this.$echarts.init(document.getElementById("icontent"));
            console.log(this.obj.myChart1);
            this.d_chart();
            this.run();
            setInterval(this.run(),3000)
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

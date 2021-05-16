<template>
    <div id="icontent" style="height:400px;width:400px">

    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '@/store'
    import { findMaoyan} from '@/api/chat'

    export default {
        name: "userinfoview",
        data () {
            return {
                data:[],
                option:{},
                myChart1:{}
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
                this.myChart1.setOption(this.option);
            }
        },
        mounted: function() {
            this.myChart1 = this.$echarts.init(document.getElementById("icontent"));
            this.d_chart();
            this.run();
            // setInterval(this.run(),3000)
        }
    }
</script>

<style scoped>
    .icontent{
        width: 100%;
        overflow: hidden;
    }
    .iheader{
        width: 100%;
        height: 44px;
        position: relative;
        overflow: hidden;
        background-color:  #FFFFFF;
        border-bottom: 1px solid #DCDCDC;
    }
    .toback{
        float: left;
        width: 20px;
        height: 20px;
        margin-top: 12px;
        margin-left: 16px;
    }
    .toback:hover{
        cursor: pointer;
    }
    .toback img{
        height: 100%;
    }
    .ititle{
        float: left;
        height: 16px;
        width: 200px;
        font-size: 14px;
        color: #323A45;
        line-height: 16px;
        margin-top: 14px;
        margin-left: 20px;
    }
    .usericon{
        float: right;
        height: 20px;
        width: 20px;
        border-radius: 10px;
        margin-top: 13px;
        margin-right: 20px;
    }
    .usericon img{
        width: 100%;
    }
    .icontainr{
        height: 100%;
        width: 100%;
    }
    .icontainr ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .icontainr ul li{
        line-height: 50px;
        height: 50px;
        font-size: 14px;
        color: #323A45;
        margin-top: 10px;
        padding-left: 20px;
        background-color: #F5F5F5;
    }
    .icontainr ul li:last-child{
        padding: 0;
        text-align: center;
    }
    .icontainr ul li:last-child:hover{
        cursor: pointer;
    }
</style>

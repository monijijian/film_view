<template>
    <div class="far">
        <div id="myChart" class="char"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '@/store'
    import { login, getInfo, register, logout, getUserfriends, getFriendInfo, addFriend ,findMaoyan} from '@/api/chat'

    export default {
        name: "friendsview",
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
                title: { text: "累计票房" },
                grid: {
                top: 10,
                bottom: 150,
                left: 150,
                right: 50
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
                max: 4 // only the largest 3 bars will be displayed
                },
                series: [
                {realtimeSort: true,
                    name: '单位：万元',
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
    .my-chat-item:hover{
        cursor: pointer;
    }
    .my-chat-ico{
        width: 40px;
        height: 40px;
        float: left;
    }
    .my-chat-ico img{
        width: 100%;
        height: 100%;
    }
    .my-chat-name{
        float: left;
        width: calc(100% - 40px);
        height: 40px;
        padding: 0 5px 0 5px;
        overflow: hidden;
        line-height: 40px;
        font-size: 18px;
    }
</style>

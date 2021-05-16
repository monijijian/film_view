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
                legend: {
                    top: 'right'
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
                        name: '面积模式',
                        type: 'pie',
                        radius: [50, 250],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: [
                            {value: 40, name: 'rose 1'},
                            {value: 38, name: 'rose 2'},
                            {value: 32, name: 'rose 3'},
                            {value: 30, name: 'rose 4'},
                            {value: 28, name: 'rose 5'},
                            {value: 26, name: 'rose 6'},
                            {value: 22, name: 'rose 7'},
                            {value: 18, name: 'rose 8'}
                        ]
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

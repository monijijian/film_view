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
                sdata:[],
                ndata:[],
                myChart:{}
            };
        },
        mounted: function() {
            this.myChart = this.$echarts.init(document.getElementById("myChart"));
            this.get_info();
            // setInterval(()=>{
            // this.up_info();
            // },3000)
        },
        methods: {

            get_info() {
            findMaoyan()
                .then(response => {
                const data = response.data;
                let t_num = 0;
                for (let i = 0; i < 7; i++) {
                    let obj = {};
                    obj.value = parseFloat(data[i]["综合票房占比"]);
                    obj.name = data[i]["电影名称"];
                    this.sdata.push(obj);
                    t_num +=parseFloat(data[i]["综合票房占比"]);
                    this.ndata.push(data[i]["电影名称"]);
                }
                let obj = {};
                obj.value =100 - t_num;
                obj.name = "其余电影";
                this.sdata.push(obj);
                this.ndata.push("其余电影");
                this.drawLine();
                })
                .catch(error => {
                alert(error);
                });
            },
            // up_info() {
            // findMaoyan()
            //     .then(response => {
            //     const data = response.data;
            //     for (let i = 0; i <7; i++) {
            //         this.site[i]  = parseFloat(data[i]["综合票房占比"]);

            //         if (data[i]["累计票房"].includes("亿")) {
            //         this.num[i] = parseFloat(data[i]["累计票房"]) * 10000;
            //         } else {
            //         this.num[i] = parseFloat(data[i]["累计票房"]);
            //         }
                    
            //     this.drawLine();
            //     }
            //     })
            //     .catch(error => {
            //     alert(error);
            //     });
            // },
            drawLine() {
            // 基于准备好的dom，初始化echarts实例
            // let myChart = this.$echarts.init(document.getElementById("myChart"));
            // 绘制图表
            console.log("绘制图表")
            this.myChart.setOption({
                 title: {
                    text: '南丁格尔玫瑰图',
                    subtext: '纯属虚构',
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

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
                        inverse: true,
                        type: 'category',
                        max:10,
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
                        },
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
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

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
                ndata:[],

            }
        },
        methods: {

           word(){
                this.myChart = this.$echarts.init(document.getElementById("myChart"));
                this.myChart.setOption({
                     backgroundColor:'#fff',
                    tooltip: {
                    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
                    },
                    series: [{
                        type: 'wordCloud',
                        shape: 'circle',
                       // maskImage: maskImage,

                        left: 'center',
                        top: 'center',
                        width: '80%',
                        height: '90%',
                        right: null,
                        bottom: null,

                        sizeRange: [10, 80],

                        rotationRange: [-30, 60],
                        rotationStep: 15,
                        autoSize: {
                        enable: true,
                        minSize: 6
                        },
                        textPadding: 0,

                        gridSize: 8,

                        drawOutOfBound: true,

                        layoutAnimation: true,

                        textStyle: {
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold',

                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            focus: 'self',

                            textStyle: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },

                        data:this.ndata
                    }]
                });
           },

         get_info() {
            findMaoyan().then(response => {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    let obj = {};
                    obj.name = data[i]["电影名称"];
                    obj.value = parseFloat(data[i]["排坐占比"])*8000;
                    this.ndata.push(obj);
                }
                
                console.log(this.ndata);
                this.word();
            }).catch(error => {
                alert(error);  
            });
            },
        },
        mounted: function() {
            this.get_info();
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

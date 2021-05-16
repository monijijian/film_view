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
                    series: [{
                        type: 'wordCloud',
                        shape: 'circle',
                       // maskImage: maskImage,

                        left: 'center',
                        top: 'center',
                        width: '70%',
                        height: '80%',
                        right: null,
                        bottom: null,

                        sizeRange: [10, 80],

                        rotationRange: [-90, 90],
                        rotationStep: 45,

                        gridSize: 14,

                        drawOutOfBound: false,

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
                for (let i = 0; i < 20; i++) {
                    let obj = {};
                    obj.name = data[i]["电影名称"];
                    obj.value = parseFloat(data[i]["综合票房占比"])*5000;
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
            console.log('fsdafasdfasfasfsaddsa')
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

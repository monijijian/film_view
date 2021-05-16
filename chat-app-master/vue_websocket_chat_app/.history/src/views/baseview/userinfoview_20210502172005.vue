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

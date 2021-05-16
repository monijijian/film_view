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
            this.get_info();
        },
        methods: {

            get_info() {
                findDouban().then(response => {
                    const data = response.data;
                    for(let i of data){
                        this.name.push(data[0]);
                        this.socre.push(data[1]);
                        for(let j = 2;j<data.length;j++){
                            if(data[j]){
                                this.duration.push(data[j]);
                            }else{
                                this.actor.push(data[j]);
                            }
                        }
                    }
                    
                }).catch(error => {
                    alert(error);  
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

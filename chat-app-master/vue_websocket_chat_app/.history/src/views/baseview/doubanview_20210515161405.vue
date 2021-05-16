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
                res:[],
            };
        },
        mounted: function() {
            this.get_info();
            for(let i = 0;i<10;i++){
                
            }
        },
        methods: {

            get_info() {
                findDouban().then(response => {
                    const data = response.data;
                    
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

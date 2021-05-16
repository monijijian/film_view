<template>
    <div>
        <div id="chat_app">
            <router-view/>
        </div>
        <div class="footer">
            <mu-container>
                <mu-bottom-nav>
                    <mu-bottom-nav-item title="消息" :to="{ name: 'chatview',}" icon="chat"></mu-bottom-nav-item>
                    <mu-bottom-nav-item title="好友" :to="{ name: 'friendsview',}" icon="contacts"></mu-bottom-nav-item>
                    <mu-bottom-nav-item title="我的" :to="{ name: 'userinfoview',}"  icon="account_circle"></mu-bottom-nav-item>
                </mu-bottom-nav>
            </mu-container>
        </div>
    </div>
</template>

<script>
  import $ from 'jquery'
  import {findMaoyan} from '@/api/chat'
  export default {
    name: "chatbase",
    data () {
      return {
        docked: false,
        open: false,
        position: 'left',
      }
    },
    methods: {
        to_chat() {
            this.$router.push({ name: 'chatview'})
        },
        to_friends() {
            this.$router.push({ name: 'friendsview'})
        },
        to_userinfo() {
            this.$router.push({ name: 'userinfoview'})
        },

        get_friends() {
            findMaoyan().then(response => {
              const data = response.data;
              
            }).catch(error => {
                alert(error)
            });
        }
    },
    created: function() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
      this.get_friends();
    },
    watch:{
      $route(to,from){
        console.log(to.path);
      }
    },
  }
</script>

<style scoped>
.footer{
    position: fixed;
    left: 0;
    bottom: 0;
    border-top: #eeeeee solid 1px;
    background: #fffffe;
    width: 100%;
}
</style>

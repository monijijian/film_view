<template>
    <div class="icontent">

    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '@/store'
    import { login, getInfo, register, logout, getUserfriends, getFriendInfo, addFriend ,findMaoyan} from '@/api/chat'

    export default {
        name: "friendsview",
        data () {
            return {
                msg: 'friendsview',
                friends_list: [],
            }
        },
        methods: {
            get_friends() {
                findMaoyan().then(response => {
                  const data = response.data
                  console.log(data);
                  this.film_name = data['film_name'];
                }).catch(error => {
                    alert(error)
                });
            }
        },
        created: function() {
            this.get_friends()
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

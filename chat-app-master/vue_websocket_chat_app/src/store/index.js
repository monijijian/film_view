import Vue from 'vue'
import vuex from 'vuex'
import {findMaoyan} from '@/api/chat'

Vue.use(vuex);

//state为访问状态对象 数字常量等
const state = {
  x:5,
  user_token: localStorage.getItem('ChatUserToken'),
  user_id: localStorage.getItem('ChatUserId'),
  user_account: localStorage.getItem('ChatUserAccount'),
  nickname: localStorage.getItem('ChatUserNickname'),
  all_mag_data: [],
  all_add_msg_data: []
};
//访问触发状态mutation是同步的
//actions是异步的
const mutations = {
  SET_USER_TOKEN: (state, token) => {
    state.user_token = token
  },
  SET_NICK_NAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_USER_ACCOUNT: (state, account) => {
    state.user_account = account
  },
  SET_USER_ID: (state, id) => {
    state.user_id = id
  },
  SET_MSG_DATA: (state, arr) => {
    state.all_mag_data = arr
  },
  SET_ADD_MSG_DATA: (state, arr) => {
    state.all_add_msg_data = arr
  },
};
const actions = {
  Maoyan1(){
    return new Promise((resolve, reject) => {
      findMaoyan().then(response => {
        const data = response.data
        console.log("这里是index的store看我什么时候运行")
        localStorage.setItem('ChatUserToken',data.token)
        commit('SET_USER_TOKEN', data.token)
        resolve()
      }).catch(error => {
        console.log()
        reject(error)
      })
    })
  }
};

//getters 类似于生命周期里面的钩子，getters是在页面刚刚加载完毕之后马上加载，类似于生命周期里面的created
const getters = {
  x: state => state.x + 200,
};
export default new vuex.Store({
  state,
  mutations,
  getters,
  actions
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const axios = require('axios');

const instanceAuth = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

let user = localStorage.getItem('user');
if (!user){
  user = {
    id: -1,
        accessToken: ''
  }
} else {
  try {
    user = JSON.parse(user);
    instanceAuth.defaults.headers.common['authorization'] = user.accessToken;
  } catch (e){
    user = {
      id: -1,
      accessToken: ''
    }
  }
}

export default new Vuex.Store({
  state: {
    status: '',
    user: user,
    userInfos: {
      id: -1,
      name: '',
      email: '',
      password: '',
      admin: '',
      iat: '',
      exp: ''
    }
  },
  getters: {
  },
  mutations: {
    setStatus: function (state, status){
      state.status = status;
    },
    logUser: function (state, user){
      instanceAuth.defaults.headers.common['authorization'] = user.accessToken;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos){
      state.userInfos = userInfos;
    },
    logout: function (state){
      state.user = {
        id: -1,
        accessToken: ''
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    login: ({commit}, user) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instanceAuth.post('/login', user)
            .then(function (response){
              commit('setStatus', '');
              commit('logUser', response.data);
              resolve(response);
            }).catch(function (error){
              commit('setStatus', 'error');
              reject(error);
            });
      });
    },
    getUserInfos: ({commit}) => {
      instanceAuth.post('/me')
          .then(function (response){
            commit('userInfos', response.data);
          }).catch(function (error){
      });
    }
    //createAccount
  },
  modules: {
  }
})

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
    layoutHeight: "margin-top: 51px;",
    status: '',
    user: user,
    userInfos: {
      id: -1,
      Name: null,
      email: '',
      password: '',
      admin: '',
      iat: '',
      exp: ''
    },
    events: [
      {
        id: 1,
        title: 'The Title',
        start: new Date('2023-08-15T12:00:00.000Z').toJSON(),
        end: new Date('2023-08-15T13:00:00.000Z').toJSON()
        // url: // à préciser pour faire la redirection sur la réservation ?
      },
      {
        id: 2,
        title: 'The Title2',
        start: new Date('2023-08-16T16:00:00.000Z').toJSON(),
        end: new Date('2023-08-16T17:00:00.000Z').toJSON()
        // url: // à préciser pour faire la redirection sur la réservation ?
      }
    ],
    eventsScene: []
  },
  getters: {
    getEvents: state => state.events,
    getSceneEvents: state => state.eventsScene,
    getUserInfos: state => state.userInfos
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
      state.userInfos = {
        id: -1,
        Name: null,
        email: '',
        password: '',
        admin: '',
        iat: '',
        exp: ''
      }
    },
    addEvent: (state, event) => {
      state.events.push(event)
    },
    removeEvent: (state, event) => {
      state.events = state.events.filter(e => e.id != event.event.id)
    },
    updateEvent: (state, event) => {
      console.log(event)
      let indexEvent = state.events.findIndex(e => e.id == event.event.id)
      state.events[indexEvent].end = event.event.end.toJSON()
      state.events[indexEvent].start = event.event.start.toJSON()
    },
    setEventsScene: (state, events) => {
      let object
      events.forEach(event => {
        object = new Object()
        object.title = event.libelle_initiation
        object.id = event.id_initiation
        object.start = new Date(event.date_periode).toJSON()
        object.end = new Date(event.fin_periode).toJSON()
        object.id_prestataire = event.id_prestataire
        object.nb_places = event.nb_places
        state.eventsScene.push(object)
      })
    },
    registerToSceneEvent: (state, event) => {
      console.log(event)
      let date = event.start.getFullYear() + '-08-' + event.start.getDate() + ' ' + event.start.getHours()+ ':' + event.start.getMinutes() + ':00'
      axios.post('http://localhost:3000/demos/' + event.id + '/reservations?nbPlaces=' + event.nbPlaces + '&date=' + decodeURI(date) + '&idPublic=' + event.id_public)
          .then(function (response){
            console.log('registerToSceneEvent', response.data.data);
            return "success"
          }).catch(function (error){
        console.log("registerToSceneEvent error : ",error)
      });
    }
  },
  actions: {
    login: ({commit}, user) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instanceAuth.post('/login', user)
            .then(function (response){
              console.log("data", response.data.data);
              commit('setStatus', '');
              commit('logUser', response.data.data);
              resolve(response);
            }).catch(function (error){
              commit('setStatus', 'error');
              reject(error);
            });
      });
    },
    getUserInfos: ({commit}) => {
      instanceAuth.defaults.headers.common['authorization'] = `Bearer ${instanceAuth.defaults.headers.common['authorization']}`;
      instanceAuth.post('/user',)
          .then(function (response){
            commit('userInfos', response.data);
          }).catch(function (error){
            commit('logout')
            console.log("Token error : ",error)
      });
    },
    createAccount: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instanceAuth.post('/user/create', userInfos)
            .then(function (response){
              commit('setStatus', 'created');
              resolve(response);
            })
            .catch(function (error){
              commit('setStatus', 'error_created');
              reject(error);
            })
      })
    },
    setDemos: ({commit}) => {
      axios.get(`http://localhost:3000/demos`)
          .then(function (response){
            commit('setEventsScene', response.data.data);
          }).catch(function (error){
        console.log("get events scene error : ",error)
      });
    },
  },
  modules: {
  }
})

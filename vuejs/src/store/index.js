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
    layoutHeight: "margin-top: 59px;",
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
    eventsScene: [],
    eventsInitiations: [],
  },
  getters: {
    getInitiationsEvents: state => state.eventsInitiations,
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
    setEvents: (state, events) => {
      let object
      events.data.forEach(event => {
        object = new Object()
        object.title = event.libelle_initiation
        object.id = event.id_initiation
        object.start = new Date(event.date_periode).toJSON()
        object.end = new Date(event.fin_periode).toJSON()
        object.id_prestataire = event.id_prestataire
        object.nb_places = event.nb_places
        if(events.type == 'demos') state.eventsScene.push(object)
        else state.eventsInitiations.push(object)
      })
      console.log(state.eventsInitiations)
    },
    registerToEvent: (state, event) => {
      console.log(event)
      let date = event.start.getFullYear() + '-08-' + event.start.getDate() + ' ' + event.start.getHours()+ ':' + event.start.getMinutes() + ':00'
      axios.post(`http://localhost:3000/${event.type}/` + event.id + '/reservations?nbPlaces=' + event.nbPlaces + '&date=' + decodeURI(date) + '&idPublic=' + event.id_public)
          .then(function (response){
            console.log('registerToEvent', response.data.data);
            return "success"
          }).catch(function (error){
        console.log("registerToEvent error : ",error)
      });
    },
    removeEvent: (state, event) => {
      let demo = state.eventsScene.filter(e => e.id == event.id)
      if(demo[0].id_prestataire == event.id_prestataire){
        let date = event.start.getFullYear() + '-08-' + event.start.getDate() + ' ' + event.start.getHours()+ ':' + event.start.getMinutes() + ':00'
        axios.delete(`http://localhost:3000/${event.type}/` + event.id + '?date=' + decodeURI(date))
            .then(function (response){
              console.log('removeEvent', response.data.data);
              return "success"
            }).catch(function (error){
          console.log("removeEvent error : ",error)
        });
        if(event.type == 'demos')
          state.eventsScene = state.eventsScene.filter(e => e.id != event.id)

      }
    },
    addEvent: (state, event) => {
      console.log(event)
      let dateDebut = event.start.getFullYear() + '-08-' + event.start.getDate() + ' ' + event.start.getHours()+ ':' + event.start.getMinutes() + ':00'
      let dateFin = event.end.getFullYear() + '-08-' + event.end.getDate() + ' ' + event.end.getHours()+ ':' + event.end.getMinutes() + ':00'
      axios.post(`http://localhost:3000/${event.type}?dateDebut=` + decodeURI(dateDebut) + '&dateFin=' + decodeURI(dateFin) + '&nbPlaces=' + event.nbPlaces + '&idPresta=' + event.id_prestataire + '&title=' + event.title)
          .then(function (response){
            console.log('addEvent', response.data.data);
            return "success"
          }).catch(function (error){
        console.log("addEvent error : ",error)
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
            commit('setEvents', {data: response.data.data, type: 'demos'});
          }).catch(function (error){
        console.log("get events scene error : ",error)
      });
    },
    setInitiations: ({commit}, idPresta) => {
      axios.get(`http://localhost:3000/initiations?idPresta=${idPresta}`)
          .then(function (response){
            commit('setEvents', {data: response.data.data, type: 'initiations'});
          }).catch(function (error){
        console.log("get events initiations error : ",error)
      });
    },
  },
  modules: {
  }
})

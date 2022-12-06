<template>
    <div>
      <b-navbar class="fixed-top" :style="backgroundNavbarColor.title + backgroundNavbarColor.body" style="padding: 3px 0 3px 0;" toggleable="lg">
        <b-navbar-brand href="http://localhost:8080/" class="ms-3">
          <img src="https://cdn.discordapp.com/attachments/1019997748344406146/1027862507618058292/logo_3_1.png"
               alt="IUT LOGO" width="45" height="40" class="d-inline-block rounded align-text-top">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav>
            <b-nav-item href="/" ><span class="text-light"><b-icon-geo-alt-fill></b-icon-geo-alt-fill> Map</span></b-nav-item>

            <b-nav-item-dropdown class="nav-item" toggle-class="text-white">
              <template #button-content><b-icon-shop></b-icon-shop> Prestataires</template>
              <b-dropdown-item v-for="(item, jIndex) in data" :key="jIndex"
                               :href="'/categories/'+item.title.toLowerCase().trim().replace(/ /g,'')">
                {{ item.title }}</b-dropdown-item>
              <b-dropdown-item href="/devenirPrestataire">Devenir prestataire</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="nav-item" toggle-class="text-white">
              <template #button-content><b-icon-list-check></b-icon-list-check> Activités</template>
              <b-dropdown-item href="#"> Initiation/Scène</b-dropdown-item>
              <b-dropdown-item href="/courses">Compétitions</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="nav-item" toggle-class="text-white">
              <template #button-content><b-icon-trophy-fill></b-icon-trophy-fill> Résultats</template>
              <b-dropdown-item href="#"> Course à pied</b-dropdown-item>
              <b-dropdown-item href="#">VTT</b-dropdown-item>
              <b-dropdown-item href="#">Natation</b-dropdown-item>
              <b-dropdown-item href="#">Course d'orientation</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item href="/association" toggle-class="text-white">
              <span class="text-light">
              <b-iconstack>
                <b-icon stacked icon="heart-fill" shift-v="-2.5" scale="0.5"></b-icon>
                <b-icon stacked icon="house" scale="1.3"></b-icon>
              </b-iconstack>
              Association
              </span>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ms-auto me-3">
            <b-nav-item @click="changeSession()"><span class="text-light"><b-icon-arrow-left-right></b-icon-arrow-left-right></span></b-nav-item>
            <b-nav-item-dropdown class="nav-item" v-if="!session" toggle-class="text-white" right>
              <template #button-content><b-icon-person-fill></b-icon-person-fill> Profil</template>
              <b-dropdown-form>
                <b-form-group label="Email" label-for="dropdown-form-email">
                  <b-form-input
                      id="dropdown-form-email"
                      size="sm"
                      placeholder="email@example.com"
                      v-model="Email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Password" label-for="dropdown-form-password">
                  <b-form-input
                      id="dropdown-form-password"
                      type="password"
                      size="sm"
                      placeholder="Password"
                      v-model="Password"
                  ></b-form-input>
                </b-form-group>
                <b-button variant="primary" size="sm" @click="login()">
                  <span v-if="status === 'loading'">En cours...</span>
                  <span v-else>Sign in</span>
                </b-button>
              </b-dropdown-form>
              <b-dropdown-item href="/login">Se connecter</b-dropdown-item>
              <b-dropdown-item href="/signup">S'inscrire</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="nav-item" v-else right toggle-class="text-white">
              <template #button-content><b-icon-person-fill></b-icon-person-fill> Bonjour {{user.name}} {{$store.state.user.id}}</template>
              <b-dropdown-item href="#">Planning</b-dropdown-item>
              <b-dropdown-item href="#">Mes activités</b-dropdown-item>
              <b-dropdown-item @click="logout()">Déconnexion</b-dropdown-item>
              <b-dropdown-item href="#">Supprimer le compte</b-dropdown-item>
            </b-nav-item-dropdown>

            <div v-for="(item, index) in allLanguage" :key="index"><b-nav-item v-if="language !== item.title" right>
              <img @click="changeLanguage()" :src="item.flag" width="20px" height="15px">
            </b-nav-item></div>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';
export default {
  name: "mainHomeTest",
  data: () => ({
    language: "French",
    allLanguage: [{"title":"English", "flag":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/langfr-338px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"},
      {"title":"French", "flag":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/langfr-225px-Flag_of_France.svg.png"}],
    session: null,
    backgroundNavbarColor: {"title" : 'background-color :', "body" : '#6ec8cb'},
    data: null,
    session2: null,
    Email: null,
    Password: null
  }),
  computed: {
    ...mapState(['status']),
    ...mapState({user: 'userInfos'})
  },
  methods:{
    login: function (){
      const self = this;
      this.$store.dispatch('login', {
        email: this.Email,
        password: this.Password
      }).then(function (response){
        console.log(response);
        self.session2 = self.$store.state.user.id;
      }, function (error){
        console.log(error);
      })
    },
    logout: function (){
      this.$store.commit('logout');
    },
    changeSession(){
      console.log("Session : "+JSON.stringify(this.session));
      if (this.session) this.session = null
      else this.session = {username: "Max"};
    },
    async connectSession(){
      console.log(this.Email, this.Password);
      await axios.get(`http://localhost:3000/login/${this.Email}/${this.Password}`)
          .then(result => {
            this.session2 = result.data.username;
            console.log(this.session2)
          })
          .catch((err) => {
            let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            console.warn("error", message);
          });
    },
    changeLanguage(){
      console.log("Language : "+this.language);
      if (this.language === this.allLanguage[0].title) this.language = this.allLanguage[1].title
      else this.language = this.allLanguage[0].title
    }
  },
  async created() {
    await axios.get(`http://localhost:3000/categories`)
        .then(result => {
          this.data = result.data.getCategories;
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
    /*await axios.get(`http://localhost:3000/check/login`)
        .then(result => {
          this.session2 = result.data.username;
          console.log(this.session2)
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });*/
  }
}
</script>

<style scoped>
@import '../../../public/css/layouts/layouts.css';
</style>
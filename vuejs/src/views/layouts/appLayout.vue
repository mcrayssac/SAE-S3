<template>
    <div>
      <b-navbar v-if="userInfos.admin === 'organisateur'" class="fixed-top" :style="backgroundNavbarColor.title + backgroundNavbarColor.body" style="padding: 3px 0 3px 0;" toggleable="lg">
        <b-navbar-brand href="http://localhost:8080/" class="ms-3">
          <img src="https://cdn.discordapp.com/attachments/1019997748344406146/1027862507618058292/logo_3_1.png"
               alt="IUT LOGO" width="45" height="40" class="d-inline-block rounded align-text-top">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav>
            <b-nav-item-dropdown class="nav-item" toggle-class="text-white">
              <template #button-content><b-icon-geo-alt-fill></b-icon-geo-alt-fill> Map</template>
              <b-dropdown-item href="#">Modifier stands</b-dropdown-item>
              <b-dropdown-item href="/map/orga">Affectation stands</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="nav-item" toggle-class="text-white">
              <template #button-content><b-icon-shop></b-icon-shop> Prestataires</template>
              <b-dropdown-item href="/demandesPrestataires">Gestion des comptes</b-dropdown-item>
              <b-dropdown-item href="#">Validation des activités</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="nav-item" toggle-class="text-white">
              <template #button-content><b-icon-graph-up></b-icon-graph-up> Statistiques</template>
              <b-dropdown-item href="#"> Graphiques</b-dropdown-item>
              <b-dropdown-item href="#"> Gestion</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item href="/" ><span class="text-light"><b-icon-trophy-fill></b-icon-trophy-fill> Courses</span></b-nav-item>

            <b-nav-item href="/" ><span class="text-light"><b-icon-megaphone></b-icon-megaphone> Scène</span></b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ms-auto me-3">
            <b-nav-item-dropdown v-if="!userInfos.name && (user.id <= 0)" toggle-class="text-white" right>
              <template #button-content><b-icon-person-fill></b-icon-person-fill> Profil</template>
              <b-dropdown-form>
                <b-form-group class="ConnectLabel" label="Email">
                  <b-form-input placeholder="email@example.com" v-model="Email"></b-form-input>
                </b-form-group>
                <b-form-group class="ConnectLabel mt-2" label="Password">
                  <b-form-input type="password" placeholder="Password" v-model="Password"></b-form-input>
                </b-form-group>
                <b-row align-h="center">
                  <b-col class="mt-2" cols="auto">
                    <b-button class="button" @click="login()">
                      <span v-if="status === 'loading'">
                        <b-icon icon="arrow-repeat" animation="spin"></b-icon> En cours
                      </span>
                      <span v-else>Se connecter</span>
                    </b-button>
                  </b-col>
                </b-row>
              </b-dropdown-form>

              <b-dropdown-item href="/signup">Créer un compte ici</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="nav-item" v-else right toggle-class="text-white">
              <template #button-content><span style="color: #fffb00"><b-icon-person-fill></b-icon-person-fill>Organisateur</span></template>
              <b-dropdown-item @click="logout()">Déconnexion</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item disabled right>
              <img :src="flag" width="20px" height="15px">
            </b-nav-item>

            <b-nav-item href="/association" class="removePadding">
              <b-img height="30" width="auto" src="https://upload.wikimedia.org/wikipedia/fr/thumb/1/16/Logo_APF_France_Handicap_2018.svg/langfr-195px-Logo_APF_France_Handicap_2018.svg.png"></b-img>
            </b-nav-item>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-navbar v-else-if="userInfos.admin === 'prestataire'" class="fixed-top" :style="backgroundNavbarColor.title + backgroundNavbarColor.body" style="padding: 3px 0 3px 0;" toggleable="lg">
        <b-navbar-brand v-if="userInfos.etat !== null && userInfos.etat !== undefined && userInfos.etat === false" href="http://localhost:8080/" class="ms-3" disabled>
          <img src="https://cdn.discordapp.com/attachments/1019997748344406146/1027862507618058292/logo_3_1.png"
               alt="IUT LOGO" width="45" height="40" class="d-inline-block rounded align-text-top">
        </b-navbar-brand>

        <b-navbar-brand v-else href="http://localhost:8080/" class="ms-3">
          <img src="https://cdn.discordapp.com/attachments/1019997748344406146/1027862507618058292/logo_3_1.png"
               alt="IUT LOGO" width="45" height="40" class="d-inline-block rounded align-text-top">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav v-if="userInfos.etat !== null && userInfos.etat !== undefined && userInfos.etat === false">
            <b-nav-item href="/map" disabled><span class="text-light"><b-icon-geo-alt-fill></b-icon-geo-alt-fill> Map</span></b-nav-item>

            <b-nav-item href="/statistiques" disabled><span class="text-light"><b-icon-graph-up></b-icon-graph-up> Statistiques</span></b-nav-item>

            <b-nav-item href="#" disabled><span class="text-light"><b-icon-list-ul></b-icon-list-ul> Initiations</span></b-nav-item>

            <b-nav-item href="/scene" disabled><span class="text-light"><b-icon-journal-check></b-icon-journal-check> Scène</span></b-nav-item>

            <b-nav-item :href="'/prestataires/'+userInfos.name.toLowerCase().trim().replace(/ /g,'')"><span class="text-light"><b-icon-person-lines-fill></b-icon-person-lines-fill> Ma Page</span></b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav v-else>
            <b-nav-item href="/map" ><span class="text-light"><b-icon-geo-alt-fill></b-icon-geo-alt-fill> Map</span></b-nav-item>

            <b-nav-item href="/statistiques" ><span class="text-light"><b-icon-graph-up></b-icon-graph-up> Statistiques</span></b-nav-item>

            <b-nav-item href="#" ><span class="text-light"><b-icon-list-ul></b-icon-list-ul> Initiations</span></b-nav-item>

            <b-nav-item href="/scene" ><span class="text-light"><b-icon-journal-check></b-icon-journal-check> Scène</span></b-nav-item>

            <b-nav-item :href="'/prestataires/'+userInfos.name.toLowerCase().trim().replace(/ /g,'')"><span class="text-light"><b-icon-person-lines-fill></b-icon-person-lines-fill> Ma Page</span></b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ms-auto me-3">
            <b-nav-item-dropdown v-if="!userInfos.name && (user.id <= 0)" toggle-class="text-white" right>
              <template #button-content><b-icon-person-fill></b-icon-person-fill> Profil</template>
              <b-dropdown-form>
                <b-form-group class="ConnectLabel" label="Email">
                  <b-form-input placeholder="email@example.com" v-model="Email"></b-form-input>
                </b-form-group>
                <b-form-group class="ConnectLabel mt-2" label="Password">
                  <b-form-input type="password" placeholder="Password" v-model="Password"></b-form-input>
                </b-form-group>
                <b-row align-h="center">
                  <b-col class="mt-2" cols="auto">
                    <b-button class="button" @click="login()">
                      <span v-if="status === 'loading'">
                        <b-icon icon="arrow-repeat" animation="spin"></b-icon> En cours
                      </span>
                      <span v-else>Se connecter</span>
                    </b-button>
                  </b-col>
                </b-row>
              </b-dropdown-form>

              <b-dropdown-item href="/signup">Créer un compte ici</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="nav-item" v-else right toggle-class="text-white">
              <template #button-content><b-icon-person-fill></b-icon-person-fill> {{userInfos.name}}</template>
              <b-dropdown-item @click="logout()">Déconnexion</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item disabled right>
              <img :src="flag" width="20px" height="15px">
            </b-nav-item>

            <b-nav-item href="/association" class="removePadding">
              <b-img height="30" width="auto" src="https://upload.wikimedia.org/wikipedia/fr/thumb/1/16/Logo_APF_France_Handicap_2018.svg/langfr-195px-Logo_APF_France_Handicap_2018.svg.png"></b-img>
            </b-nav-item>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-navbar v-else class="fixed-top" :style="backgroundNavbarColor.title + backgroundNavbarColor.body" style="padding: 3px 0 3px 0;" toggleable="lg">
        <b-navbar-brand href="http://localhost:8080/" class="ms-3">
          <img src="https://cdn.discordapp.com/attachments/1019997748344406146/1027862507618058292/logo_3_1.png"
               alt="IUT LOGO" width="45" height="40" class="d-inline-block rounded align-text-top">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav>
            <b-nav-item href="/map" ><div class="text-light"><b-icon-geo-alt-fill></b-icon-geo-alt-fill> Map</div></b-nav-item>

            <b-nav-item-dropdown class="nav-item" toggle-class="text-white">
              <template #button-content><b-icon-shop></b-icon-shop> Prestataires</template>
              <b-dropdown-item v-for="(item, jIndex) in data" :key="jIndex"
                               :href="'/categories/'+item.title.trim().replace(/ /g,'')">
                {{ item.title }}</b-dropdown-item>
              <b-dropdown-item href="/devenirPrestataire">Devenir prestataire</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="nav-item" toggle-class="text-white">
              <template #button-content><b-icon-list-check></b-icon-list-check> Activités</template>
              <b-dropdown-item href="/scene"> Scène</b-dropdown-item>
              <b-dropdown-item href="/courses">Compétitions</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="nav-item" toggle-class="text-white">
              <template #button-content><b-icon-trophy-fill></b-icon-trophy-fill> Résultats</template>
              <b-dropdown-item href="/resultats/courseapied">Course à pied</b-dropdown-item>
              <b-dropdown-item href="/resultats/vtt">VTT</b-dropdown-item>
              <b-dropdown-item href="/resultats/natation">Natation</b-dropdown-item>
              <b-dropdown-item href="/resultats/petitecourseapied">Petite course à pied</b-dropdown-item>
              <b-dropdown-item href="/resultats/moyennecourseapied">Moyenne course à pied</b-dropdown-item>
              <b-dropdown-item href="/resultats/grandecourseapied">Grande course à pied</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="ms-auto me-3">
            <b-nav-item-dropdown v-if="!userInfos.name && (user.id <= 0)" toggle-class="text-white" right>
              <template #button-content><b-icon-person-fill></b-icon-person-fill> Profil</template>
              <b-dropdown-form>
                <b-form-group class="ConnectLabel" label="Email">
                  <b-form-input placeholder="email@example.com" v-model="Email"></b-form-input>
                </b-form-group>
                <b-form-group class="ConnectLabel mt-2" label="Password">
                  <b-form-input type="password" placeholder="Password" v-model="Password"></b-form-input>
                </b-form-group>
                <b-row align-h="center">
                  <b-col class="mt-2" cols="auto">
                    <b-button class="button" @click="login()">
                      <span v-if="status === 'loading'">
                        <b-icon icon="arrow-repeat" animation="spin"></b-icon> En cours
                      </span>
                      <span v-else>Se connecter</span>
                    </b-button>
                  </b-col>
                </b-row>
              </b-dropdown-form>

              <b-dropdown-item href="/signup">Créer un compte ici</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown class="nav-item" v-else right toggle-class="text-white">
              <template #button-content><b-icon-person-fill></b-icon-person-fill> Bonjour {{ userInfos.name }}</template>
              <b-dropdown-item href="#">Planning</b-dropdown-item>
              <b-dropdown-item href="#">Mes activités</b-dropdown-item>
              <b-dropdown-item @click="logout()">Déconnexion</b-dropdown-item>
              <b-dropdown-item @click="showLoginErrorModal('login-after-error-modal')">Supprimer le compte</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item disabled right>
              <img :src="flag" width="20px" height="15px">
            </b-nav-item>

            <b-nav-item href="/association" class="removePadding">
              <b-img height="30" width="auto" src="https://upload.wikimedia.org/wikipedia/fr/thumb/1/16/Logo_APF_France_Handicap_2018.svg/langfr-195px-Logo_APF_France_Handicap_2018.svg.png"></b-img>
            </b-nav-item>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-modal body-text-variant="danger" ref="login-error-modal" title="Lakeside Sports Festival" hide-header-close>
        <b-col class="my-3">
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: x-large; font-family: 'Montserrat', sans-serif;">Email ou mot de passe erroné !</span>
            </b-col>
          </b-row>
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: large; font-family: 'Montserrat', sans-serif;">Veuillez réessayer</span>
            </b-col>
          </b-row>
        </b-col>
        <template #modal-footer >
          <b-row class="mx-auto" align-h="center">
            <b-col cols="auto">
              <b-button class="button" @click="hideLoginErrorModal('login-error-modal')">Close</b-button>
            </b-col>
          </b-row>
        </template>
      </b-modal>

      <b-modal body-text-variant="danger" ref="login-after-error-modal" title="Lakeside Sports Festival" hide-header-close>
        <b-col class="my-3">
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: large; font-family: 'Montserrat', sans-serif;">Vous aller supprimer votre compte</span>
            </b-col>
          </b-row>
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: small; font-family: 'Montserrat', sans-serif;">Voulez-vous supprimer définitivement votre compte ?</span>
            </b-col>
          </b-row>
        </b-col>
        <template #modal-footer >
          <b-row class="mx-auto" align-h="center">
            <b-col cols="auto">
              <b-button class="button" @click="deleteAccount()">Oui</b-button>
              <b-button class="button" @click="hideLoginErrorModal('login-after-error-modal')">Non</b-button>
            </b-col>
          </b-row>
        </template>
      </b-modal>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';
export default {
  name: "mainHomeTest",
  data: () => ({
    language: "French",
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/165px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png',
    allLanguage: [{"title":"English", "flag":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/langfr-338px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"}],
    backgroundNavbarColor: {"title" : 'background-color :', "body" : '#6ec8cb'},
    data: null,
    Email: null,
    Password: null
  }),
  computed: {
    ...mapState(['status', "user", "userInfos"]),
  },
  methods:{
    login: function (){
      let self = this;
      this.$store.dispatch('login', {
        email: this.Email,
        password: this.Password
      }).then(async function (response){
        await self.getUserInfos();
        setTimeout(() => {
          if (!self.userInfos.admin || self.userInfos.admin === "organisateur"){
            self.$router.push({name: 'home'});
          } else if (self.userInfos.admin === "prestataire"){
            // Redirection page presta
            self.$router.push({name: 'prestataires/nomPrestataire', params: { nomPrestataire: self.userInfos.name.toLowerCase().trim().replace(/ /g,'') }});
            // self.$router.push({name: 'etatInscription'});
          }
        }, "1000");
      }, function (error){
        self.showLoginErrorModal('login-error-modal');
      })
    },
    logout: function (){
      this.$store.commit('logout');
      this.$router.push({name: 'home'});
    },
    getUserInfos: async function (){
      await this.$store.dispatch('getUserInfos')
          .then(function (response){
            /*Token valide
            console.log("Token valide : ",response);*/
          }, function (error){
            /* Token invalide
            console.log("Token invalide : ",error);*/
          });
    },
    showLoginErrorModal(modal) {
      this.$refs[modal].show()
    },
    hideLoginErrorModal(modal) {
      this.$refs[modal].hide()
    },
    async deleteAccount() {
      let id = this.user.id;
      let self = this;
      await axios.delete(`http://localhost:3000/api/user/delete/${id}`)
          .then(result => {
            self.logout();
            self.$router.push({name: 'home'});
          })
          .catch((err) => {
            let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            console.warn("error", message);
          });
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
    await this.getUserInfos();
  }
}
</script>

<style scoped>
@import '../../../public/css/layouts/layouts.css';
</style>
<template>
    <div>
      <b-navbar class="fixed-top" :style="backgroundNavbarColor.title + backgroundNavbarColor.body" style="padding: 3px 0 3px 0;" toggleable="lg" type="dark">
        <b-navbar-brand href="http://localhost:8080/" class="ms-3">
          <img src="https://cdn.discordapp.com/attachments/1019997748344406146/1027862507618058292/logo_3_1.png"
               alt="IUT LOGO" width="45" height="40" class="d-inline-block rounded align-text-top">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse class="white" id="nav-collapse" is-nav>

          <b-navbar-nav>
            <b-nav-item href="/"><b-icon-geo-alt-fill></b-icon-geo-alt-fill> Map</b-nav-item>

            <b-nav-item-dropdown>
              <template #button-content><b-icon-shop></b-icon-shop> Prestataires</template>
              <b-dropdown-item href="/restaurants"> Restaurant</b-dropdown-item>
              <b-dropdown-item href="/clubs">Club</b-dropdown-item>
              <b-dropdown-item href="#">Vente</b-dropdown-item>
              <b-dropdown-item href="#">Devenir prestataire</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown>
              <template #button-content><b-icon-list-check></b-icon-list-check> Activités</template>
              <b-dropdown-item href="#"> Initiation/Scène</b-dropdown-item>
              <b-dropdown-item href="/courses">Compétitions</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown>
              <template #button-content><b-icon-trophy-fill></b-icon-trophy-fill> Résultats</template>
              <b-dropdown-item href="#"> Course à pied</b-dropdown-item>
              <b-dropdown-item href="#">VTT</b-dropdown-item>
              <b-dropdown-item href="#">Natation</b-dropdown-item>
              <b-dropdown-item href="#">Course d'orientation</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item href="/association">
              <b-iconstack>
                <b-icon stacked icon="heart-fill" shift-v="-2.5" scale="0.5"></b-icon>
                <b-icon stacked icon="house" scale="1.3"></b-icon>
              </b-iconstack>
              Association
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ms-auto me-3">
            <b-nav-item @click="changeSession()"><b-icon-arrow-left-right></b-icon-arrow-left-right></b-nav-item>
            <b-nav-item-dropdown v-if="session" right>
              <template #button-content><b-icon-person-fill></b-icon-person-fill> Bonjour {{session.username}}</template>
              <b-dropdown-item href="#">Planning</b-dropdown-item>
              <b-dropdown-item href="#">Mes activités</b-dropdown-item>
              <b-dropdown-item href="/logout">Déconnexion</b-dropdown-item>
              <b-dropdown-item href="#">Supprimer le compte</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown v-else right>
              <template #button-content><b-icon-person-fill></b-icon-person-fill> Profil</template>
              <b-dropdown-item href="/login">Se connecter</b-dropdown-item>
              <b-dropdown-item href="/signup">S'inscrire</b-dropdown-item>
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
export default {
  name: "mainHomeTest",
  data: () => ({
    language: "French",
    allLanguage: [{"title":"English", "flag":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/langfr-338px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"},
      {"title":"French", "flag":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/langfr-225px-Flag_of_France.svg.png"}],
    session: {"username": "Max"},
    backgroundNavbarColor: {"title" : 'background-color :', "body" : '#6ec8cb'}
  }),
  methods:{
    changeSession(){
      console.log("Session : "+this.session);
      if (this.session) this.session = null
      else this.session = {"username": "Max"}
    },
    changeLanguage(){
      console.log("Language : "+this.language);
      if (this.language === this.allLanguage[0].title) this.language = this.allLanguage[1].title
      else this.language = this.allLanguage[0].title
    }
  }
}
</script>

<style scoped>
.rounded {
  animation: 8s infinite alternate rotate;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
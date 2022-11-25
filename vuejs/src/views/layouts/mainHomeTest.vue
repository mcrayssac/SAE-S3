<template>
    <div>
      <b-navbar :style="backgroundNavbarColor.title + backgroundNavbarColor.body" toggleable="lg" type="dark">
        <b-navbar-brand href="http://localhost:8080/">
          <img src="https://cdn.discordapp.com/attachments/1019997748344406146/1027862507618058292/logo_3_1.png"
               alt="IUT LOGO" width="55" height="50" class="d-inline-block align-text-top">
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

          <b-navbar-nav class="ms-auto">
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

            <b-nav-item v-for="(item, index) in allLanguage" :key="index" right>{{item.title}} {{item.flag}}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <button @click="changeSession()">Change session</button>
    </div>
</template>

<script>
export default {
  name: "mainHomeTest",
  data: () => ({
    language: "English",
    allLanguage: [{"title":"English", "flag":""},{"title":"French", "flag":""}],
    session: {"username": "Max"},
    backgroundNavbarColor: {"title" : 'background-color :', "body" : '#6ec8cb'}
  }),
  methods:{
    changeSession(){
      console.log("Session : "+this.session);
      if (this.session) this.session = null
      else this.session = {"username": "Max"}
    }
  }
}
</script>

<style scoped>

</style>
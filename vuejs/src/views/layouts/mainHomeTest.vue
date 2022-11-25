<template>
    <div>
      <b-navbar :style="backgroundNavbarColor.title + backgroundNavbarColor.body" toggleable="lg" type="dark">
        <b-navbar-brand href="http://localhost:8080/">
          <img src="https://cdn.discordapp.com/attachments/1019997748344406146/1027862507618058292/logo_3_1.png"
               alt="IUT LOGO" width="55" height="50" class="d-inline-block align-text-top">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse class="white" id="nav-collapse" is-nav>

          <b-navbar-nav left>
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
              <b-dropdown-item href="#">Vente</b-dropdown-item>
              <b-dropdown-item href="#">Devenir prestataire</b-dropdown-item>
            </b-nav-item-dropdown>
            <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
               data-toggle="dropdown"><i class="bi bi-trophy-fill"></i> Résultats</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Course à pied</a>
              <a class="dropdown-item" href="#">VTT</a>
              <a class="dropdown-item" href="#">Natation</a>
              <a class="dropdown-item" href="#">Course d'orientation</a>

          </b-navbar-nav>

          <b-navbar-nav right>

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
export default {
  name: "mainHomeTest",
  data: () => ({
    backgroundNavbarColor: {"title" : 'background-color :', "body" : '#6ec8cb'}
  }),
  methods:{

  }
}
</script>

<style scoped>

</style>
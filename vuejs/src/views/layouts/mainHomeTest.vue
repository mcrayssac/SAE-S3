<template>
  <b-navbar :style="backgroundNavbarColor.title + backgroundNavbarColor.body" toggleable>
    <b-navbar-brand href="http://localhost:8080/">
      <img src="https://cdn.discordapp.com/attachments/1019997748344406146/1027862507618058292/logo_3_1.png"
           alt="IUT LOGO" width="55" height="50" class="d-inline-block align-text-top">
    </b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">Link 1</b-nav-item>
        <b-nav-item href="#">Link 2</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
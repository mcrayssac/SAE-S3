<template>
  <b-container :style="layoutHeight" fluid>
    <b-row class="main-row my-5" align-v="center" align-h="center">
      <b-col class="text-center" cols="12" md="6">
        <b-img class="rounded-circle my-5 way-image" src="https://cdn.discordapp.com/attachments/711867110221152278/1066311833641816104/pngtree-wooden-signage-direction-sign-attractions-sign-cartoon-illustration-png-image_408083.png"></b-img>
      </b-col>
      <b-col class="text-center order-md-last order-first" cols="12" md="6">
        <b-row class="my-5 mx-5 mx-md-0" align-v="center" align-h="start">
          <b-col class="text-start" cols="12">
            <span class="text-title mt-5 mb-0">Oups !</span>
          </b-col>
        </b-row>
        <b-row class="my-5 mx-5 mx-md-0" align-v="center" align-h="center">
          <b-col class="text-start" cols="12">
            <span class="text-text mb-5">La page que vous recherchez n'existe pas.</span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>


  </b-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "error404",
  computed:{
    ...mapState(['layoutHeight'])
  }
}
</script>

<style scoped>
@import '../../public/css/error/error.css';
</style>
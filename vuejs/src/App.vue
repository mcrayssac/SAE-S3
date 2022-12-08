<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lakeside Sports Festival</title>
  <meta name="description" content="Festival des sports">
  <meta name="author" content="SAE-S3">
  <link rel="icon" href="https://cdn.discordapp.com/attachments/1019997748344406146/1027862895041720360/logo_3_2.png">
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
</head>
<template>
  <div>
    <app-layout></app-layout>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appLayout from "@/views/layouts/appLayout.vue";
import appFooter from "@/views/footer/appFooter.vue";
export default {
  name: "app",
  components: {
    'app-layout':appLayout,
    'app-footer':appFooter
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Nunito&family=Work+Sans&display=swap');
body, a ,p{
  font-family: 'Work Sans', sans-serif;
  letter-spacing:1px;
  color: #495388;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
  letter-spacing:1px;
  color: #495388;
}

.Montserrat{
  font-family: 'Montserrat', sans-serif;
}

.Nunito{
  font-family: 'Nunito', sans-serif;
}

.ligne{
  margin: 0 100px 0;
  border: 2px #495388 ;
  border-style: none none solid none;
}
</style>
<style lang="scss">
@import '../public/scss/colors/customColor.scss';
</style>

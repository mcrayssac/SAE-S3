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

::-webkit-scrollbar-track {
  background-color: white;
  color: white;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background-color: #6ec8cb;
}

body, a ,p{
  font-family: 'Work Sans', sans-serif;
  letter-spacing:1px;
  color: #495388;
}

h1, h2, h3, h4, h5, h6 {
  text-align:center;
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

<template>
  <div>
    <app-layout></app-layout>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import layout from "@/views/layouts/mainHomeTest.vue";
import footer from "@/views/footer/footer.vue";
export default {
  name: "app",
  components: {
    'app-layout':layout,
    'app-footer':footer
  }
}
</script>

<style>
body{
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  letter-spacing:1px;
  color: #495388;
  position: relative;
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  letter-spacing:1px;
  color: #495388;
}

.ligne{
  border: 2px #495388 ;
  border-style: none none solid none;
}
</style>

<template>
  <vueper-slides fade ref="myVueperSlides2"
                 style="background-size:100% auto; background-position: center; background-repeat: no-repeat;"
                 :autoplay="true"
                 :parallax="1"
                 :parallax-fixed-content="true"
                 :arrows="false"
                 :bullets="false"
                 :duration="5000"
                 :pauseOnHover="false"
                 :touchable="false"
                 :fixed-height="true"
  >
    <vueper-slide v-for="(item, index) in slide" :key="index" :image="item"
                  title="L'HISTOIRE D'APF FRANCE"/>
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: "assosSlide",
  components:{ VueperSlides, VueperSlide},
  props: {
    slide: Array,
  }
}
</script>

<style scoped>
  @import '../../../public/css/home/homeSlideMain/homeSlideMain.css';
</style>

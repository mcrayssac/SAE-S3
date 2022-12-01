<template>
  <vueper-slides fade ref="myVueperSlides2"
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
                  title="LAKESIDE SPORTS FESTIVAL"
                  content="15.08.2022 AU 16.08.2022" />
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: "homeSlideMain",
  components:{ VueperSlides, VueperSlide},
  props: {
    slide: Array,
  }
}
</script>

<style scoped>
@import '../../../../public/css/home/homeSlideMain/homeSlideMain.css';
</style>
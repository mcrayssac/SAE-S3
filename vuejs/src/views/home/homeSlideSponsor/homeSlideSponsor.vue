<template>
  <b-row align-h="center">
    <b-col cols="12" style="padding-top: 30px"><vueper-slides slide-image-inside ref="myVueperSlides"
                                                              autoplay
                                                              :arrows="false"
                                                              :bullets="false"
                                                              :visible-slides="5"
                                                              :dragging-distance="200"
                                                              duration="2000"
                                                              :pauseOnHover="true"
                                                              fixedHeight="150px">
      <vueper-slide v-for="(item, index) of slideSponsor" :link="item.src" :key="index" :image="item.photo"/>
    </vueper-slides></b-col>
  </b-row>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: "homeSlideSponsor",
  components:{ VueperSlides, VueperSlide},
  props: {
    slideSponsor: Array
  }
}
</script>

<style scoped>
@import '../../../../public/css/home/homeSlideSponsor/homeSlideSponsor.css';
</style>
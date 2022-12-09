<template>
  <b-col cols="auto">
    <vue-ellipse-progress
        :size="200"
        color="#6ec8cb"
        dot="12 #495388"
        animation="default 6700 500"
        :progress="pourcentage"
        :angle="-90"
        :gap="10"
        fontColor="#495388"
        fontSize="3rem">
      <template v-slot:legend-value>
        <span style="color: #495388 ; font-size: 2rem;" slot="legend-value">%</span>
      </template>
    </vue-ellipse-progress>
  </b-col>
</template>

<script>
export default {
  name: "homeCircularProgress",
  props: {
    pourcentage: Number
  }
}
</script>

<style scoped>

</style>
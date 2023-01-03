<template>
  <b-container fluid :style="layoutHeight">
    <h1>Courses</h1>
  </b-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "courses",
  computed:{
    ...mapState(['layoutHeight'])
  },
}
</script>

<style scoped>

</style>
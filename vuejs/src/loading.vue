<template>
  <b-row align-h="center" align-v="center" style="height: 500px;">
    <b-col cols="auto">
      <div class="lds-ellipsis"><div :style="'background-color: ' + color"></div><div :style="'background-color: ' + color"></div><div :style="'background-color: ' + color"></div><div :style="'background-color: ' + color"></div></div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "loading",
  props: {
    color: String
  }
}
</script>

<style scoped>
@import '../public/css/loading/loading.css';
</style>
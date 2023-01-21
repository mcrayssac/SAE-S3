<template>
  <main id="app" :style="layoutHeight">
    <b-row align-h="center">
      <b-col cols="auto"><h3>Palettes de couleurs</h3></b-col>
    </b-row>
    <div class="row" style="border: 2px solid #1a265a; border-style: solid solid none solid;">
      <div class="col text-center" style="background-color: #495388; height: 100px; width: 100px;"></div>
      <div class="col text-center" style="background-color: #ffffff"></div>
      <div class="col text-center" style="background-color: #6ec8cb"></div>
      <div class="col text-center" style="background-color: #d9231a"></div>
      <div class="col text-center" style="background-color: #021331"></div>
    </div>

    <div class="row" style="border: 2px solid #1a265a;">
      <div class="col text-center">
        <a>#495388</a>
      </div>
      <div class="col text-center">
        <a>#ffffff</a>
      </div>
      <div class="col text-center">
        <a>#6ec8cb</a>
      </div>
      <div class="col text-center">
        <a>#d9231a</a>
      </div>
      <div class="col text-center">
        <a>#021331</a>
      </div>
    </div>
    <br><br>
    <br><br>


  </main>
</template>


<script>
import _ from 'lodash';
import axios from "axios";
import {mapState} from "vuex";
export default {
  name: "test",
  data(){
    return{
      data: null,
      filrs: null,
    }
  },
  computed:{
    ...mapState(['layoutHeight']),
    filterCards() {
      let vm = this, lists = vm.data.getCards
      return _.filter(lists, function (query) {
        let temp;
        let res = true;
        if (vm.filrs[vm.filrs.length - 1] == ""){
          for (let i = 0; i < vm.filrs.length; i++) {
            temp = vm.filrs[i] ? (query.filtres.body[i] == vm.filrs[i]) : true;
            res = res && temp;
          }
        } else res = vm.filrs[vm.filrs.length - 1] ? (query.title.toLowerCase().match(vm.filrs[vm.filrs.length - 1].toLowerCase())) : true;
        return res;
      })
    }
  },
  mounted(){

  },
  methods:{

  },
  async created() {
    await axios.get(`http://localhost:3000/categories/restaurants/test`)
        .then(result => {
          this.data = result.data
          this.filrs = []
          for (let i = 0; i < this.data.getFiltres.length + 1; i++) {
            this.filrs.push("");
          }
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
  },
  destroyed() {

  }
}
</script>

<style scoped>

</style>
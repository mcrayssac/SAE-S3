<template>
  <main id="app" :style="$store.state.layoutHeight">
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

    <b-row align-h="center" align-v="center">
      <b-col cols="auto">
        <b-form inline>
          <b-form-input placeholder="Rechercher" v-model="filrs[filrs.length - 1]"></b-form-input>
        </b-form>
      </b-col>
      <b-col cols="auto" v-for="(items, index) in data.getFiltres" :key="index">
        <b-form-select v-model="filrs[index]" size="lg">
          <template #first>
            <b-form-select-option :value="''" disabled>{{items[0]}}</b-form-select-option>
          </template>
          <b-form-select-option :value="''">Tous[{{items[1].length}}]</b-form-select-option>
          <b-form-select-option v-for="(item, jndex) in items[1]" :key="jndex" :value="item">{{item}}</b-form-select-option>
        </b-form-select>
      </b-col>
    </b-row>

    <ul><li v-for="(list, index) in filterCards" :key="index">{{list.title}}</li></ul>

    {{filrs}}
  </main>
</template>


<script>
import _ from 'lodash';
import axios from "axios";
export default {
  name: "test",
  data(){
    return{
      data: null,
      filrs: null,
    }
  },
  computed:{
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
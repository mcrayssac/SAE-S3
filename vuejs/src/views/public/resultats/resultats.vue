<template>
  <b-container :style="layoutHeight" fluid>
    <section class="Alert">
      <b-alert :variant="alertVariant" :show="alertCountDown" @dismissed="alertCountDown=0"
               @dismiss-count-down="countDownChanged"
               data-aos="fade-down"
               data-aos-anchor-placement="top-bottom"
               data-aos-duration="800">
        <h4 :class="'text-'+alertVariant+' mt-3 mb-4'"
            data-aos="fade-down"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
            data-aos-duration="800">{{ alertMessage }}</h4>
        <b-progress :variant="alertVariant" :max="alertMax" :value="alertCountDown" height="4px"
                    data-aos="zoom-in"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-delay="100"
                    data-aos-duration="800"></b-progress>
      </b-alert>
    </section>

    <section v-if="data !== null" class="Body">
      <section class="Title">
        <b-row v-if="userInfos.admin == 'organisateur'" align-h="center" align-v="center">
          <b-col class="my-5" cols="9">
            <h1 class="my-5" data-aos="fade-up-right"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="800">Résultats pour {{name}}</h1>
          </b-col>
          <b-col class="my-5" cols="3">
            <b-button class="mx-2 button-decline"
                      data-aos="flip-right" variant="outline-secondary"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="400" @click="$refs['modal-add-classement'].show()"
                      data-aos-duration="400">Ajouter</b-button>
          </b-col>
        </b-row>
        <b-row v-else align-h="center" align-v="center">
          <b-col class="my-5" cols="auto">
            <h1 class="my-5" data-aos="fade-up-right"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="800">Résultats pour {{name}}</h1>
          </b-col>
        </b-row>
      </section>

      <section v-if="data !== false" class="mt-5 Main-resultats" style="min-height: 300px;">
        <b-row align-h="center" align-v="center">
          <b-col cols="auto" lg="10">
            <b-table-simple bordered hover data-aos="flip-left"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-duration="800">
              <b-thead style="background-color: #495388; color: white">
                <b-tr>
                  <b-th v-for="(item, index) in Object.keys(data.data.data[0])" :key="index"
                        data-aos="fade-left"
                        data-aos-anchor-placement="top-bottom"
                        :data-aos-delay="delay+=300"
                        data-aos-duration="500">{{item}}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody  style="color: white">
                <b-tr v-if="first !== null" style="background-color: #ffba00"
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      :data-aos-delay="delayFirst+900"
                      data-aos-duration="500">
                  <b-th class="text-center">{{ first.Classement }}</b-th>
                  <b-th class="text-center">{{ first.Prénom }}</b-th>
                  <b-th class="text-center">{{ first.Nom }}</b-th>
                  <b-th class="text-center">{{ first["Nombre de place"] }}</b-th>
                  <b-th class="text-center">{{ first["Nombre de km"] }}</b-th>
                </b-tr>
                <b-tr v-if="second !== null" style="background-color: #c9c8c8"
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      :data-aos-delay="delayFirst+600"
                      data-aos-duration="500">
                  <b-th class="text-center">{{ second.Classement }}</b-th>
                  <b-th class="text-center">{{ second.Prénom }}</b-th>
                  <b-th class="text-center">{{ second.Nom }}</b-th>
                  <b-th class="text-center">{{ second["Nombre de place"] }}</b-th>
                  <b-th class="text-center">{{ second["Nombre de km"] }}</b-th>
                </b-tr>
                <b-tr v-if="third !== null" style="background-color: #bd985b"
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      :data-aos-delay="delayFirst+300"
                      data-aos-duration="500">
                  <b-th class="text-center">{{ third.Classement }}</b-th>
                  <b-th class="text-center">{{ third.Prénom }}</b-th>
                  <b-th class="text-center">{{ third.Nom }}</b-th>
                  <b-th class="text-center">{{ third["Nombre de place"] }}</b-th>
                  <b-th class="text-center">{{ third["Nombre de km"] }}</b-th>
                </b-tr>
                <b-tr style="background-color: #6ec8cb" v-for="(item, index) in data.data.data" :key="index"
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="500">
                  <b-th v-for="(item2, Jindex) in Object.values(item)" :key="Jindex" class="text-center">{{item2}}</b-th>
                </b-tr>
              </b-tbody>
              <b-tfoot style="background-color: #495388; color: white">
                <b-tr>
                  <b-td v-if="rows !== null" :colspan="Object.keys(data.data.data[0]).length" class="text-right"
                        data-aos="fade-left"
                        data-aos-anchor-placement="top-bottom"
                        :data-aos-delay="delay+=300"
                        data-aos-duration="500">
                    Nombre de participants: <b>{{ rows }}</b>
                  </b-td>
                </b-tr>
              </b-tfoot>
            </b-table-simple>
          </b-col>
        </b-row>
      </section>
      <section v-else class="mt-5 Main-none" style="min-height: 300px;">
        <h6 data-aos="flip-left"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="800">Aucun résultat disponible pour le moment</h6>
      </section>

      <b-modal ref="modal-add-classement" hide-footer hide-backdrop hide-header-close no-fade no-stacking centered id="modal-presta"
               title="Ajouter un classement">
        <b-form>
          <b-form-group class="mx-5 my-3" label="Participant : " label-class="label"
                        data-aos="fade-left"
                        data-aos-anchor-placement="top-bottom"
                        data-aos-duration="800">
            <b-form-select v-model="currentParticipant.id_public" required>
              <b-form-select-option v-for="(participant, index) in participants" :key="index" :value="participant.id_public"> {{participant.prenom_public}} {{participant.nom_public}} </b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group class="mx-5 my-3" label="Position : " label-class="label"
                        data-aos="fade-left"
                        data-aos-anchor-placement="top-bottom"
                        data-aos-duration="800">
            <b-form-input v-model="currentParticipant.position" type="number" min="1" :max='nbPlaces' required></b-form-input>
          </b-form-group>

        </b-form>

        <b-row class="m-5" align-h="center" align-v="center">
          <b-col cols="auto">
            <b-button class="mx-2 button-submit" @click="addClassement"
                      data-aos="flip-left" variant="outline-success"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="400">Ajouter</b-button>
            <b-button class="mx-2 button-decline"
                      data-aos="flip-right" variant="outline-secondary"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="400" @click="$refs['modal-add-classement'].hide(); resetCurrentParticipant()"
                      data-aos-duration="400">Fermer</b-button>
          </b-col>
        </b-row>
      </b-modal>
    </section>
    <section v-else class="Loading">
      <app-loading color="#6ec8cb" />
    </section>
  </b-container>
</template>

<script>
import axios from "axios";
import appLoading from "@/loading";
import {mapState} from "vuex";
export default {
  name: "resultats",
  components: {appLoading},
  data: function() {
    return {
      data: null,
      name: null,
      first: null,
      second: null,
      third: null,
      rows: null,
      delay: 300,
      delayFirst: 500,
      currentParticipant: {
        id_public: -1,
        position: 0
      },
      participants: [],
      nbPlaces: 0,
      alertMax: 20,
      alertCountDown: 0,
      alertMessage: null,
      alertVariant: null,
    }
  },
  methods:{
    getParticipants(){
      axios.get(`http://localhost:3000/resultats/${this.$route.params.nomCompetition}/participants`)
          .then(response => {
            this.participants = response.data.data
          })
          .catch(e => {
            console.warn('err getParticipants : ', e)
            this.participants = []
          })
    },
    resetCurrentParticipant(){
      this.currentParticipant.id_public = -1
      this.currentParticipant.position = 0
    },
    dataSplice: async function(result){
      let temp = [...result.data.data.data];
      await temp.forEach(elt => {
        if (elt.Classement && elt.Classement === 1) {
          this.first = elt;
          result.data.data.data.splice(result.data.data.data.indexOf(elt), 1);
        } else if (elt.Classement && elt.Classement === 2) {
          this.second = elt;
          result.data.data.data.splice(result.data.data.data.indexOf(elt), 1);
        } else if (elt.Classement && elt.Classement === 3) {
          this.third = elt;
          result.data.data.data.splice(result.data.data.data.indexOf(elt), 1);
        }
      })
      this.data = result.data
    },
    addClassement(){
      try {
        let response = axios.put(`http://localhost:3000/resultats/${this.$route.params.nomCompetition}?idPublic=${this.currentParticipant.id_public}&position=${this.currentParticipant.position}`)
        if (this.alertCountDown > 0) this.alertCountDown = 0;
        setTimeout(() => {
          this.showAlert(`Vous avez ajouté un classement`, "success");
          window.scrollTo(0,0);
          this.resetCurrentParticipant()
        }, "200")
        this.$refs['modal-add-classement'].hide()
      } catch (e) {
        console.warn("error modifyCourse", e)
        if (this.alertCountDown > 0) this.alertCountDown = 0;
        setTimeout(() => {
          this.showAlert(`Erreur pendant l'ajout du classement`, "danger");
          window.scrollTo(0,0);
          this.resetCurrentParticipant()
        }, "200")
        this.$refs['modal-add-classement'].hide()
      }
    },
    countDownChanged(dismissCountDown) {
      this.alertCountDown = dismissCountDown;
    },
    showAlert(message, variant) {
      this.alertMessage = message;
      this.alertVariant = variant;
      this.alertCountDown = this.alertMax;
    },
  },
  computed:{
    ...mapState(['userInfos', 'layoutHeight'])
  },
  async created() {
    let self = this;
    await axios.get(`http://localhost:3000/resultats/${this.$route.params.nomCompetition}`)
        .then(async result => {
          if (result.data.data.data.length === 0) {
            self.name = await result.data.data.name;
            self.data = false;
          } else {
            self.name = await result.data.data.name;
            // self.data = await result.data
            this.nbPlaces = result.data.data.data[0]["Nombre de place"]
            self.rows = result.data.data.data.length;
            await self.dataSplice(result);
          }
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
    this.getParticipants()
  }
}
</script>

<style scoped>

</style>
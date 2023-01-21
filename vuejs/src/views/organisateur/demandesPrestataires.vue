<template>
  <b-container :style="layoutHeight" fluid>
    <section class="Alert">
      <b-alert :variant="alertVariant" :show="alertCountDown" @dismissed="alertCountDown=0" @dismiss-count-down="countDownChanged">
        <h4 :class="'text-'+alertVariant+' mt-3 mb-4'">{{alertMessage}}</h4>
        <b-progress :variant="alertVariant" :max="alertMax" :value="alertCountDown" height="4px"></b-progress>
      </b-alert>
    </section>
    <section v-if="data !== null" class="Body">
      <section class="Title">
        <b-row align-h="center" align-v="center">
          <b-col cols="auto">
            <h1 class="my-5">Demandes pour devenir prestataire</h1>
          </b-col>
        </b-row>
      </section>

      <section class="Main-demandes">
        <section class="None" v-if="data === 0">
          <b-row align-h="center" align-v="center">
            <b-col cols="auto">
              <h6 class="none-demandes">Aucune demande formulée</h6>
            </b-col>
          </b-row>
        </section>

        <section class="Card">
          <b-row align-h="center" align-v="center">
            <b-col v-for="(item, index) in data" :key="index" cols="12" sm="6" md="6" lg="4" xl="4" class="m-3 mx-sm-0 my-sm-3 mx-md-0 my-md-3 mx-lg-0 my-lg-3 mx-xl-0 my-xl-3">
              <b-card class="demandes-card">
                <b-card-title class="mt-2 mb-4">
                  {{item.nom_prestataire}}
                </b-card-title>
                <hr>
                <b-card-body class="py-0">
                  <section class="Id my-3">
                    <b-row align-v="center">
                      <b-col cols="auto">
                        <span class="etat-label"><b-icon icon="arrow-return-right" scale="0.8"></b-icon> Id de l'entreprise :</span>
                      </b-col>
                    </b-row>
                    <b-row align-h="center" align-v="center">
                      <b-col cols="auto">
                        <span class="etat-text">{{item.id_prestataire}}</span>
                      </b-col>
                    </b-row>
                  </section>

                  <section class="Email my-3">
                    <b-row align-v="center">
                      <b-col cols="auto">
                        <span class="etat-label"><b-icon icon="arrow-return-right" scale="0.8"></b-icon> Email de l'entreprise :</span>
                      </b-col>
                    </b-row>
                    <b-row align-h="center" align-v="center">
                      <b-col cols="auto">
                        <span class="etat-text">{{item.email_prestataire.trim()}}</span>
                      </b-col>
                    </b-row>
                  </section>

                  <section class="Telephone my-3">
                    <b-row align-v="center">
                      <b-col cols="auto">
                        <span class="etat-label"><b-icon icon="arrow-return-right" scale="0.8"></b-icon> Téléphone de l'entreprise :</span>
                      </b-col>
                    </b-row>
                    <b-row align-h="center" align-v="center">
                      <b-col cols="auto">
                        <span class="etat-text">{{item.telephone_prestataire.trim()}}</span>
                      </b-col>
                    </b-row>
                  </section>

                  <section class="Site my-3">
                    <b-row align-v="center">
                      <b-col cols="auto">
                        <span class="etat-label"><b-icon icon="arrow-return-right" scale="0.8"></b-icon> Site de l'entreprise :</span>
                      </b-col>
                    </b-row>
                    <b-row align-h="center" align-v="center">
                      <b-col cols="auto">
                        <span class="etat-text">{{item.site_web_prestataire.trim()}}</span>
                      </b-col>
                    </b-row>
                  </section>

                  <section class="Type my-3">
                    <b-row align-v="center">
                      <b-col cols="auto">
                        <span class="etat-label"><b-icon icon="arrow-return-right" scale="0.8"></b-icon> Type du prestataire :</span>
                      </b-col>
                    </b-row>
                    <b-row align-h="center" align-v="center">
                      <b-col cols="auto">
                        <span class="etat-text">{{item.etat_type.trim()}}</span>
                      </b-col>
                    </b-row>
                  </section>

                  <section class="Attente my-3">
                    <b-row align-v="center">
                      <b-col cols="auto">
                        <span class="etat-label"><b-icon icon="arrow-return-right" scale="0.8"></b-icon> Réponse de l'organisation :</span>
                      </b-col>
                    </b-row>
                    <b-row align-h="center" align-v="center">
                      <b-col class="px-0" cols="auto">
                        <b-spinner style="color: #495388" small></b-spinner>
                      </b-col>
                      <b-col cols="auto">
                        <span class="etat-text">En attente...</span>
                      </b-col>
                    </b-row>
                  </section>
                </b-card-body>
                <hr>
                <b-row align-h="center" align-v="center">
                  <b-col class="my-2" cols="auto">
                    <b-button @click="showAlertAccept(item.id_prestataire, item.nom_prestataire)" class="button-submit mx-1">Accepter</b-button>
                    <b-button @click="showAlertDecline(item.id_prestataire, item.nom_prestataire)" class="button-decline mx-1">Décliner</b-button>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </section>
      </section>
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
  name: "demandesPrestataires",
  components: {appLoading},
  data: function() {
    return {
      data: null,
      alertMax: 20,
      alertCountDown: 0,
      alertMessage: null,
      alertVariant: null
    }
  },
  computed:{
    ...mapState(['userInfos', 'layoutHeight'])
  },
  methods:{
    countDownChanged(dismissCountDown) {
      this.alertCountDown = dismissCountDown
    },
    async showAlertDecline(id,nom) {
      let self = this;
      await axios.post(`http://localhost:3000/demandes/prestataires/decline`, {id})
          .then(result => {
            self.getDemandesPrestataires();
            self.alertMessage = `Vous avez décliné le prestataire : ${nom}, (id = ${id})`;
            self.alertVariant = "warning";
            self.alertCountDown = self.alertMax
            window.scrollTo(0,0);
          })
          .catch((err) => {
            self.getDemandesPrestataires();
            self.alertMessage = `ERREUR lors du déclin du prestataire : ${nom}, (id = ${id})`;
            self.alertVariant = "danger";
            self.alertCountDown = self.alertMax
            window.scrollTo(0,0);
          });
    },
    async showAlertAccept(id, nom) {
      let self = this;
      await axios.post(`http://localhost:3000/demandes/prestataires/accept`, {id})
          .then(result => {
            self.getDemandesPrestataires();
            self.alertMessage = `Vous avez accepté le prestataire : ${nom}, (id = ${id})`;
            self.alertVariant = "success";
            self.alertCountDown = self.alertMax
            window.scrollTo(0,0);
          })
          .catch((err) => {
            self.getDemandesPrestataires();
            self.alertMessage = `ERREUR pour accepter le prestataire : ${nom}, (id = ${id})`;
            self.alertVariant = "danger";
            self.alertCountDown = self.alertMax
            window.scrollTo(0,0);
          });
    },
    async getDemandesPrestataires(){
      await axios.get(`http://localhost:3000/demandes/prestataires`)
          .then(result => {
            this.data = result.data.data;
          })
          .catch((err) => {
            let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            console.warn("error", message);
          });
    }
  },
  async created() {
    let self = this;
    setTimeout(async () => {
      if (self.userInfos.admin !== 'organisateur') await self.$router.push({name: 'home'});
    }, "50")
    await this.getDemandesPrestataires();
  }
}
</script>

<style scoped>
@import '../../../public/css/demandesPrestataires/demandesPrestataires.css';
</style>
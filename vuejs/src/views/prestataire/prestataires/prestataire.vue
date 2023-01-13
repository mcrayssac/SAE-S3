<template>
  <b-container fluid :style="layoutHeight">
    <section v-if="!data" class="Loading">
      <app-loading/>
    </section>
    <section v-else class="Main">
      <section class="Title">
        <b-row align-h="center">
          <b-col class="mt-5 ms-5 me-5" cols="auto">
            <h1 data-aos="zoom-in-down"
                data-aos-delay="200"
                data-aos-duration="500"
                data-aos-anchor-placement="top-center">
              <b-link href="https://www.jdadijon.com/basket/">
                <b-img alt="Logo club" :src="data.url_image" width="150"></b-img>
              </b-link>
              {{data.nom_prestataire}}
            </h1>
          </b-col>
        </b-row>
      </section>

      <section class="Description">
        <b-row class="me-2 ms-2 mt-5 mb-5">
          <b-col class="ml-3" style="background-color: #1a265a;">
            <b-row class="m-4" align-h="center">
              <b-col cols="auto">
                <h1 data-aos="fade-right"
                    data-aos-delay="400"
                    data-aos-duration="500"
                    data-aos-anchor-placement="top-center" style="color: white;">A PROPOS</h1>
              </b-col>
            </b-row>
<!--            <b-row class="mx-4 mb-5" v-for="(items, index) in data[0].texte" :key="index">-->
              <p data-aos="fade-left"
                 data-aos-delay="200"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" style="text-indent: 40px; color: white; text-align: justify;">{{ data.text_gauche }}</p>
<!--            </b-row>-->
          </b-col>
          <b-col class="my-auto mr-3">
            <b-row class="mx-5 my-5" align-h="center">
              <b-col data-aos="flip-up"
                     data-aos-delay="400"
                     data-aos-duration="500"
                     data-aos-anchor-placement="top-bottom" cols="auto">
                <a><b-img :src="data.url_image" width="300" height="300" style="border-radius: 50%;"></b-img></a>
              </b-col>
            </b-row>
            <b-row data-aos="zoom-in-up"
                   data-aos-delay="400"
                   data-aos-duration="500"
                   data-aos-anchor-placement="top-bottom" class="mx-4 my-5">
              <p style="color: black; font-weight: bold;text-align: justify;">
                {{data.text_droite}}
              </p>
            </b-row>
          </b-col>
        </b-row>
      </section>

      <hr class="m-5 ligne">

      <section class="Initiation/Activites">
        <b-row align-h="center">
          <b-col data-aos="zoom-in-left"
                 data-aos-delay="200"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" cols="auto">
            <h2 class="my-4">Initiation/Activités</h2>
          </b-col>
        </b-row>

        <b-row align-h="center">
          <b-col data-aos="fade-right"
                 data-aos-delay="300"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" cols="auto">
            <a><!--{{data.Initiation}}--></a>
          </b-col>
        </b-row>
      </section>

      <hr class="m-5 ligne">

      <section class="Calendrier">
        <b-row align-h="center">
          <b-col data-aos="zoom-in-right"
                 data-aos-delay="200"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" cols="auto">
            <h2 class="my-4">Calendrier sur le stand</h2>
          </b-col>
        </b-row>

        <b-row align-h="center">
          <span v-if="this.userInfos.admin == 'prestataire'">
            <Planning :calendarOptions=optionsPresta> </Planning>
          </span>

          <span v-else>
            <Planning :calendarOptions=optionsPublic> </Planning>
          </span>
        </b-row>
      </section>

      <hr class="m-5 ligne">

      <section class="Commentaire">
        <b-row align-h="center">
          <b-col data-aos="zoom-in-down"
                 data-aos-delay="200"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" cols="auto">
            <h2 class="my-4">Commentaires</h2>
          </b-col>
        </b-row>
        <div class="container">
          <div class="row me-4">
            <div data-aos="flip-right"
                 data-aos-delay="200"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" class="col-md-4 py-4 ps-5" v-for="(items, index) in commentaires" :key="index">
              <div class="card shadow-sm">
                <div class="card-body">
                  <h3 class="card-title">{{items.nom_public}}</h3>
                  <p class="card-text"><b> Commentaire : {{items.libelle_commentaire}}</b></p>
                  <p class="text-right red"> {{items.libelle_note}}/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button @click="peutPoster" style="width: 150px">Ajouter un commentaire</button>
      </section>

      <div class="container" v-if="postCom">
        <input v-model="form.commentaire" type="text" placeholder="Saisir votre commentaire" required>
        <input v-model="form.note" type="number" min="0" max="10" required>
        <button @click="ajouterCommentaire()" style="width: 150px">Poster</button>
      </div>
    </section>
  </b-container>
</template>

<script>
import axios from "axios";
import appLoading from "@/loading.vue"
import Planning from "@/components/Planning";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import {mapGetters, mapState} from "vuex";

export default {
  name: "prestataire",
  components: {appLoading, Planning},
  data: function() {
    return {
      layoutHeight: "margin-top : " + 59 + "px",
      data: null,
      commentaires: null,
      postCom: false,
      form: {
        commentaire: null,
        id: null,
        idPresta: null,
        note: null,
        surname: null
      },
      optionsPresta: {
        plugins: [TimeGridPlugin, InteractionPlugin],
        locale: "fr",
        headerToolbar: {
          left: '',
          center: '',
          right: ''
        },
        initialView: 'timeGridTwoDay',
        validRange: {
          start: '2023-08-15',
          end: '2023-08-17'
        },
        views: {
          timeGridTwoDay: {
            type: 'timeGrid',
            duration: {days: 2}
          }
        },
        slotMinTime: "08:00:00",
        slotMaxTime: "20:00:00",
        selectable: true,
        eventOverlap: false,
        editable: false, // mettre a false pour public et prestataire
        select: this.handleSelect,
        eventClick: this.handleEventClick,
        events: this.$store.getters.getEvents,
        nowIndicator: true
      },
      optionsPublic: {
        plugins: [TimeGridPlugin, InteractionPlugin],
        locale: "fr",
        headerToolbar: {
          left: '',
          center: '',
          right: ''
        },
        initialView: 'timeGridTwoDay',
        validRange: {
          start: '2023-08-15',
          end: '2023-08-17'
        },
        views: {
          timeGridTwoDay: {
            type: 'timeGrid',
            duration: {days: 2}
          }
        },
        slotMinTime: "08:00:00",
        slotMaxTime: "20:00:00",
        selectable: true,
        eventOverlap: false,
        editable: false,
        eventClick: this.handleEventClickPublic,
        events: this.$store.getters.getEvents,
        nowIndicator: true
      },
      currentEvent: {
        title: "",
        nbPlaces: null
      },
      currentTime: null,
      currentPlacesLeft : null
    }
  },
  methods: {
    peutPoster() {
      if (this.$store.getters.getUserInfos.id !== -1) {
          this.form.id = this.$store.getters.getUserInfos.id;
          this.form.idPresta = this.data.id_prestataire;
          this.postCom = true;
      }
      else alert("Connectez-vous pour poster un commentaire !");
    },
    ajouterCommentaire() {
      axios.post(`http://localhost:3000/prestataires/${this.$route.params.nomPrestataire}/post_commentaire`, this.form)
          .then(result => {
            this.commentaires.push(result.data.data);
          })
          .catch((err) => {
            let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            console.warn("error", message);
          });
    },
    handleSelect(selectTime){
      console.log(selectTime)
      let title = prompt('Please enter a new title for your event')
      let isOverlap = this.optionsPresta.events.some(event => selectTime.start.toJSON() >= event.start && selectTime.end.toJSON() <= event.end)

      if(title !== null && title !== "" && !isOverlap) {
        this.$store.commit("addEvent", {
          id: this.id,
          title: title,
          start: selectTime.startStr,
          end: selectTime.endStr,
          allDay: selectTime.allDay
        })
        this.id++
        this.optionsPresta.events = this.getEvents
      }
      else{
        alert("Impossible de créer un évènement à cet endroit là")
      }
    },
    handleEventClick(clickInfo) {
      console.log(clickInfo)
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
        this.$store.commit("removeEvent", clickInfo)
        this.optionsPresta.events = this.getEvents
      }
    },
    handleEventClickPublic(clickInfo) {
      console.log(clickInfo)
      console.log(this.userInfos)
      if (this.userInfos.admin !== null) window.location.href = "http://localhost:8080/signup";
      else {
        if (confirm(`Voulez-vous vous inscrire à l'évènement '${clickInfo.event.title}' ?`)) {
          clickInfo.event.remove()
          this.$store.commit("removeEvent", clickInfo)
          this.optionsPublic.events = this.getEvents
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getEvents"]),
    ...mapState(['userInfos'])
  },
  async created() {
    let self = this;
    await axios.get(`http://localhost:3000/prestataires/prestataire/${this.$route.params.nomPrestataire}`)
        .then(async (result) => {
          self.data = result.data.data;
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
    axios.get(`http://localhost:3000/prestataires/prestataire/getCommentaires/${this.data.id_prestataire}`)
        .then (com => {
          this.commentaires = com.data.data
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
    this.form.surname = this.userInfos.surname
  }
}
</script>

<style scoped>

</style>
<template>
  <b-container fluid :style="layoutHeight" class="background">
    <br>
    <section v-if="show" class="Form my-5">
      <b-row align-h="center">
        <b-col cols="auto" class="mx-5 my-5"
               data-aos="zoom-out-left"
               data-aos-anchor-placement="top-bottom"
               data-aos-duration="800"><h1>S'inscrire</h1></b-col>
      </b-row>
      <b-form class="mx-5" @submit="onSubmit" @reset="onReset">

        <b-form-group class="mx-5 my-3" label="Prénom* :" label-class="label"
                      data-aos="fade-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="800">
          <b-form-input v-model="form.firstname" type="text" placeholder="Entrer votre prénom" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Nom* :" label-class="label"
                      data-aos="fade-right"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="300"
                      data-aos-duration="800">
          <b-form-input v-model="form.name" type="text" placeholder="Entrer votre nom" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Email* :" label-class="label"
                      data-aos="fade-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="600"
                      data-aos-duration="800">
          <b-form-input v-model="form.email" type="email" placeholder="Entrer votre email" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Mot de passe* :" label-class="label"
                      data-aos="fade-right"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="900"
                      data-aos-duration="800">
          <b-form-input v-model="form.password" type="password" placeholder="Entrer votre mot de passe" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Entrez à nouveau votre mot de passe* :" label-class="label"
                      data-aos="fade-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="1200"
                      data-aos-duration="800">
          <b-form-input v-model="form.password2" type="password" placeholder="Entrer votre mot de passe" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Choisir une langue, un age, un sexe et un pays* :" label-class="label"
                      data-aos="fade-right"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="1500"
                      data-aos-duration="800">
          <b-row align-h="center" align-v="center">
            <b-col cols="auto">
              <b-form-select
                  class="mx-3"
                  v-model="form.language"
                  :options="data.data.langues"
                  required
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>Langue</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-select
                  class="mx-3"
                  v-model="form.year"
                  :options="data.data.years"
                  required
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>Age</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-select
                  class="mx-3"
                  v-model="form.gender"
                  :options="data.data.gender"
                  required
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>Sexe</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-select
                  class="mx-3"
                  v-model="form.country"
                  :options="data.data.countries"
                  required
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>Pays</b-form-select-option>
                </template>
              </b-form-select>
            </b-col>
          </b-row>
        </b-form-group>

        <b-row class="m-5" align-h="center" align-v="center">
          <b-col cols="auto">
            <b-button class="mx-2 button-submit" type="submit"
                      data-aos="flip-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="400">Envoyer</b-button>
            <b-button class="mx-2 button-decline" type="reset"
                      data-aos="flip-right"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="400"
                      data-aos-duration="400">Réinitialiser</b-button>
          </b-col>
        </b-row>

      </b-form>

      <b-row class="ms-4 me-5" align-h="center" align-v="center">
        <span class="description">*Nous ne partagerons jamais vos données personnelles, *obligatoire</span>
      </b-row>
    </section>

    <section v-else class="Loading">
      <app-loading color="white" />
    </section>

    <section class="Modal">
      <b-modal body-text-variant="danger" ref="login-error-modal" title="Lakeside Sports Festival" hide-header-close>
        <b-col class="my-3">
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: large; font-family: 'Montserrat', sans-serif;">Erreur lors de la création de compte !</span>
            </b-col>
          </b-row>
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: medium; font-family: 'Montserrat', sans-serif;">{{modalMessage}}</span>
            </b-col>
          </b-row>
        </b-col>
        <template #modal-footer >
          <b-row class="mx-auto" align-h="center">
            <b-col cols="auto">
              <b-button class="button" @click="hideLoginErrorModal">Close</b-button>
            </b-col>
          </b-row>
        </template>
      </b-modal>
    </section>
    <br>
  </b-container>
</template>

<script>
import axios from "axios";
import appLoading from "@/loading";
import {mapState} from "vuex";

export default {
  name: "signup",
  components: {appLoading},
  data() {
    return {
      data: null,
      show: false,
      modalShow: false,
      modalMessage: null,
      emailExisting: null,
      form: {
        firstname: null,
        name: null,
        email: null,
        password: null,
        password2: null,
        language: null,
        year: null,
        gender: null,
        country: null,
      }
    }
  },
  computed:{
    ...mapState(['layoutHeight', 'user'])
  },
  methods: {
    async onSubmit(event) {
      if (this.form.password === this.form.password2){
        await event.preventDefault()
        await this.checkEmail();
        if (!this.emailExisting){
          this.modalMessage = "L'email est déjà relié à un compte !";
          await this.showLoginErrorModal();
        } else {
          await this.createAccount();
        }
      } else {
        await event.preventDefault()
        this.modalMessage = "Les mots de passe ne sont pas égaux !";
        await this.showLoginErrorModal();
      }
    },
    onReset(event) {
      event.preventDefault()
      this.form.firstname = null;
      this.form.name = null;
      this.form.email = null;
      this.form.password = null;
      this.form.password2 = null;
      this.form.language = null;
      this.form.year = null;
      this.form.gender = null;
      this.form.country = null;
    },
    async checkEmail(){
      const self = this;
      await axios.post(`http://localhost:3000/api/check/email/public`, {email: this.form.email})
          .then((result) => {
            self.emailExisting = true;
          })
          .catch((error) => {
            self.emailExisting = false;
          });
    },
    getUserInfos: async function (){
      await this.$store.dispatch('getUserInfos')
          .then(function (response){
            /* Token valide
            console.log("Token valide : ",response);*/
          }, function (error){
            /* Token invalide
            console.log("Token invalide : ",error);*/
          });
    },
    login: async function (){
      const self = this;
      await this.$store.dispatch('login', {
        email: this.form.email,
        password: this.form.password
      }).then(function (response){
        self.getUserInfos();
        console.log("Login valide : ",response);
        self.$router.push({name: 'home'});
      }, function (error){
        self.modalMessage = "Erreur ";
        self.showLoginErrorModal();
        console.log("Login invalide : ",error);
      })
    },
    createAccount: async function () {
      const self = this;
      await this.$store.dispatch('createAccount', {form: this.form})
          .then(function (response) {
            console.log(response);
            self.login();
          }, function (error) {
            console.log(error);
          })
    },
    showLoginErrorModal() {
      this.$refs['login-error-modal'].show();
    },
    hideLoginErrorModal() {
      this.$refs['login-error-modal'].hide();
    }
  },
  async created() {
    if (this.user.id !== -1){
      await this.$router.push({name: 'home'});
    }
    await axios.get(`http://localhost:3000/inscription/choix/public`)
        .then(result => {
          this.data = result.data;
          this.show = true;
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
  }
}
</script>

<style scoped>
@import '../../../public/css/signup/signup.css';
</style>
<template>
  <b-container fluid :style="$store.state.layoutHeight" class="background">
    <br>
    <section v-if="show" class="Form my-5">
      <b-row align-h="center">
        <b-col cols="auto" class="mx-5 my-5"
               data-aos="fade-left"
               data-aos-offset="400"
               data-aos-duration="8000"><h1>S'inscrire</h1></b-col>
      </b-row>
      <b-form class="mx-5" @submit="onSubmit" @reset="onReset">

        <b-form-group class="mx-5 my-3" label="Prénom* :" label-class="label">
          <b-form-input v-model="form.firstname" type="text" placeholder="Entrer votre prénom" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Nom* :" label-class="label">
          <b-form-input v-model="form.name" type="text" placeholder="Entrer votre nom" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Email* :" label-class="label">
          <b-form-input v-model="form.email" type="email" placeholder="Entrer votre email" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Mot de passe* :" label-class="label">
          <b-form-input v-model="form.password" type="password" placeholder="Entrer votre mot de passe" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Entrez à nouveau votre mot de passe* :" label-class="label">
          <b-form-input v-model="form.password2" type="password" placeholder="Entrer votre mot de passe" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Choisir une langue, un age, un sexe et un pays* :" label-class="label">
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
            <b-button class="mx-2 button-submit" type="submit">Envoyer</b-button>
            <b-button class="mx-2 button-reset" type="reset">Réinitialiser</b-button>
          </b-col>
        </b-row>

      </b-form>

      <b-row class="ms-4 me-5" align-h="center" align-v="center">
        <span class="description">*Nous ne partagerons jamais vos données personnelles, *obligatoire</span>
      </b-row>
    </section>

    <section v-else class="Loading">
      <app-loading/>
    </section>

    <section class="Modal">
      <b-modal body-text-variant="danger" ref="login-error-modal" title="Lakeside Sports Festival" hide-header-close>
        <b-col class="my-3">
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: x-large; font-family: 'Montserrat', sans-serif;">Email ou mot de passe erroné !</span>
            </b-col>
          </b-row>
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: large; font-family: 'Montserrat', sans-serif;">Veuillez réessayer</span>
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

export default {
  name: "signup",
  components: {appLoading},
  data() {
    return {
      data: null,
      show: false,
      modalShow: false,
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
  methods: {
    onSubmit(event) {
      if (this.form.password === this.form.password2){
        event.preventDefault()
        alert(JSON.stringify(this.form))
      } else {
        //Todo: else alert(password != password2)
        this.showLoginErrorModal();
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
    showLoginErrorModal() {
      this.$refs['login-error-modal'].show()
    },
    hideLoginErrorModal() {
      this.$refs['login-error-modal'].hide()
    }
  },
  async created() {
    await axios.get(`http://localhost:3000/inscription/choix`)
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
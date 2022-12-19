<template>
  <b-container fluid :style="$store.state.layoutHeight">
    <b-row align-h="center">
      <b-col cols="auto" class="m-5"
             data-aos="fade-left"
             data-aos-offset="400"
             data-aos-duration="8000"><h1>S'inscrire</h1></b-col>
    </b-row>
    <b-form class="mx-5" @submit="onSubmit" @reset="onReset">

      <b-form-group class="mx-5 my-3" label="Prénom* :">
        <b-form-input v-model="form.firstname" type="text" placeholder="Entrer votre prénom" required></b-form-input>
      </b-form-group>

      <b-form-group class="mx-5 my-3" label="Nom* :">
        <b-form-input v-model="form.name" type="text" placeholder="Entrer votre nom" required></b-form-input>
      </b-form-group>

      <b-form-group class="mx-5 my-3" label="Email* :">
        <b-form-input v-model="form.email" type="email" placeholder="Entrer votre email" required></b-form-input>
      </b-form-group>

      <b-form-group class="mx-5 my-3" label="Mot de passe* :">
        <b-form-input v-model="form.password" type="password" placeholder="Entrer votre mot de passe" required></b-form-input>
      </b-form-group>

      <b-form-group class="mx-5 my-3" label="Entrez à nouveau votre mot de passe* :">
        <b-form-input v-model="form.password2" type="password" placeholder="Entrer votre mot de passe" required></b-form-input>
      </b-form-group>

      <b-form-group class="mx-5 my-3" label="Choisir une langue, un age, un sexe et un pays* :">
      <b-row align-h="center" align-v="center">
        <b-col cols="auto">
          <b-form-select
              class="mx-3"
              v-model="form.language"
              :options="data.data.langues"
              required
          ></b-form-select>
          <b-form-select
              class="mx-3"
              v-model="form.year"
              :options="data.data.years"
              required
          ></b-form-select>
          <b-form-select
              class="mx-3"
              v-model="form.gender"
              :options="data.data.gender"
              required
          ></b-form-select>
          <b-form-select
              class="mx-3"
              v-model="form.country"
              :options="data.data.countries"
              required
          ></b-form-select>
        </b-col>
      </b-row>
      </b-form-group>

      <b-row class="m-5" align-h="center" align-v="center">
        <b-col cols="auto">
          <b-button class="mx-2" type="submit" variant="LightBlue">Submit</b-button>
          <b-button class="mx-2" type="reset" variant="Red">Reset</b-button>
        </b-col>
      </b-row>

    </b-form>
    {{data.data}} <br> {{form}}
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: null,
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
      } //Todo: else alert(password != password2)

    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.firstname = null;
      this.form.name = null;
      this.form.email = null;
      this.form.password = null;
      this.form.password2 = null;
      this.form.language = null;
      this.form.year = null;
      this.form.gender = null;
      this.form.country = null;
    }
  },
  async created() {
    await axios.get(`http://localhost:3000/inscription/choix`)
        .then(result => {
          this.data = result.data;
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
  }
}
</script>

<style scoped>

</style>
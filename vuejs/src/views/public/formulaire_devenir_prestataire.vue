<template>
  <b-container fluid :style="layoutHeight">
    <section v-if="!data" class="Loading">
      <app-loading/>
    </section>
    <section v-else class="Main"></section>

    <main id="app" class="container">
      <div id="div_form">
        <b-form class="mt-5 p-3" @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label="Nom de l'établissement :" label-for="input-1">
            <b-form-input id="input-1" v-model="name" type="text" placeholder="Saisir le nom de l'établissement"
                          required></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Email :" label-for="input-2">
            <b-form-input id="input-2" v-model="form.email" type="email" placeholder="Saisir l'email" required>
            </b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Téléphone :" label-for="input-3">
            <b-form-input id="input-3" v-model="form.number" placeholder="Saisir votre numéro de téléphone" required>
            </b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Type de votre établissement :" label-for="input-4">
            <b-form-select v-for="(item, index) in data" :key="index" class="form-select" id="input-4" :options="index" required>{{item}}</b-form-select>
          </b-form-group>

          <b-form-group id="input-group-5" label="Site web de votre établissement :" label-for="input-5">
            <b-form-input id="input-3" v-model="form.site_web" placeholder="Saisir votre site web"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-6" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group v-model="form.checked" id="checkboxes-6" :aria-describedby="ariaDescribedby">
              <b-form-checkbox value="robot">Je ne suis pas un robot</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>

          <b-button class="me-1 btn btn-sub" type="submit" variant="lightBlue">Valider</b-button>
          <b-button class="ms-1 btn btn-dgr" type="reset" variant="Red">Réinitialiser</b-button>
        </b-form>
      </div>
    </main>
  </b-container>
</template>

<!-- =================================================================================================================== style -->
<style>
  .btn {
    font-weight: bold;
    color: white;
  }
  .btn:hover {
    font-weight: bold;
    color: white;
    transform: scale(1.06);
  }
  form * {
    margin-top: 20px;
  }
  .btn-sub {
    background-color: #495388;
    border-color: #495388;
  }
  .btn-sub:hover {
    background-color: #495388;
    border-color: #495388;
  }
  .btn-dgr {
    background-color: #6ec8cb;
    border-color: #6ec8cb;
  }
  .btn-dgr:hover {
    background-color: #6ec8cb;
    border-color: #6ec8cb;
  }
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        type: null,
        checked: []
      },
      data: null,
      type: null,
      show: true,
      layoutHeight: "margin-top : "+59+"px",
    }
  },
  async created() {
    await axios.get(`http://localhost:3000/categories`)
        .then(result => {
          this.data = result.data.getCategories;
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
  }
}
</script>
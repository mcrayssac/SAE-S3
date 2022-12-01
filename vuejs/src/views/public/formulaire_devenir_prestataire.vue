<template>
  <main id="app" class="container">
    <div id="div_form">
      <b-form class="mt-5 p-3" @submit="onSubmit" @reset="onReset" v-if="show"> <!-- =================================== mt-5 p-5 -->
        <b-form-group id="input-group-1" label="Nom de l'établissement :" label-for="input-1">
          <b-form-input id="input-1" v-model="form.name" type="text" placeholder="Saisir le nom de l'établissement"
                        required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Email :" label-for="input-2">
          <b-form-input id="input-2" v-model="form.email" type="email" placeholder="Saisir l'email" required>
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Téléphone :" label-for="input-3">
          <b-form-input id="input-3" v-model="form.telephone" placeholder="Saisir votre numéro de téléphone" required>
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Type de votre établissement :" label-for="input-4">
          <b-form-select class="form-select" id="input-4" v-model="form.type" :options="type" required></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-5" label="Site web de votre établissement :" label-for="input-5">
          <b-form-input id="input-3" v-model="form.site_web" placeholder="Saisir votre site web"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group v-model="form.checked" id="checkboxes-6" :aria-describedby="ariaDescribedby">
            <b-form-checkbox value="robot">Je ne suis pas un robot</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button class="me-1 btn-sub" type="submit">Valider</b-button>
        <b-button class="ms-1 btn-dgr" type="reset">Réinitialiser</b-button>
      </b-form>
    </div>
  </main>
</template>

<!-- =================================================================================================================== style -->
<style>
form * {
  margin-top: 20px;
}
.btn-sub {
  background-color: #495388;
  font-weight: bold;
}
.btn-dgr {
  background-color: #d9231a;
  border-color: #d9231a;
  font-weight: bold;
}
</style>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        type: null,
        checked: []
      },
      type: [{ text: 'Sélectioner', value: null }, 'Restaurants', 'Clubs', 'Magasins'],
      show: true
    }
  }
}
</script>
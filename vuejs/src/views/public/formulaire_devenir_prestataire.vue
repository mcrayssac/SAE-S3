<template>
    <div id="div_form" class="container">
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

        <b-form-group id="input-group-5" label="Besoins spécifiques :" label-for="input-5">
          <b-form-select class="form-select" id="input-5" v-model="form.besoins" :options="besoins" required></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-6" label="Site web de votre établissement :" label-for="input-6">
          <b-form-input id="input-6" v-model="form.site_web" placeholder="Saisir votre site web"></b-form-input>
        </b-form-group>

        <b-form-checkbox-group v-model="form.checked" id="checkboxes-7" :aria-describedby="ariaDescribedby">
          <b-form-checkbox value="robot" required>Je ne suis pas un robot</b-form-checkbox>
        </b-form-checkbox-group>

        <button class="me-1 btn btn-submit" type="submit">Valider</button>
        <button class="ms-1 btn btn-reset" type="reset">Réinitialiser</button>
      </b-form>
    </div>
</template>

<!-- =================================================================================================================== style -->
<style>
  form * {
    margin-top: 20px;
  }
  .btn {
    font-weight: bold;
    color: white;
  }
  .btn:hover {
    font-weight: bold;
    color: white;
    transform: scale(1.06);
  }
  .btn-submit {
    background-color: #495388;
    border-color: #495388;
  }
  .btn-submit:hover {
    background-color: #495388;
    border-color: #495388;
  }
  .btn-reset {
    background-color: #6ec8cb;
    border-color: #6ec8cb;
  }
  .btn-reset:hover {
    background-color: #6ec8cb;
    border-color: #6ec8cb;
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
          besoins: null,
          checked: []
        },
        type: [{ text: 'Sélectioner', value: null }, 'Restaurants', 'Clubs', 'Magasins'],
        besoins: [{ text: 'Sélectioner', value: null }, 'Eau', 'Place', 'Foret'],
        show: true
      }
    }
  }
</script>
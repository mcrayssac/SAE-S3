<template>
  <b-container fluid :style="$store.state.layoutHeight" class="background">
    <br>
    <section v-if="show" class="Form my-5">
      <b-row align-h="center">
        <b-col cols="auto" class="mx-5 my-5"
               data-aos="zoom-out-left"
               data-aos-anchor-placement="top-bottom"
               data-aos-duration="800"><h1>Devenir prestataire</h1></b-col>
      </b-row>
      <b-form class="mx-5" @submit="onSubmit" @reset="onReset">

        <b-form-group class="mx-5 my-3" label="Nom de l'établissement* :" label-class="label"
                      data-aos="fade-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="800">
          <b-form-input v-model="form.name" type="text" placeholder="Saisir le nom de l'établissement" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Email* :" label-class="label"
                      data-aos="fade-right"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="300"
                      data-aos-duration="800">
          <b-form-input v-model="form.email" type="email" placeholder="Entrer votre email" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Téléphone* :" label-class="label"
                      data-aos="fade-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="600"
                      data-aos-duration="800">
          <b-form-input v-model="form.number" type="number" placeholder="Saisir votre numéro de téléphone" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Site web de votre établissement* :" label-class="label"
                      data-aos="fade-right"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="900"
                      data-aos-duration="800">
          <b-form-input v-model="form.site" type="text" placeholder="Entrer l'URL du site de votre l'établissement"
                        required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Mot de passe* :" label-class="label"
                      data-aos="fade-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="1200"
                      data-aos-duration="800">
          <b-form-input v-model="form.password" type="password" placeholder="Entrer votre mot de passe" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Entrez à nouveau votre mot de passe* :" label-class="label"
                      data-aos="fade-right"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="1500"
                      data-aos-duration="800">
          <b-form-input v-model="form.password2" type="password" placeholder="Entrer votre mot de passe" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Choisissez le type de votre établissement* :" label-class="label"
                      data-aos="fade-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="800">
          <b-row align-h="center" align-v="center">
            <b-col cols="auto">
              <b-form-select
                  class="mx-3"
                  v-model="form.type"
                  :options="data.data.type"
                  required
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>Type</b-form-select-option>
                </template>
              </b-form-select>
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group class="mx-5 my-3"
                      data-aos="fade-right"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="800">
          <b-row align-h="center" align-v="center">
            <b-col cols="auto">
              <b-form-checkbox v-model="checkBox" :value="true" :unchecked-value="false" size="lg"></b-form-checkbox>
            </b-col>
            <b-col cols="auto">
              <span class="label">Je ne suis pas un robot</span>
            </b-col>
          </b-row>
        </b-form-group>

        <b-row class="m-5" align-h="center" align-v="center">
          <b-col cols="auto">
            <b-button class="mx-2 button-submit" type="submit"
                      data-aos="flip-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="400">Envoyer
            </b-button>
            <b-button class="mx-2 button-reset" type="reset"
                      data-aos="flip-right"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-delay="400"
                      data-aos-duration="400">Réinitialiser
            </b-button>
          </b-col>
        </b-row>

      </b-form>

      <b-row class="ms-4 me-5" align-h="center" align-v="center">
        <span class="description">*Nous ne partagerons jamais les données de votre entreprise, *obligatoire</span>
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
              <span style="font-size: large; font-family: 'Montserrat', sans-serif;">Erreur lors de la création de compte !</span>
            </b-col>
          </b-row>
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: medium; font-family: 'Montserrat', sans-serif;">{{ modalMessage }}</span>
            </b-col>
          </b-row>
        </b-col>
        <template #modal-footer>
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
      modalMessage: null,
      emailExisting: null,
      checkBox: false,
      form: {
        name: null,
        email: null,
        number: null,
        site: null,
        password: null,
        password2: null,
        type: null
      }
    }
  },
  methods: {
    async onSubmit(event) {
      if (this.checkBox){
        if (this.form.password === this.form.password2) {
          await event.preventDefault()
          await this.checkEmail();
          if (!this.emailExisting) {
            this.modalMessage = "L'email est déjà relié à un compte !";
            await this.showLoginErrorModal();
          } else {
            console.log(this.form);
            await this.createAccount();
          }
        } else {
          await event.preventDefault()
          this.modalMessage = "Les mots de passe ne sont pas égaux !";
          await this.showLoginErrorModal();
        }
      } else {
        await event.preventDefault()
        this.modalMessage = "Veuillez cliquer dans 'Je ne suis pas un robot' !";
        await this.showLoginErrorModal();
      }

    },
    onReset(event) {
      event.preventDefault()
      this.form.name = null;
      this.form.email = null;
      this.form.number = null;
      this.form.site = null;
      this.form.password = null;
      this.form.password2 = null;
      this.form.type = null;
      this.checkBox = false;
    },
    async checkEmail() {
      const self = this;
      await axios.post(`http://localhost:3000/api/check/email/prestataire`, {email: this.form.email})
          .then((result) => {
            self.emailExisting = true;
          })
          .catch((error) => {
            self.emailExisting = false;
          });
    },
    getUserInfos: async function () {
      await this.$store.dispatch('getUserInfos')
          .then(function (response) {
            /* Token valide
            console.log("Token valide : ",response);*/
          }, function (error) {
            /* Token invalide
            console.log("Token invalide : ",error);*/
          });
    },
    login: async function () {
      const self = this;
      await this.$store.dispatch('login', {
        email: this.form.email,
        password: this.form.password
      }).then(function (response) {
        self.getUserInfos();
        console.log("Login valide : ", response);
        window.location.href = "http://localhost:8080/";
      }, function (error) {
        self.modalMessage = "Erreur ";
        self.showLoginErrorModal();
        console.log("Login invalide : ", error);
      })
    },
    createAccount: async function () {
      const self = this;
      await this.$store.dispatch('createAccount', {form: this.form, admin: 'prestataire'})
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
    await axios.get(`http://localhost:3000/inscription/choix/prestataire`)
        .then(result => {
          this.data = result.data;
          this.show = true;
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
  },
  updated() {
    if (this.$store.state.userInfos.admin) {
      window.location.href = "http://localhost:8080/";
    }
  }
}
</script>

<style scoped>
@import '../../../public/css/signup/signup.css';
</style>
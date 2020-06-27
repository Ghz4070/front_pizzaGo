<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="mx-auto" max-width="444" outlined>
        <v-card-text>
          <h3 class="center">Mot de passe oublier</h3>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Adresse mail"
                type="email"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <!-- load spinner -->
              <div v-if="check" class="center">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
              </div>
              <v-btn
              v-if="!check"
                :disabled="!valid || check"
                color="success"
                class="center"
                @click="resetMdp"
              >Envoyer</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <v-snackbar v-model="login_toast.snackbar">
      {{ login_toast.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="login_toast.snackbar = false">X</v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script>
import axios from "axios";
import { EventBus } from '../../bus.js';

export default {
  data: function() {
    return {
      check: false,
      login_toast: { snackbar: false, text: "" },
      valid: false,
      email: "",
      emailRules: [
        v => !!v || "Adresse mail requis.",
        v => /.+@.+/.test(v) || "Format invalide"
      ],
    };
  },
  async mounted() {},
  methods: {
    resetMdp() {
      this.check = true;
      let params = { email : this.email }
      return axios
        .post(`http://localhost:4000/api/v1/user/forgetPassword`, params)
        .then(res => {
          if(res.data.status == "success") {
            this.login_toast.text = 'Un mail viens de vous être envoyer avec les instructions.'
            this.login_toast.snackbar = true;
            this.check = false;
            setTimeout(() => {
              this.$router.push({ name: 'index' });
            }, 1500);
          } else {
            this.check = false;
            this.login_toast.text = 'Aucun mail correspondant.'
            this.login_toast.snackbar = true;
          }

        })
        .catch(e => {
          console.log("catch");
          this.login_toast.text = 'Une erreur est survenue. Veuillez réessayer ultèrieurement.'
          this.login_toast.snackbar = true;
        });
    },
  }
};
</script>

<style>
.center {
  text-align: center;
  display: block !important;
  margin-left: auto;
  margin-right: auto;
}
h3 {
  margin: 15px;
  font-size: 1.7em;
}
</style>
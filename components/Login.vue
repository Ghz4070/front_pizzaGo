<template>
  <v-form v-model="valid">
    <h1 class="title-subscribe">S'identifier</h1>
    <p class="content-subscribe">
          Vous n'avez pas encore de compte PizzaGo ?
          <nuxt-link class="link-subscribe" to="/inscription">S'inscrire maintenant!</nuxt-link></p>
      <v-card class="mx-auto" max-width="444" outlined>
        <v-card-text>
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
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Mot de passe"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-btn
                :disabled="!valid"
                color="success"
                class="center"
                @click="login"
              >Se connecter</v-btn>
            </v-col>

            <v-row>
              <v-col cols="12" md="6"><nuxt-link class="center" to="/password/forgot-password">Mot de passe oublier ?</nuxt-link></v-col>
              <v-col cols="12" md="6"><nuxt-link class="center" to="/inscription">Inscription</nuxt-link></v-col>
            </v-row>
          </v-row>
        </v-card-text>
      </v-card>
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
import { EventBus } from '../bus.js';

export default {
  data: function() {
    return {
      login_toast: { snackbar: false, text: "" },
      valid: false,
      email: "",
      emailRules: [
        v => !!v || "Adresse mail requis.",
        v => /.+@.+/.test(v) || "Format invalide"
      ],
      password: "",
      passwordRules: [v => !!v || "Mot de passe requis"]
    };
  },
  async mounted() {},
  methods: {
    emitGlobalClickEvent() {
      EventBus.$emit('setHeader', 'update_nav');
    },
    login() {
      let params = { email : this.email, password: this.password }
      return axios
        .post(`http://localhost:4000/api/v1/user/connection`, params)
        .then(res => {
          if(res.data.status == "success") {
            this.login_toast.text = 'Connexion réaliser avec succées.'
            this.login_toast.snackbar = true;
            this.setToken(res.data.result);
            setTimeout(() => {
              this.emitGlobalClickEvent();
              this.$router.push({ name: 'index' });
            }, 1500);
          } else {
            this.login_toast.text = 'Erreur de connexion.'
            this.login_toast.snackbar = true;
          }

        })
        .catch(e => {
          console.log("catch");
          this.login_toast.text = 'Une erreur est survenue. Veuillez réessayer ultèrieurement.'
          this.login_toast.snackbar = true;
        });
    },
    setToken(token) {
      localStorage.setItem('x-access-token',token);
    }
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
.title-subscribe {
  font-size: 3em;
}
.link-subscribe {
  color:#f6ac00;
}
.content-subscribe {
  margin-bottom: 50px !important;
}
</style>
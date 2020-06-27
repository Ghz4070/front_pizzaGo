<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="mx-auto" max-width="444" outlined>
        <v-card-text>
          <h3 class="center">Mot de passe oublier</h3>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="password1"
                :rules="passwordRules"
                label="Nouveau mot de passe"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="password2"
                :rules="passwordRules"
                label="Confirmer votre mot de passe"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-btn :disabled="!valid" color="success" class="center" @click="resetMdp">Modifier</v-btn>
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
import { EventBus } from "../../bus.js";

export default {
  data: function() {
    return {
      login_toast: { snackbar: false, text: "" },
      valid: false,
      password1: "",
      password2: "",
      passwordRules: [v => !!v || "Mot de passe requis"]
    };
  },
  async mounted() {},
  methods: {
    emitGlobalClickEvent() {
      EventBus.$emit("setHeader", "update_nav");
    },
    resetMdp() {
      let id = this.$route.query.id;
      let params = {
        firstPassword: this.password1,
        secondPassword: this.password2
      };
      return axios
        .post(`http://localhost:4000/api/v1/user/resetPassword/` + id, params)
        .then(res => {
          if (res.data.status == "success") {
            this.login_toast.text = "Mot de passe modifier.";
            this.login_toast.snackbar = true;
            this.setToken(res.data.result);
            setTimeout(() => {
              this.emitGlobalClickEvent();
              this.$router.push({ name: "index" });
            }, 1500);
          } else {
            this.login_toast.text = "Les mots de passes ne correspondent pas.";
            this.login_toast.snackbar = true;
          }
        })
        .catch(e => {
          console.log("catch");
          this.login_toast.text =
            "Une erreur est survenue. Veuillez réessayer ultèrieurement.";
          this.login_toast.snackbar = true;
        });
    },
    setToken(token) {
      localStorage.setItem("x-access-token", token);
    }
  }
};
</script>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
div {
  font-family: "Pacifico", cursive;
} */
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
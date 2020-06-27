<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="12">
      <v-card class="mx-auto" max-width="444" outlined>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="firstname" :rules="lengthRules" label="Prénom*" required></v-text-field>

            <v-text-field v-model="lastname" :rules="lengthRules" label="Nom*" required></v-text-field>

            <v-text-field v-model="address" :rules="lengthRules" label="Adresse*" required></v-text-field>

            <v-text-field v-model="zip" :rules="lengthRules" label="Code postal*" required></v-text-field>

            <v-text-field v-model="city" :rules="lengthRules" label="Ville*" required></v-text-field>

            <v-text-field v-model="number" :rules="lengthRules" label="N° téléphone*" required></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Adresse mail*"
              type="email"
              required
            ></v-text-field>

            <v-text-field
              v-model="firstPassword"
              :rules="passwordRules"
              label="Mot de passe*"
              type="password"
              required
            ></v-text-field>

            <v-text-field
              v-model="secondPassword"
              :rules="passwordRules"
              type="password"
              label="Confirmation du mot de passe*"
              required
            ></v-text-field>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="inscription">Inscription</v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-snackbar v-model="login_toast.snackbar">
        {{ login_toast.text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="login_toast.snackbar = false">X</v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      emailRules: [
        v => !!v || "Adresse mail requis.",
        v => /.+@.+/.test(v) || "Format invalide"
      ],
      passwordRules: [
        v => !!v || "Mot de passe requis",
        v => v.length >= 6 || "Mini 8 caractères"
      ],
      lengthRules: [v => v.length >= 3 || "Mini 3 caractères"],
      valid: false,
      firstname: "",
      lastname: "",
      address: "",
      zip: "",
      city: "",
      number: "",
      email: "",
      firstPassword: "",
      secondPassword: "",
      login_toast: { snackbar: false, text: "" }
    };
  },
  methods: {
    async inscription() {
      const body = {
        firstname: this.firstname,
        lastname: this.lastname,
        address: this.address,
        zip: parseInt(this.zip, 10),
        city: this.city,
        tel: this.number,
        email: this.email,
        firstPassword: this.firstPassword,
        secondPassword: this.secondPassword
      };

      const addUser = await axios.post(
        "http://localhost:4000/api/v1/user/add",
        body
      );

      if (addUser.data.status == "success") {
        this.login_toast.text =
          "Inscription réaliser avec succées. Vous allez être redirigé vers la page d'accueil dans quelque seconde";
        this.login_toast.snackbar = true;
        setTimeout(() => {
          this.$router.push({ name: "index" });
        }, 1500);
      } else if (addUser.data.result === "not same password") {
        this.login_toast.text =
          "Vérifier qu'il sagit bien du même mot de passe";
        this.login_toast.snackbar = true;
      } else if (addUser.data.result === "this email has been used") {
        this.login_toast.text = "Ce mail est déjà utilisé chez nous";
        this.login_toast.snackbar = true;
      }
    }
  }
};
</script>

<style>
</style>
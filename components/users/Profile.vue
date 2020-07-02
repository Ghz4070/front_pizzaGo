<template>
  <v-card>
    <v-card-title class="headline">Mes informations</v-card-title>
    <template v-if="userInformation">
      <v-form @submit="updateProfil">
        <v-text-field
          class="pl-4 pr-4"
          v-for="(value, key) in userInformation"
          :label="key"
          :value="value"
          :key="key"
          required
        />
        <button class="edit_btn">Modifier</button>
      </v-form>
    </template>
    <v-snackbar v-model="fieldValide_toast.snackbar">
      {{ fieldValide_toast.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="fieldValide_toast.snackbar = false">X</v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="field_toast.snackbar">
      {{ field_toast.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="field_toast.snackbar = false">X</v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userInformation: {},
      field_toast: {
        snackbar: false,
        text: "Veuillez laisser aucun champs vide"
      },
      fieldValide_toast: {
        snackbar: false,
        text: "Votre compte a bien été mis à jour"
      },
      id: ""
    };
  },
  mounted() {
    this.profil();
  },
  methods: {
    async profil() {
      this.display = true;
      const getToken = localStorage.getItem("x-access-token");
      const getUser = await axios.get(
        "https://server-api-pizzago.herokuapp.com/api/v1/admin/user/currentUser",
        { headers: { "x-access-token": getToken } }
      );
      const getUserObject = getUser.data.result.users[0];
      this.id = getUserObject.id;
      delete getUserObject.id;
      this.userInformation = getUserObject;
    },
    async updateProfil(e) {
      e.preventDefault();

      const headers = {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token")
        }
      };

      const userObject = {
        city: e.target[0].value,
        tel: e.target[1].value,
        zip: e.target[2].value,
        email: e.target[3].value,
        firstname: e.target[4].value,
        lastname: e.target[5].value,
        address: e.target[6].value,
        id: this.id
      };

      if (!this.checkInputEmpty(userObject)) {
        userObject.zip = parseInt(userObject.zip, 10);
        const updateUser = await axios.put(
          "https://server-api-pizzago.herokuapp.com/api/v1/admin/user/updateCurrentUser",
          userObject,
          headers
        );
        this.fieldValide_toast.snackbar = true;
        setTimeout(() => (this.display = false), 2000);
      }
    },
    checkInputEmpty(userObject) {
      for (let element in userObject) {
        if (
          userObject[element].trim() === null ||
          userObject[element].trim() === "" ||
          userObject[element].trim() === undefined
        ) {
          this.field_toast.snackbar = true;
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style>
.edit_btn {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;
}
</style>

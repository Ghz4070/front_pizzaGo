<template>
  <div>
    <div class="hidden-mobile">
      <div class="d-flex flex-wrap flex-row justify-space-between align-center">
        <img src="~/static/PizzaGo_final.png" height="150" width="150" />
        <nav class="navigation d-flex flex-row flex-wrap align-center">
          <template v-if="img">
            <nuxt-link to="/">Accueil</nuxt-link>
            <nuxt-link to="/order">Commander</nuxt-link>
            <nuxt-link v-if="admin" to="/admin">Admin</nuxt-link>
            <nuxt-link to="/contact">Contact</nuxt-link>
            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <img src="~/static/user.svg" height="30" width="30" v-bind="attrs" v-on="on" />
                </template>
                <v-list>
                  <v-list-item @click.stop="profil">
                    <v-list-item-title>Profil</v-list-item-title>
                  </v-list-item>
                  <v-dialog v-model="display" max-width="400">
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
                          <button>yes</button>
                        </v-form>
                      </template>
                       <v-snackbar v-model="fieldValide_toast.snackbar">
                              {{ fieldValide_toast.text }}
                              <template v-slot:action="{ attrs }">
                                <v-btn
                                  color="pink"
                                  text
                                  v-bind="attrs"
                                  @click="fieldValide_toast.snackbar = false"
                                >X</v-btn>
                              </template>
                            </v-snackbar>
                      <v-snackbar v-model="field_toast.snackbar">
                        {{ field_toast.text }}
                        <template v-slot:action="{ attrs }">
                          <v-btn
                            color="pink"
                            text
                            v-bind="attrs"
                            @click="field_toast.snackbar = false"
                          >X</v-btn>
                        </template>
                      </v-snackbar>
                    </v-card>
                  </v-dialog>
                  <v-list-item @click="deconnection">
                    <v-list-item-title>Déconnection</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
          <template v-else>
            <nuxt-link to="/">Accueil</nuxt-link>
            <nuxt-link to="/login">Connexion</nuxt-link>
            <nuxt-link to="/inscription">Inscription</nuxt-link>
            <nuxt-link to="/order">Commander</nuxt-link>
            <nuxt-link to="/contact">Contact</nuxt-link>
          </template>
        </nav>
      </div>
    </div>
    <div class="only-mobile">
      <nav class="navigation d-flex flex-row flex-wrap align-center">
        <v-row justify="space-between">
          <v-col md="2">
            <div class="icon-menu">
              <img src="~/static/PizzaGo_final.png" height="90" width="90" />
            </div>
          </v-col>
          <v-col md="2">
            <div class="hamburger-menu">
              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <img v-bind="attrs" v-on="on" src="~/static/menu.png" height="25" width="25" />
                </template>
                <v-card>
                  <v-btn class="close-btn" icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-list three-line subheader>
                    <template v-if="img">
                      <div @click="dialog = false" class="mobile-menu">
                        <nuxt-link to="/">Accueil</nuxt-link>
                        <nuxt-link v-if="admin" to="/admin">Admin</nuxt-link>
                        <nuxt-link to="/order">Commander</nuxt-link>
                        <a @click.stop="profil">
                          Profile
                        </a>
                        <v-dialog v-model="display" max-width="400">
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

                                <button>yes</button>
                              </v-form>
                            </template>
                            <v-snackbar v-model="fieldValide_toast.snackbar">
                              {{ fieldValide_toast.text }}
                              <template v-slot:action="{ attrs }">
                                <v-btn
                                  color="pink"
                                  text
                                  v-bind="attrs"
                                  @click="fieldValide_toast.snackbar = false"
                                >X</v-btn>
                              </template>
                            </v-snackbar>
                            <v-snackbar v-model="field_toast.snackbar">
                              {{ field_toast.text }}
                              <template v-slot:action="{ attrs }">
                                <v-btn
                                  color="pink"
                                  text
                                  v-bind="attrs"
                                  @click="field_toast.snackbar = false"
                                >X</v-btn>
                              </template>
                            </v-snackbar>
                          </v-card>
                        </v-dialog>
                        <nuxt-link to="/contact">Contact</nuxt-link>
                        <button @click="deconnection">Déconnexion</button>
                      </div>
                    </template>
                    <template v-else>
                      <div @click="dialog = false" class="mobile-menu">
                        <nuxt-link to="/">Accueil</nuxt-link>
                        <nuxt-link to="/order">Commander</nuxt-link>
                        <nuxt-link to="/login">Connexion</nuxt-link>
                        <nuxt-link to="/inscription">Inscription</nuxt-link>
                        <nuxt-link to="/contact">Contact</nuxt-link>
                      </div>
                    </template>
                  </v-list>
                  <div class="center">
                    <img src="~/static/PizzaGo_final.png" height="150" width="150" />
                  </div>
                </v-card>
              </v-dialog>
            </div>
          </v-col>
        </v-row>
      </nav>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../bus.js";
import KJUR from "jsrsasign";
import axios from "axios";

export default {
  data() {
    return {
      img: "",
      admin: false,
      dialogFullScreen: false,
      dialog: false,
      display: false,
      userInformation: {},
      id: "",
      field_toast: {
        snackbar: false,
        text: "Veuillez laisser aucun champs vide"
      },
      fieldValide_toast: {
        snackbar: false,
        text: "Votre compte a bien été mis à jour"
      }
    };
  },
  created() {
    EventBus.$on("setHeader", data => {
      this.checkStorage();
    });
  },
  mounted() {
    this.checkStorage();
    this.checkAdmin();
  },
  methods: {
    checkStorage() {
      if (localStorage.getItem("x-access-token") && this.checkTokenSession()) {
        this.img = true;
      } else {
        this.img = false;
      }
    },
    checkTokenSession() {
      const getToken = localStorage.getItem("x-access-token");
      const secret = process.env.SECRET;
      const algo = { alg: [process.env.ALGO] };
      const checkToken = KJUR.jws.JWS.verifyJWT(getToken, secret, algo);

      if (checkToken) {
        return true;
      } else {
        return false;
      }
    },
    deconnection() {
      localStorage.removeItem("x-access-token");
      if (this.$router.app._route !== "/") {
        this.$router.push({ name: "index" });
        setTimeout(() => location.reload(true), 50);
      } else {
        location.reload(true);
      }
    },
    async profil() {
      this.display = true;
      const getToken = localStorage.getItem("x-access-token");
      const getUser = await axios.get(
        "http://localhost:4000/api/v1/admin/user/currentUser",
        { headers: { "x-access-token": getToken } }
      );
      const getUserObject = getUser.data.result.users[0];
      this.id = getUserObject.id;
      delete getUserObject.id;
      this.userInformation = getUserObject;
    },

    async checkAdmin() {
      const getToken = localStorage.getItem("x-access-token");
      const check = await axios.get(
        "http://localhost:4000/api/v1/user/checkuser",
        { headers: { "x-access-token": getToken } }
      );
      (check.data).forEach(el => {
        el == 'ROLE_ADMIN' ? this.admin = true : '';
      });
      
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
          "http://localhost:4000/api/v1/admin/user/updateCurrentUser",
          userObject,
          headers
        );
        this.fieldValide_toast.snackbar = true;
        setTimeout(() => this.display = false, 2000);
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
.navigation a {
  padding: 10px 10px;
  margin: 0px 10px;
  text-decoration: none;
  color: black;
  border: 1px solid #979797;
  border-radius: 10px;
  background-color: white;
}

.navigation a:hover {
  background-color: #979797;
  color: white;
}

.hamburger-menu {
  text-align: right;
  margin-top: 28px;
}
.hamburger-menu:hover {
  filter: invert(100%);
}

.desktop-menu {
  display: grid;
  text-align: center;
  font-size: 30px;
  margin: 30%;
}

.desktop-menu a, p
button {
  padding: 20px 0 0 0;
  text-decoration: none;
  color: #8c5b38;
}

.mobile-menu {
  display: grid;
  text-align: center;
  font-size: 26px;
}
.mobile-menu a,
button {
  padding: 20px 0 0 0;
  text-decoration: none;
  color: #8c5b38;
}
.center {
  text-align: center;
}
.icon-menu {
  text-align: left;
}
.v-btn__content {
  color: black;
}

.close-btn {
  display: block;
  margin-left: auto;
  padding: 10px 20px 0 0;
}
</style>

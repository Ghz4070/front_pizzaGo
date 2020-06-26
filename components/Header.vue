<template>
  <div>
    <div class="hidden-mobile">
      <div class="d-flex flex-wrap flex-row justify-space-between align-center">
        <img src="~/static/PizzaGo_final.png" height="150" width="150" />
        <nav class="navigation d-flex flex-row flex-wrap align-center">
          <template v-if="img">
            <nuxt-link to>Commander</nuxt-link>
            <nuxt-link to>Contact</nuxt-link>
            <img src="~/static/user.svg" height="30" width="30" />
          </template>
          <template v-else>
            <nuxt-link to="/">Accueil</nuxt-link>
            <nuxt-link to="login">Connexion</nuxt-link>
            <nuxt-link to>Inscription</nuxt-link>
            <nuxt-link to>Commander</nuxt-link>
            <nuxt-link to>Contact</nuxt-link>
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
                        <nuxt-link to>Commander</nuxt-link>
                        <nuxt-link to>Contact</nuxt-link>
                      </div>
                      <img src="~/static/user.svg" height="30" width="30" />
                    </template>
                    <template v-else>
                      <div @click="dialog = false" class="mobile-menu">
                        <nuxt-link to="/">Accueil</nuxt-link>
                        <nuxt-link to="login">Connexion</nuxt-link>
                        <nuxt-link to>Inscription</nuxt-link>
                        <nuxt-link to>Commander</nuxt-link>
                        <nuxt-link to>Contact</nuxt-link>
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
export default {
  data() {
    return {
      img: "",
      dialog: false,
    };
  },
  mounted() {
    console.log(localStorage.getItem('x-access-token'))
        if(localStorage.getItem('x-access-token')){
      this.img = true;
    } else {
      this.img = false;
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
.mobile-menu {
  display: grid;
  text-align: center;
  font-size: 26px;
}
.mobile-menu a {
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

/** ----!!----> 
 MOBILE RESPONSIVE
<----!!---- **/

@media only screen and (max-device-width: 640px) {
  .hidden-mobile {
    display: none !important;
  }
}

@media only screen and (min-device-width: 640px) {
  .only-mobile {
    display: none !important;
  }
}

/** ----!!----> 
   MOBILE RESPONSIVE
  <----!!---- **/
</style>
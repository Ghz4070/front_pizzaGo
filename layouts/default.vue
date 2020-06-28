<template>
  <v-app dark>
    <v-main>
      <v-container fluid>
        <Header />
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

html,
body,
#__nuxt,
#__layout,
#app {
  margin: O;
  color: black;
  background-color: #f0f2f6;
  width: 100%;
  height: 100%;
}
.container {
  padding: 0 40px;
}
.pacifico-font {
  font-family: "Pacifico", cursive;
}
.cursive-font {
  font-family: cursive;
}
.border-radius30 {
  border-radius: 30px;
}
.v-text-field .v-input__append-inner {
  margin-top: -2px !important;
}
</style>

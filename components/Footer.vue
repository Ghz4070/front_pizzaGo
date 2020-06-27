<template>
<v-footer
    dark
    padless
    class="footer-container"
  >
    <v-card
      flat
      tile
      class="lighten-1 white--text text-center footer-card"
      
    >
      <v-card-text class="white--text pt-0 footer">
        <a href=''>MENTIONS LEGALES</a>
        <a href=''>CONDITIONS GENERALES DE VENTE</a>
        <a href=''>PARAMÈTRES DES COOKIES</a>
        <a href=''>PLAN DU SITE  </a>
        <a href=''></a>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text foot-text">
        {{ new Date().getFullYear() }} — <strong>PizzaGo</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: function() {
    return {
    };
  },
  async mounted() {},
  methods: {
    
  }
};
</script>

<style>
.footer {
  margin-top: 15px;
  font-family: cursive !important;
}
.footer-card {
  width: 100%;
}
.footer-container {
  margin-top: 50px;
}
.footer a {
  margin: 0 10px;
}
.v-card__text.foot-text {
    padding: 0 16px 5px 16px;
} 
</style>
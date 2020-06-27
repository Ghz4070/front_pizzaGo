<template>
  <v-footer padless class="footer-container">
    <v-card flat tile class="lighten-1 text-center footer-card">
      <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>

      <v-card-text class="black--text pt-0 footer">
        <a href>MENTIONS LEGALES</a>
        <a href>CONDITIONS GENERALES DE VENTE</a>
        <a href>PARAMÈTRES DES COOKIES</a>
        <a href>PLAN DU SITE</a>
        <a href></a>
      </v-card-text>

      
<v-divider></v-divider>
      <v-card-text class="black--text foot-text">
        {{ new Date().getFullYear() }} —
        <strong>PizzaGo</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: function() {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    };
  },
  async mounted() {},
  methods: {}
};
</script>

<style>
.footer {
  margin-top: 15px;
  font-family: cursive !important;
}
.footer-card {
  width: 100%;
  padding-top: 15px;
  box-shadow: -1px 2px 5px 1px rgba(0,0,0,.7);
}
.footer-container {
  margin-top: 50px;
}
.footer a {
  margin: 0 10px 10px 10px;
  display: inline-table;

}
.v-card__text.foot-text {
  padding: 0 16px 5px 16px;
}

.v-sheet.v-footer:not(.v-sheet--outlined).footer-container {
    box-shadow: -1px 2px 5px 1px rgba(0,0,0,.7);
}
</style>
<template>
      <v-row>
            <v-col cols="12" sm="12" md="12">
      <v-card class="mx-auto" outlined>
        <v-card-text>
          <h3 class="center contact_title">CONTACTEZ NOUS PIZZAGO</h3>
          <div class="mtop mbot">Vous avez des questions, des remarques ? Vous pouvez contacter notre service consommateurs :</div>
          <ul>
            <li>par mail à <a href="mailto:service.consommateurs@pizzago.fr">service.consommateurs@pizzago.fr</a></li>
            <li>par téléphone au 0825 025 025 (0.20€/min)</li>
            <li>Ce service est ouvert du lundi au dimanche de 10h à 23h.</li>
          </ul>
          <div class="mtop mbot">
            Pour toute question concernant une commande en cours, merci de contacter directement le PizzaGo concerné.<br> 
            Retrouvez les coordonnées des PizzaGo sur nos réseaux sociaux : PizzaGo Officiel
          </div>
        </v-card-text>
      </v-card>
            </v-col>
      </v-row>
</template>

<script>
import axios from "axios";

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
.contact_title {
  margin-top: 35px;
  font-size: 20px;
}
.center {
  text-align: center;
  display: block !important;
  margin-left: auto;
  margin-right: auto;
}
.mtop {
  margin-top: 25px;
}
.mbot {
  margin-bottom: 25px;
}
</style>
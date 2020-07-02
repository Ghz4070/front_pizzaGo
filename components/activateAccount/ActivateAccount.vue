<template>
  <v-container>
    <h1>{{msg}}</h1>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  async mounted() {
    this.activate();
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    async activate() {
      let route = this.removeSlash();
      const activateAccount = await axios.get(
        `http://localhost:4000/api/v1/user/activateAccount/${route}`
      );
      if (activateAccount.data.status === "error") {
        this.msg = "error token";
        setTimeout(() => {
          this.$router.push({ name: "index" });
        }, 1500);
      } else {
        this.msg =
          "Votre compte a bien été activé. Vous allez être redirectionné dans quelque instant";
        setTimeout(() => {
          this.$router.push({ name: "index" });
        }, 1500);
      }
    },
    removeSlash() {
      let rt = this.$route.query.token.toString();
      return rt.split("/").join("");
    }
  }
};
</script>

<style>
</style>

<template>
  <v-container fluid>
    <!-- <v-row>
      <AddUser />
    </v-row>-->
    <div v-for="(user, index) in users" :key="index">
      <EditUser :user="user" />
    </div>
  </v-container>
</template>

<script>
import EditUser from "./EditUser";

export default {
  name: "User",
  components: {
    EditUser
  },
  data() {
    return {
      users: Object
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await this.$axios.get(
          "https://server-api-pizzago.herokuapp.com/api/v1/admin/user",
          {
            headers: {
              "x-access-token": localStorage.getItem("x-access-token")
            }
          }
        );
        this.users = response.data.result;
        return this.users;
      } catch (error) {
        console.log(error); // catches both errors
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <v-container fluid>
    <!-- <v-row>
      <AddUser />
    </v-row>-->
    <v-row>
      <!-- v-for="(user, index) in users" :key="index" -->
      <v-col v-for="(item, index) in 5" :key="index" cols="12">
        <v-skeleton-loader
          v-if="loading"
          class="mt-6"
          elevation="6"
          type="list-item-avatar-two-line"
          transition="scale-transition"
        ></v-skeleton-loader>

        <v-expansion-panels v-else popout inset multiple focusable hover>
          <v-expansion-panel>
            <v-expansion-panel-header>User</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-row>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field clearable append-outer-icon="mdi-account" label="Nom"></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field clearable append-outer-icon="mdi-account" label="Prenom"></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field clearable append-outer-icon="mdi-map" label="Adresse"></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field clearable append-outer-icon="mdi-map" label="Code postal"></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field clearable append-outer-icon="mdi-map-marker" label="Ville"></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field
                      clearable
                      append-outer-icon="mdi-cellphone-iphone"
                      label="Telephone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field clearable append-outer-icon="mdi-at" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field clearable append-outer-icon="mdi-pencil" label="Roles"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <v-pagination
          v-model="page"
          length="10"
          :next-icon="nextIcon"
          :prev-icon="prevIcon"
          :page="page"
          :total-visible="totalVisible"
        ></v-pagination>
      </v-col>
    </v-row>-->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      users: [],
      // length: 10,
      // page: 1,
      // totalVisible: 10,
      // nextIcon: "navigate_next",
      // prevIcon: "navigate_before"
    };
  },
  mounted() {
    // this.getUsers();
    // if (this.users != 0) {
    //   setTimeout(() => {
    //     this.loading = false;
    //   }, 750);
    // } else {
    //   alert("Erreur de chargement");
    // }
  },
  methods: {
    async getUsers() {
      return await this.$axios
        .get("http://localhost:4000/api/v1/user")
        .then(res => {
          this.users = res.data.result;
          console.log(users);
        })
        .catch(e => {
          console.log("catch");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

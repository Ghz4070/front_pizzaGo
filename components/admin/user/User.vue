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
                    <v-text-field
                      clearable
                      v-model="params.lastname"
                      append-outer-icon="mdi-account"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field
                      clearable
                      v-model="params.firstname"
                      append-outer-icon="mdi-account"
                      label="Prenom"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field
                      clearable
                      v-model="params.address"
                      append-outer-icon="mdi-map"
                      label="Adresse"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field
                      clearable
                      v-model="params.zip"
                      append-outer-icon="mdi-map"
                      label="Code postal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field
                      clearable
                      v-model="params.city"
                      append-outer-icon="mdi-map-marker"
                      label="Ville"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field
                      clearable
                      v-model="params.tel"
                      append-outer-icon="mdi-cellphone-iphone"
                      label="Telephone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-text-field
                      clearable
                      v-model="params.email"
                      append-outer-icon="mdi-at"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xl="3" lg="4" md="6">
                    <v-select
                      clearable
                      v-model="params.roles"
                      :items="params.roles"
                      chips
                      multiple
                      dense
                      prepend-icon="mdi-pencil"
                      label="Roles"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-row align="end" justify="end">
                <v-btn color="blue darken-1" class="ma-2" text>Sauvegarder</v-btn>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      users: Object,
      params: {
        id: null,
        firstname: null,
        lastname: null,
        address: null,
        zip: null,
        city: null,
        tel: null,
        email: null,
        roles: [],
      }
    };
  },
  mounted() {
    this.getUsers();

    if (this.users != 0) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    } else {
      alert("Erreur de chargement");
    }
  },
  methods: {
    async getUsers() {
      return await this.$axios
        .get("http://localhost:4000/api/v1/user/", {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token")
          }
        })
        .then(res => {
          this.users = res.data.result;
          console.log(users);
        })
        .catch(e => {
          console.log("catch");
        });
    },
    getDatas() {
      console.log(this.users);
      this.params = {
        id: this.users.id,
        firstname: this.users.firstname,
        lastname: this.users.lastname,
        address: this.users.address,
        zip: this.users.zip,
        city: this.users.city,
        tel: this.users.tel,
        email: this.users.email,
        roles: [this.users.role]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

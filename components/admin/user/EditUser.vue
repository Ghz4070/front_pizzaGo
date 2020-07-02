<template>
  <v-row>
    <v-col cols="12">
      <v-skeleton-loader
        v-if="loading"
        class="mt-6"
        elevation="6"
        type="list-item-avatar-two-line"
        transition="scale-transition"
      ></v-skeleton-loader>
      <v-expansion-panels v-else popout inset multiple focusable hover>
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{
            params.firstname
            }}
          </v-expansion-panel-header>
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
                    :items="items"
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
              <v-btn outlined color="green" class="ma-1" @click="updateUser(user.id)">Sauvegarder</v-btn>
              <v-btn outlined color="red" class="ma-1" @click="deleteUser(user.id)">Supprimer</v-btn>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "EditUser",
  data() {
    return {
      loading: true,
      items: ["ROLE_USER", "ROLE_ADMIN"],
      params: {
        // id: null,
        firstname: null,
        lastname: null,
        address: null,
        zip: null,
        city: null,
        tel: null,
        email: null
        // roles: []
      }
    };
  },
  props: {
    user: Object
  },
  mounted() {
    this.getDatas();

    if (this.user != 0) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    } else {
      alert("Erreur de chargement");
    }
  },
  methods: {
    getDatas() {
      this.params = {
        // id: this.user.id,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        address: this.user.address,
        zip: Number(this.user.zip),
        city: this.user.city,
        tel: this.user.tel,
        email: this.user.email
        // roles: this.user.role
      };
    },
    async deleteUser(id) {
      try {
        const response = await this.$axios.delete(
          `https://server-api-pizzago.herokuapp.com/api/v1/admin/user/delete/${id}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("x-access-token")
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser(id) {
      try {
        const response = await this.$axios.put(
          `https://server-api-pizzago.herokuapp.com/api/v1/admin/user/update/${id}`,
          this.params,
          {
            headers: {
              "x-access-token": localStorage.getItem("x-access-token")
            }
          }
        );

        this.params = response.data.result;
        return this.params;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

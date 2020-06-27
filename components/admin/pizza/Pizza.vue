<template>
  <v-container fluid>
    <v-row>
      <AddPizza />
    </v-row>
    <v-row dense>
      <v-col v-for="(pizza, index) in pizzas" :key="index" cols="4">
        <v-card outlined class="ma-3 pa-3 card_pizza" elevation="6" max-width="400">
          <v-img
            :src="pizza.img"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="pizza.name"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <EditPizza :dataPizza="pizza" />

            <v-btn icon class="ml-3">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddPizza from "@/components/admin/pizza/AddPizza";
import EditPizza from "@/components/admin/pizza/EditPizza";
import axios from "axios";

export default {
  components: {
    AddPizza,
    EditPizza,
  },
  data: () => {
    return {
      pizzas: [],
      categories: null
    };
  },
  //  async asyncData ({ params }) {
  //   const { data } = await axios.get(`https://my-api/posts/${params.id}`)
  //   return { title: data.title }
  // },
  async mounted() {
    await this.getCategories();
    await this.getPizzas();
    this.formatDatas(this.pizzas);
    // console.log(this.pizzas);
  },
  methods: {
    getPizzas() {
      return axios
        .get(`http://localhost:4000/api/v1/pizza`)
        .then(res => {
          this.pizzas = res.data.result;
        })
        .catch(e => {
          console.log("catch");
        });
    },
    formatDatas: function(pizzas) {
      this.pizzas = [];
      pizzas.forEach(element => {
        let el = Object.assign(element, this.add);
        this.pizzas = [...this.pizzas, el];
      });
    },
    getCategories() {
      return axios
        .get(`http://localhost:4000/api/v1/category`)
        .then(res => {
          this.categories = res.data.result;
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

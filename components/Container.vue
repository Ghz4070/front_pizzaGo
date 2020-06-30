<template>
  <div>
    <header class="banner cursive-font">
      <div class="banner__overlay">
        <div class="banner__container">
          <h1 class="banner__hero">PizzaGo</h1>
          <p class="banner__text">Obtenez la pizza la plus délicieuse de tous les temps!</p>
          <div>
            <nuxt-link to='/order' class="button button--primary">Commander maintenant 🍕</nuxt-link>
          </div>
        </div>
      </div>
    </header>

    <!-- content -->
    <main>
      <section class="welcome">
        <h2 class="cursive-font center top_title">Bienvenue <br>chez PizzaGo</h2>
        <img class="home_img" src="~/static/pizzago_home.png" />
        <p class="home_resume">
          La qualité étant au centre de nos préoccupations, chez PizzaGo nous faisons
          <br />des pizzas pour tout
          le monde mais pas comme tout le monde !
        </p>
        <div class="content_img">
          <img elevation="5" class="separate_img" src="https://fivepizzaoriginal.com/pub/media/wysiwyg/Pizza-originale.jpg" >
        </div>
        <h2 class="cursive-font center top_title">Notre enseigne</h2>
        <v-row>
          <v-col cols="12" sm="12" md="4">
            <v-card class="mx-auto" max-width="400" min-height="400">
              <v-img class="white--text align-end"  :src="firstImg">
              </v-img>
              <v-card-subtitle class="pb-0 center home_title">La pizza au four à bois est le meilleur</v-card-subtitle>
              <v-card-text class="text--primary">
                <div>La qualité étant au centre de nos préoccupations, chez PizzaGo nous faisons des pizzas pour
                   tout le monde mais pas comme tout le monde !</div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="12" md="4">
            <v-card class="mx-auto" max-width="400" min-height="400">
              <v-img class="white--text align-end"  :src="secondImg">
              </v-img>
              <v-card-subtitle class="pb-0 center home_title">Une pâte fraiche</v-card-subtitle>
              <v-card-text class="text--primary">
                <div>Nous élaborons la pâte à pizza dans nos propres ateliers de fabrication et 
                  livrons nos magasins plusieurs fois par semaine afin de garantir un produit de qualité optimale. 
                  Notre pâte est ainsi garantie fraîche et jamais congelée !</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-card class="mx-auto" max-width="400" min-height="400">
              <v-img class="white--text align-end"  :src="thirdImg">
              </v-img>
              <v-card-subtitle class="pb-0 center home_title">Une préparation à la commande </v-card-subtitle>
              <v-card-text class="text--primary">
                <div>Aujourd'hui comme hier, nous faisons nos pizzas à la main et à la commande. Nos cuisines ouvertes 
                  permettent à nos clients de voir 100% du processus de fabrication de nos pizzas, afin de garantir une 
                  transparence totale !</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
         
           <v-divider style="margin-top:25px"></v-divider>

        <v-row>
          <v-col cols="12" sm="12" md="2">
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <h3 class="cursive-font center mobile_info">L'application PizzaGo bientot disponible sur vos mobiles.</h3>
            <div>
              <p>Parce que vous nous l'avez réclamé. Grâce à notre communauté vous allez gagner du temps.</p>
              <ul>
                <li>Commander en quelques étapes</li>
                <li>Récolter des points fidélités</li>
                <li>Soyez informé des offres promotionnelles</li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <img class="responsive-img" src="https://www.servicesmobiles.fr/wp-content/uploads/2018/04/app-store-download_IOS-APPSTORE.jpg">
          </v-col>
        </v-row>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstImg: require("~/static/first.jpg"),
      secondImg: require("~/static/second.jpg"),
      thirdImg: require("~/static/third.jpg")
    };
  },
  async mounted() {},
  methods: {}
};
</script>

<style>
.responsive-img {
  width: 250px;
  max-width: 100%;
  height: auto;
  filter: drop-shadow(2px 4px 6px black);
  margin-top: 25px;
}
.mobile_info {
  margin: 25px 0;
}
.separate_img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}
.content_img {
  box-shadow: -1px 2px 5px 1px rgba(0,0,0,.7);
  height: 463px;
}
.top_title {
  font-size: 34px;
  color: #f6ac00;
  margin: 25px;
}
.home_title {
  font-size: 16px;
  margin: 5px 0 15px 0;
}
.banner {
  box-shadow: -1px 2px 5px 1px rgba(0,0,0,.7);
  position: relative;
  width: 100%;
  height: 500px;
  background: url(https://static.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg)
    no-repeat 50% 30%;
  background-size: 100%;
  margin-bottom: 20px;
  -webkit-animation: background linear 12s alternate 1s infinite;
  animation: background linear 12s alternate 1s infinite;
}
.banner__overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.banner__container {
  position: relative;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  top: 50%;
  text-align: center;
  color: #fff;
}

.banner__hero {
  font-weight: 300;
  font-size: 3em;
  text-align: center;
  color: #fff;
  margin-bottom: 5px;
}

.banner__text {
  margin: 0 0 15px 0;
}

@-webkit-keyframes background {
  0% {
    background: url(https://static.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg)
      no-repeat 50% 30%;
    background-size: 100%;
    -webkit-transition: background 0.5s ease-in-out;
    transition: background 0.5s ease-in-out;
  }
  100% {
    background: url(https://static.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg)
      no-repeat 50% 60%;
    background-size: 100%;
    -webkit-transition: background 0.5s ease-in-out;
    transition: background 0.5s ease-in-out;
  }
}

@keyframes background {
  0% {
    background: url(https://static.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg)
      no-repeat 50% 30%;
    background-size: 100%;
    -webkit-transition: background 0.5s ease-in-out;
    transition: background 0.5s ease-in-out;
  }
  100% {
    background: url(https://static.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg)
      no-repeat 50% 60%;
    background-size: 100%;
    -webkit-transition: background 0.5s ease-in-out;
    transition: background 0.5s ease-in-out;
  }
}
.home_resume {
  text-align: center;
  font-size: 20px;
}

@media all and (max-width: 980px) {
  .banner {
    padding-top: 0;
  }
}
.button {
  display: inline-block;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-radius: 4px;
  padding: 10px 15px;
  background-color: #eee;
  text-decoration: none;
  color: #333;
  -webkit-transition: background-color 0.5s ease;
  transition: background-color 0.5s ease;
}
.button:hover,
.button:active {
  color: #fff;
  background-color: #6f6f6f;
  -webkit-transition: background-color 0.5s ease;
  transition: background-color 0.5s ease;
}
.button--primary {
  background-color: #f0f2f6;
  color: #fff;
}
.button--primary:hover,
.button--primary:active {
  background-color: #ac1920;
  color: #eee;
}

.home_img {
  width: 100%;
}
</style>
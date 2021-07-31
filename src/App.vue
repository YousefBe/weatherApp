<template>
  <div class="main h-screen max-w-5xl mx-auto">
    <Navbar/>
    <router-view :cities="cities" />
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "./components/Navbar.vue";
import db from "./firebase/config";
export default {
  name: "App",
  components:{
    Navbar
  },
  data() {
    return {
      apiKey: "0a70e995a8bdbec04b61327a53b9ccbe",
      cities: [],
    };
  },
  created() {
    this.getCityWeather();
  },
  methods: {
    getCityWeather() {
      let firebaseDb = db.collection("cities");
      firebaseDb.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added") {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=metric&APPID=${this.apiKey}`
              );
              const data = response.data;
              firebaseDb
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                })
            } catch (error) {
              console.log(error);
            }
          }
        });
      });
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
</style>

<template>
  <router-view />
</template>
<script>
import axios from "axios";
import db from "./firebase/config";
export default {
  name: "App",
  data() {
    return {
      apiKey: "0a70e995a8bdbec04b61327a53b9ccbe",
      city: "aswan",
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
                `https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=imperial&APPID=${
                  this.apiKey
                }`
              );
              const data = response.data;
              firebaseDb.doc(doc.doc.id).update({
                currentWeather:data
              }).then(()=>{
                this.cities.push(doc.doc.data());
              }).then(()=>{
                console.log(this.cities);
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

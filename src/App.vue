<template>
  <div class="w-full bg-gray-900">
    <div class="main h-auto max-w-5xl mx-auto">
      <div v-if="isLoading" class="loading">
        <Loading />
      </div>
      <div v-else class="app">
        <Modal
          v-if="modalOpen"
          @close-modal="toggleModal"
          :apiKey="apiKey"
          :cities="cities"
        />
        <Navbar
          @toggleModal="toggleModal"
          @editCity="toggleEdit"
          :addingCity="addingCity"
          :isDay="isDay"
          :isNight="isNight"
        />
        <router-view
          :cities="cities"
          :edit="edit"
          :apiKey="apiKey"
          @day-time="dayTime"
          @night-time="nightTime"
          @resetDays="resetDays"
          :isDay="isDay"
          :isNight="isNight"
          @toggleModal="toggleModal"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "./components/Navbar.vue";
import Modal from "./components/Modal.vue";
import Loading from "./components/Loading.vue";
import db from "./firebase/config";
export default {
  name: "App",
  components: {
    Navbar,
    Modal,
    Loading,
  },
  data() {
    return {
      apiKey: "0a70e995a8bdbec04b61327a53b9ccbe",
      cities: [],
      modalOpen: false,
      edit: false,
      addingCity: false,
      isDay: false,
      isNight: false,
      isLoading: true,
    };
  },
  created() {
    this.checkRoute();
    this.getCityWeather();
  },
  methods: {
    getCityWeather() {
      this.isLoading = true;
      let firebaseDb = db.collection("cities");
      firebaseDb.onSnapshot((snap) => {
        if (snap.docs.length === 0) {
          this.isLoading= false;
        }
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added" && !doc.doc.Nd) {
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
                  this.isLoading = false;
                });
            } catch (error) {
              console.log(error);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if (doc.type === "removed") {
            console.log(doc.doc.data().city);
            this.cities = this.cities.filter(
              (city) => city.city !== doc.doc.data().city
            );
          }
        });
      });
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    checkRoute() {
      if (this.$route.name === "AddCity") {
        this.addingCity = true;
      } else {
        this.addingCity = false;
      }
    },
    dayTime() {
      this.isNight=false
      this.isDay = true;
    },
    nightTime() {
      this.isDay=false
      this.isNight = true;
    },
    resetDays() {
      this.isNight = false 
      this.isNight = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
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
.day {
  transition: 500ms ease all;
  background-color: rgb(59, 150, 249);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.night {
  transition: 500ms ease all;
  background-color: rgb(20, 42, 95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>

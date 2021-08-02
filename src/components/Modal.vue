<template>
  <div
    @click="toggleModal"
    class="
      modal
      z-30
      bg-black bg-opacity-50
      fixed
      w-full
      left-0
      h-full
      flex
      justify-center
      items-center
    "
    ref="modal"
  >
    <div
      class="modal-wrap max-w-lg rounded-lg w-4/5 p-5 bg-gray-800 shadow-md"
      ref="modal-wrap"
    >
      <label
        class="font-semibold capitalize tracking-wider text-white"
        for="city-name"
        >Enter city name:</label
      >
      <input
        class="
          text-white
          bg-transparent
          border-b border-solid
          py-2
          px-1
          w-full
          mt-2
          mb-5
          focus:outline-none
        "
        :class="{ 'border-red-600': errorMessage }"
        type="text"
        name="city-name"
        placeholder="Search by city name"
        v-model="city"
      />
      <p v-if="errorMessage" class="font-bold text-base text-red-600 mb-2">
        {{ errorMessage }}
      </p>

      <button
      @click="addCity"
        class="
          bg-gray-800
          text-white
          py-2
          px-5
          rounded-lg
          border-none
          shadow-md
          focus:bg-gray-800
        "
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "../firebase/config";
export default {
  name: "modal",
  props: ["apiKey", "cities"],
  data() {
    return {
      city: "",
      errorMessage: "",
    };
  },
  methods: {
    toggleModal(e) {
      if (e.target === this.$refs.modal) {
        this.$emit("close-modal");
      }
    },
    async addCity() {
      if (this.city === "") {
        this.errorMessage = "You must Enter a city name";
      } else if (
        this.cities.some((res) => res.city === this.city.toLowerCase())
      ) {
        alert(`${this.city} already exists`);
      } else {
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${this.apiKey}`
          );
          const data = await res.data;
          db.collection("cities")
            .doc()
            .set({
              city: this.city,
              currentWeather: data,
            })
            .then(() => {
              this.$emit("close-modal");
            });
        } catch {
          alert(
            `${this.city} doesn't exist , please enter a correct city name`
          );
        }
      }
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="city-weather mt-24 border-b border-solid border-white">
    <div class="my-8 relative flex text-white" style="min-height: 366px">
      <div class="weather-info pt-8 flex-1">
        <span class="city block text-2xl font-medium">{{
          currentWeather.name
        }}</span>
        <span class="current-temp block mt-10 text-7xl font-semibold"
          >{{ formatedTemp }}&deg;</span
        >
        <div class="high-low-temps flex gap-4">
          <div class="high flex">
            <i class="fas fa-chevaron-up"></i>
            <span class="ml-2 block">{{ maxTemp }}</span>
          </div>
          <div class="low flex">
            <i class="fas fa-chevaron-down"></i>
            <span class="ml-2 block">{{ minTemp }}</span>
          </div>
        </div>
        <span
          class="condition capitalize text-2xl font-medium mt-14 mb-2 block"
          >{{ description }}</span
        >
        <span class="feels-like block font-normal text-sm"
          >Feels like {{ feelsLike }}&deg;</span
        >
      </div>

      <div
        class="weather-icon h-full absolute flex items-center"
        style="right: -180px"
      >
        <img class="w-80" v-if="isDay" src="../../public/sun.png" alt="" />
        <img class="w-80" v-if="isNight" src="../../public/moon.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CityWeather",
  props: ["currentWeather", "isDay", "isNight"],
  computed: {
    formatedTemp() {
      return Math.round(this.currentWeather.main.temp);
    },
    maxTemp() {
      return Math.round(this.currentWeather.main.temp_max);
    },
    minTemp() {
      return Math.round(this.currentWeather.main.temp_min);
    },
    description() {
      return this.currentWeather.weather[0].description;
    },
    feelsLike() {
      return Math.round(this.currentWeather.main.feels_like);
    },
  },
};
</script>

<style>
</style>
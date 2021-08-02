<template>
  <div class="DailyForecast flex items-center justify-between text-white">
    <div class=" flex-1">
      <span class=" text-base font-semibold">{{ formatedDate }}</span>
    </div>
    <div class="condition flex justify-center items-center flex-1">
      <img  class="w-5"
        :src="require(`../../public/conditions/${this.day.weather[0].icon}.svg`)"
        alt=""
      />
    </div>
    <div class="weather flex-1 flex justify-end">
      <span class="high font-medium mr-3" style=" min-width:20px">{{highTemp}}</span>
      <span class="low" style=" min-width:20px">{{lowTemp}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyForecast",
  props: ["day"],
  computed: {
    formatedDate() {
      return new Date(this.day.dt * 1000).toLocaleString("en-us", {
        weekday: "long",
      });
    },
    highTemp() {
      return Math.round(this.day.temp.max);
    },
    lowTemp() {
      return Math.round(this.day.temp.min);
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="additional-info py-8 px-5 flex flex-wrap text-white">
    <div class=" flex flex-col mb-5" style="flex-basis:50%">
      <span class=" text-xs mb-2">Sunrise </span>
      <span class=" font-semibold">{{ sunrise }} </span>
    </div>
    <div class=" flex flex-col mb-5" style="flex-basis:50%">
      <span class=" text-xs mb-2">Humidity </span>
      <span class=" font-semibold">{{ Humidity }}% </span>
    </div>
    <div class=" flex flex-col mb-5" style="flex-basis:50%">
      <span class=" text-xs mb-2">Clouds </span>
      <span class=" font-semibold">{{ Cloudness }}% </span>
    </div>
    <div class=" flex flex-col mb-5" style="flex-basis:50%">
      <span class=" text-xs mb-2">Wind </span>
      <span class=" font-semibold">{{ Wind }}mph </span>
    </div>
    <div class=" flex flex-col" style="flex-basis:50%">
      <span class=" text-xs mb-2">Pressure </span>
      <span class=" font-semibold">{{ Pressure }} hPa </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdditionalInfo",
  props: ["currentWeather"],
  computed: {
    sunrise() {
      return new Date(this.currentWeather.sys.sunrise * 1000).toLocaleString(
        "en-us",
        { timeStyle: "short" }
      );
    },
    sunset() {
      return new Date(this.currentWeather.sys.sunset * 1000).toLocaleString(
        "en-us",
        { timeStyle: "short" }
      );
    },
    Humidity() {
      return this.currentWeather.main.humidity;
    },
    Cloudness() {
      return this.currentWeather.clouds.all;
    },
    Wind() {
      return Math.round(this.currentWeather.wind.speed);
    },
    Pressure() {
      return this.currentWeather.main.pressure;
    },
  },
};
</script>

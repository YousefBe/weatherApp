<template>
  <loading v-if="loading" />
  <div
    v-else
    class="
      weather
      w-full
      h-full
      overflow-x-hidden
      transition-all
      ease-in
      duration-500
    "
    :class="{ day: isDay, night: isNight }"
  >
    <div class="weather-wrap">
      <CityWeather
        :isDay="isDay"
        :isNight="isNight"
        :currentWeather="currentWeather"
      />
      <HourlyWeather :foreCast="foreCast" />
      <WeeklyForecast :foreCast="foreCast" />
      <additional-info  :currentWeather="currentWeather"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "../firebase/config";
import Loading from "../components/Loading.vue";
import CityWeather from "../components/CityWeather.vue";
import HourlyWeather from "../components/HourlyWeather.vue";
import WeeklyForecast from "../components/WeeklyForecast.vue";
import AdditionalInfo from "../components/AdditionalInfo.vue";
export default {
  name: "weather",
  props: ["city", "apiKey", "isDay", "isNight"],
  components: { Loading, CityWeather, HourlyWeather, WeeklyForecast ,AdditionalInfo },
  data() {
    return {
      foreCast: null,
      currentWeather: null,
      loading: true,
      currentTime: null,
    };
  },
  mounted() {
    this.getCityWeather();
  },
  methods: {
    getCityWeather() {
      db.collection("cities")
        .where("city", "==", this.city)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            this.currentWeather = doc.data().currentWeather;
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${
                  doc.data().currentWeather.coord.lat
                }&lon=${
                  doc.data().currentWeather.coord.lon
                }&exclude=current,minutley,alerts&units=metric&appid=${
                  this.apiKey
                }`
              )
              .then((res) => {
                this.foreCast = res.data;
              })
              .then(() => {
                this.loading = false;
                this.getCurrentTime();
              });
          });
        });
    },
    getCurrentTime() {
      const dateObj = new Date();
      this.currentTime = dateObj.getHours();
      const sunRise = new Date(
        this.currentWeather.sys.sunrise * 1000
      ).getHours();
      const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours();
      if (this.currentTime > sunRise && this.currentTime < sunset) {
        this.$emit("day-time");
      } else {
        this.$emit("night-time");
      }
    },
  },
  beforeUnmount() {
    this.$emit("resetDays");
  },
};
</script>

<style>
.weather::-webkit-scrollbar {
  display: none;
}
</style>
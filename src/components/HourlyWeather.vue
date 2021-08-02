<template>
  <div class="py-8 border-b border-solid border-gray-200">
    <div
      class="px-5 flex overflow-x-scroll p-0 my-0 mx-5 cont"
      style="max-width: 100vw"
    >
      <div
        class="hourly-temp"
        v-for="(time, index) in filteredList"
        :key="index"
      >
        <hourly-temp :time="time" />
      </div>
    </div>
  </div>
</template>

<script>
import HourlyTemp from "./HourlyTemp.vue";
export default {
  name: "HourlyWeather",
  props: ["foreCast"],
  components: { HourlyTemp },
  computed: {
    filteredList() {
      return this.foreCast.hourly.slice(0, 23);
    },
  },
};
</script>

<style scoped>
.cont::-webkit-scrollbar {
  display: none;
}
</style>
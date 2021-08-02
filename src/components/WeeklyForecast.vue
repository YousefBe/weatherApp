<template>
  <div class="weekly-forecast py-8 border-b border-solid border-white">
      <div class="px-5">
          <div class="daily mb-6" v-for="(day,index) in filterdList" :key="index">
              <DailyForecast :day="day" />
          </div>
      </div>
  </div>
</template>

    <script>
import DailyForecast from './DailyForecast.vue'
export default {
  name: "WeeklyForecast",
  props: ["foreCast"],
  components:{DailyForecast},
  computed: {
    filterdList() {
      return this.foreCast.daily.slice(1, 8);
    },
  },
};
</script>

    <style>
    .daily:last-child{
        margin-bottom: 0;
    }
</style>
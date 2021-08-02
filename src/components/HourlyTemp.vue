<template>
  <div class="hour text-white flex flex-col text-center mr-8" style="min-width:45px">
      <span class=" block self-center mb-3 font-light">{{formatedTime}}</span>
      <span class=" block self-center mb-3">
          <img class=" w-auto h-8  block" :src="require(`../../public/conditions/${time.weather[0].icon}.svg`)" alt="">
      </span>
      <span class=" block self-center font-medium">{{ formatedTemp }}&deg;</span>
  </div>
</template>

<script>
export default {
    name:"HourlyTemp",
    props:["time"],
    computed:{
        formatedTime(){
            return  new Date(this.time.dt * 1000).toLocaleString("en-us", { hour: "numeric" });
        },
        formatedTemp(){
            return Math.round(this.time.temp);
        }
    }
}
</script>

<style>

</style>
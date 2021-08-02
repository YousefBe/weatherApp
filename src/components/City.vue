<template>
  <div @click="goToCity" class="city cursor-pointer flex  relative flex-col p-5 text-white shadow" style="min-height:250px; flex-basis:50%">
    <i @click="removeCity" v-if="edit" class="far fa-trash-alt edit  text-xl absolute bottom-0 left-0 z-10" ref="edit"></i>
    <span class=" z-10 capitalize block text-2xl font-semibold">{{ city.city }}</span>
    <div class="weather flex z-10 justify-end items-end flex-1">
      <span class=" text-4xl mr-2">{{ currentWeather }} &deg;</span>
      <img
      class=" h-5 w-auto"
        :src="
          require(`../../public/conditions/${city.currentWeather.weather[0].icon}.svg`)
        "
        alt=""
      />
    </div>
    <div class="video overflow-hidden absolute top-0 left-0 w-full h-full">
      <video class="h-full md:h-auto md:w-full"
        autoplay
        loop
        muted
        :src="
          require(`../../public/videos/${city.currentWeather.weather[0].icon}.mp4`)
        "
      ></video>
      <div class="bg-overlay absolute top-0 bg-black bg-opacity-50 w-full h-full"></div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/config'
export default {
  name: "City",
  props: ["city","edit"],
  data() {
    return {
      id:null,
    }
  },
  computed: {
    currentWeather() {
      return Math.round(this.city.currentWeather.main.temp);
    },
  },
  methods: {
    removeCity(){
      // get cities by name , then we loop through get the city id 
      db.collection('cities').where('city' , '==' , `${this.city.city}`).get().then((docs)=>{
        docs.forEach((doc)=>{
          this.id = doc.id
        })
      }).then(()=>{
        db.collection('cities').doc(this.id).delete()
      });

    },
    goToCity(e){
      if (e.target=== this.$refs.edit) {
        // 
      }else{
        this.$router.push({name:"Weather" , params:{city: this.city.city}})
      }
    }
  },
};
</script>

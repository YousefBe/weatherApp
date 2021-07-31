<template>
  <div class=" grid pt-24 bg-gray-600 gap-4 w-full min-h-screen grid-cols-1 sm:grid-cols-3  " >
      <div class="city-link" v-for="(city , index) in cities" :key="index">
        <city :city="city"/>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import City from "../components/City.vue"
export default {
  name: 'Home',
  components:{City},
  props:['cities'],
  created(){
    console.log(this.cities);
  }
}
</script>

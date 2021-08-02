<template>
  <div>
    <header
      v-if="addingCity"
      class="px-5 bg-gray-600 z-50 fixed max-w-5xl w-full shadow-md"
    >
      <nav class="flex text-white py-8 px-0 justify-between">
        <span class="capitalize font-semibold">WeatherApp</span>
        <div class="right">
          <i
            @click="editCity"
            ref="editCityButton"
            class="far fa-edit text-xl"
          ></i>
          <i @click="refresh" class="fas fa-sync ml-4 text-xl"></i>
          <i @click="addCity" class="fas fa-plus ml-4 text-xl"></i>
        </div>
      </nav>
    </header>

    <header
      v-else
      class="p-5 z-50 fixed max-w-5xl w-full"
      :class="{'day' : isDay , 'night' : isNight}"
    >
      <nav class="text-white flex justify-between ">
        <router-link :to="{ name: 'AddCity' }">
          <i class="fas fa-chevron-left ml-4 text-xl"></i>
        </router-link>
        <span class=" font-bold text-xl"
          >{{ new Date().toLocaleString("en-us", { weekday: "short" }) }},
          {{ new Date().toLocaleString("en-us", { month: "short" }) }}
          {{ new Date().toLocaleString("en-us", { day: "2-digit" }) }}</span
        >
        <span  class=" font-bold text-xl">&deg; F</span>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["addingCity" , "isDay" , "isNight"],
  methods: {
    addCity() {
      this.$emit("toggleModal");
    },
    refresh() {
      location.reload();
    },
    editCity() {
      this.$refs.editCityButton.classList.toggle("text-red-500");
      this.$emit("editCity");
    },
  },
};
</script>

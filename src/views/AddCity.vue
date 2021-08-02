<template>
  <div class="">
    <div
      v-if="cities.length === 0"
      class="
        no-city
        bg-gray-600
        absolute
        min-h-screen
        max-w-5xl
        w-full
        flex flex-col
        justify-center
        items-center
        text-white
      "
    >
      <p>No cities added , add a new City</p>
      <button
        @click="toggleAddCityModal"
        class="
          bg-gray-900
          mt-4
          py-2
          px-6
          rounded-lg
          border-none
          cursor-pointer
          transition-all
          ease-in
          duration-200
          transform
          outline-none
          hover:scale-105
          hover:bg-white
          hover:text-gray-900
        "
      >
        add city
      </button>
    </div>
    <div
      v-else
      class="grid pt-24 bg-gray-600 w-full min-h-screen md:grid-cols-3"
    >
      <div class="city-link" v-for="(city, index) in cities" :key="index">
        <city :city="city" :edit="edit" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import City from "../components/City.vue";
export default {
  name: "Home",
  components: { City },
  props: ["cities", "edit"],
  methods: {
    toggleAddCityModal() {
      this.$emit("toggleModal");
    },
  },
};
</script>
<style>
.grid {
  grid-auto-rows: 250px;
}
@media (min-width: 250px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media (min-width: 450px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
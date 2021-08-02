<template>
  <div
    class="
      loading
      top-0
      z-30
      h-full
      w-full max-w-5xl
      bg-blue-500
      opacity-50
      fixed
      flex
      justify-center
      items-center
    "
  >
    <span class=" block w-16 h-16 my-0 mx-auto border-4 border-solid border-transparent rounded-full"></span>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped>
.loading span {
  border-top-color: white;
  border-bottom-color: white;
  animation: spin ease 1000ms infinite;
}
@keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }

</style>
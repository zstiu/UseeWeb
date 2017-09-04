<template>
  <div class="danmu">
    <canvas id="Canvas2D" />
  </div>
</template>

<script>

  export default {
    name: 'canvas2D',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    async mounted() {
      let canvas = document.getElementById('Canvas2D');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let ctx = canvas.getContext('2d');

      ctx.font = "50px serif";
      ctx.fillText("Hello world", 10, 50);


    },
  }
</script>

<style src="./Canvas2D.css"></style>

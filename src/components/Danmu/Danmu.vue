<template>
  <div class="danmu">
    <h1>danmu</h1>
    <canvas ref="danmuCanvas"/>
  </div>
</template>

<script>
export default {
  name: 'danmu',
  mounted() {
    let canvas = this.$refs;
    canvas.danmuCanvas.height = window.screen.height;
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style src="./Danmu.css"></style>

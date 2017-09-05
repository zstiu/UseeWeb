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

      var ctx = document.getElementById('Canvas2D').getContext('2d');

      class Danmu {
        constructor(config, context){
          this.x = config.x; // X坐标
          this.y = config.y; // Y坐标
          this.speedX = config.speedX; // 水平方向速度
          this.speedY = config.speedY; // 垂直方向速度
          this.context = context; // 获取context的引用
        }
        move() {
          this.x += this.speedX;
          this.y += this.speedY;
        };

        draw(){
          this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
          // 绘图
          let that = this;
//          console.log(this);
          var context = this.context;

          context.font = "50px serif";
          context.fillText("Hello world", this.x, this.y);
          // 移动，更新位置
          this.move();
          window.requestAnimationFrame(function() {that.draw()});
        };

      };

      var text = ctx.measureText("foo");
      console.log(text);

      let config = {
        x: 10,
        y: 10,
        speedX: 1,
        speedY: 1,
      }

      var dan = new Danmu(config, ctx);

      console.log(dan);

      dan.draw();


    },
  }
</script>

<style src="./Canvas2D.css"></style>

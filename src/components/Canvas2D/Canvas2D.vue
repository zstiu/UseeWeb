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

      class DanmuBoard {
        constructor(context){

          this.danmu = [];

          this.context = context;

          this.draw();
//          {
//            text: config.text,
//            x : config.x, // X坐标
//            y : config.y, // Y坐标
//            speedX : config.speedX, // 水平方向速度
//            speedY : config.speedY, // 垂直方向速度
//            context : context, // 获取context的引用
//            width : context.measureText(config.text),
//          };
        }

        push(config){
          this.danmu.push({
            text: config.text,
            x : config.x, // X坐标
            y : config.y, // Y坐标
            speedX : config.speedX, // 水平方向速度
            speedY : config.speedY, // 垂直方向速度
            width : this.context.measureText(config.text),
            show : true,
          })
        }

        move(value) {

//          this.danmu.map(function(value, key){
            value.x -= value.speedX;
//          })

//          this.y += this.speedY;
        };

        draw(){
          this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
          // 绘图
          let that = this;
//          console.log(this);
          var context = this.context;

          context.font = "50px serif";

          this.danmu.map(function(value, key){

            if(value.show){
              that.move(value);

              context.fillText(value.text, value.x, value.y);
              if (value.x <= 0){//-this.width+100){
//                delete this;
                value.show = false;
                console.log("yeah");
//                console.log(this);
//            this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                return;
              }
            }

          })


          // 移动，更新位置

//          console.log(this.x);
//          console.log(this.width);

          window.requestAnimationFrame(function() {that.draw()});
        };

      };

      var text = ctx.measureText("foo");
      console.log(text);

      let config1 = {
        text: "Hello world1",
        x: window.innerWidth,
        y: 100,
        speedX: 1,
        speedY: 1,
      };
      let config2 = {
        text: "Hello world2",
        x: window.innerWidth,
        y: 200,
        speedX: 1,
        speedY: 1,
      }

      var dan = new DanmuBoard(ctx);
//      new Danmu({
//        text:"another",
//        x: window.innerWidth,
//        y: 300,
//        speedX: 2,
//        speedY: 2,
//      }, ctx);

      dan.push(config1);
      dan.push(config2);

      console.log(dan);

//      dan.draw();

    },
  }
</script>

<style src="./Canvas2D.css"></style>

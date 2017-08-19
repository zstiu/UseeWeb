<template>
  <div class="danmu">
    <canvas id="danmuCanvas"/>
  </div>
</template>

<script>
  import * as THREE from "three";

  export default {
    name: 'danmu',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      var scene, camera;
      var geometry, material, mesh;
      let that = this;

      scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera(60, 4000 / 3000, 1, 1000);
      camera.position.set(0, 0, 1000);
      scene.add(camera);

      var cube = new THREE.Mesh(new THREE.CubeGeometry(10, 15, 20),
        new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: true
        })
      );
//      scene.add(cube);

      // LIGHTS
      var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
      dirLight.position.set( 0, 0, 1 ).normalize();
      scene.add( dirLight );
      var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
      pointLight.position.set( 0, 100, 90 );
      scene.add( pointLight );

      // 创建文字
      function createText() {
        var text = new THREE.FontLoader().load("/static/helvetiker_bold.typeface.json", function (text) {
          var gem = new THREE.TextGeometry('ni', {
            size: 100, //字号大小，一般为大写字母的高度
            height: 0, //文字的厚度
            weight: 'bold', //值为'normal'或'bold'，表示是否加粗
            font: text, //字体，默认是'helvetiker'，需对应引用的字体文件
            style: 'normal', //值为'normal'或'italics'，表示是否斜体
            bevelThickness: 1, //倒角厚度
            bevelSize: 1, //倒角宽度
            curveSegments: 30,//弧线分段数，使得文字的曲线更加光滑
            bevelEnabled: true, //布尔值，是否使用倒角，意为在边缘处斜切
          });
          gem.center();
          var mat = new THREE.MeshPhongMaterial({
            color: 0xffe502,
            specular: 0x009900,
            shininess: 30,
            flatShading: THREE.FlatShading
          });
          var textObj = new THREE.Mesh(gem, mat);
          textObj.castShadow = true;




          scene.add(textObj);

          renderer.render(scene, camera);
//          new TWEEN.Tween(textObj.rotation).to({y: Math.PI * 2}, 2000).repeat(Infinity).yoyo(true).start();
        });
      }

      createText();


      let renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('danmuCanvas')
      });
      console.log(renderer);
      renderer.setClearColor();

      renderer.render(scene, camera);


      // canvas.danmuCanvas.height = window.screen.height;

    },
  }
</script>

<style src="./Danmu.css"></style>

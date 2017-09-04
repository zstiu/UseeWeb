<template>
  <div class="danmu">
    <canvas id="danmuCanvas" />
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
    async mounted() {

      var scene;
      let that = this;
      let canvas = document.getElementById('danmuCanvas')
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      scene = new THREE.Scene();

      let renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('danmuCanvas'),
        antialias: true,
      });

//      console.log("danmuCanvas--------------> ", document.getElementById('danmuCanvas').height, document.getElementById('danmuCanvas').width);
//
//      console.log("new renderer-------------> ", (new THREE.WebGLRenderer).getSize());
//      console.log("danmuCanvas renderer-----> ", renderer.getSize());

      renderer.shadowMap.enabled = true;
      renderer.shadowMapSoft = true;//软阴影
      renderer.setClearColor(0x000000); // black

//      renderer.setSize( window.innerWidth, window.innerHeight );


//      var camera = new THREE.PerspectiveCamera(60, 4000 / 3000, 1, 1000);
      var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
      camera.position.set(0, 30, 500);
      scene.add(camera);



      // a cube in the scene
      var cube = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100),
        new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: true
        })
      );
      scene.add(cube);

      // LIGHTS
      var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
      dirLight.position.set( 0, 0, 1 ).normalize();
      scene.add( dirLight );
      var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
      pointLight.position.set( 0, 100, 90 );
      scene.add( pointLight );

      //添加坐标轴
      scene.add(getLine([-1000, 0, 0], [1000, 0, 0]));
      scene.add(getLine([0, -1000, 0], [0, 1000, 0]));
      scene.add(getLine([0, 0, -1000], [0, 0, 1000]));

      function getLine(arr1, arr2) {
        var geometry = new THREE.Geometry();
        //var geometry2 = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial( { vertexColors: true } );
        var color1 = new THREE.Color( 0xFFFFFF ), color2 = new THREE.Color( 0xFFFFFF );
        // 线的材质可以由2点的颜色决定
        var p1 = new THREE.Vector3( arr1[0], arr1[1], arr1[2] );
        var p2 = new THREE.Vector3(  arr2[0], arr2[1], arr2[2] );
        //var p3 = new THREE.Vector3(  0, 100, 0 );
        //var p4 = new THREE.Vector3(  0, 0, 100 );
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);
        geometry.colors.push( color1, color2 );
        return new THREE.Line( geometry, material, THREE.LineSegments );
      }


       //创建文字
      function createText(message) {

        return new Promise(( resolve ) => new THREE.FontLoader().load("/static/helvetiker_bold.typeface.json", function (text) {
          var gem = new THREE.TextGeometry(message, {
            size: 21, //字号大小，一般为大写字母的高度
            height: 1, //文字的厚度
            weight: 'normal', //值为'normal'或'bold'，表示是否加粗
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
//          textObj.position.x = 100;
          textObj.position.y = 100;
          scene.add(textObj);

          console.log("--->", textObj.geometry.boundingBox);
          console.log("--->", textObj.geometry.boundingBox.max);
          console.log("text---------------->", textObj);
          resolve();
        }))
      }

      await createText("loading...");
//    await createText("another...");





      console.log(renderer);
      renderer.setClearColor();

      function animate() {
        requestAnimationFrame( animate );
//        camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        if(camera.position.x>=100){camera.position.x = -100;}
        camera.position.x += 0.5;

        renderer.clear();
        renderer.render( scene, camera );
      }
      animate();
    },
  }
</script>

<style src="./Danmu.css"></style>

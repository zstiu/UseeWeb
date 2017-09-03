<template>
  <div class="danmu">
    <canvas id="danmuCanvas" width="400px" height="300px"/>
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

      var scene, textObj;
      let that = this;

      scene = new THREE.Scene();

      let renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('danmuCanvas'),
        antialias: true,
      });

      renderer.shadowMapEnabled = true;
      renderer.shadowMapSoft = true;//软阴影
      renderer.setClearColor(0x000000); // black
      renderer.setSize( window.innerWidth, window.innerHeight );

//      var camera = new THREE.PerspectiveCamera(60, 4000 / 3000, 1, 1000);
      var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
      camera.position.set(0, 0, 500);
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

       //创建文字
      function createText() {

        return new Promise(( resolve ) => new THREE.FontLoader().load("/static/helvetiker_bold.typeface.json", function (text) {
          var gem = new THREE.TextGeometry('ni', {
            size: 21, //字号大小，一般为大写字母的高度
            height: 5, //文字的厚度
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
          textObj = new THREE.Mesh(gem, mat);
          textObj.castShadow = true;
          scene.add(textObj);
          resolve();
        }))
      }

      await createText();



      console.log(renderer);
      renderer.setClearColor();

      function animate() {
        requestAnimationFrame( animate );
        render();
      }
      function render() {
        textObj.rotation.y += 0.05;
//        camera.lookAt( cameraTarget );
        renderer.clear();
        renderer.render( scene, camera );
      }
      animate();

//      function init() {
//        // renderer
//        var renderer = new THREE.WebGLRenderer({
//          canvas: document.getElementById('danmuCanvas')
//        });
//        renderer.setClearColor(0x000000); // black
//        // scene
//        var scene = new THREE.Scene();
//        // camera
//        var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
//        camera.position.set(-2, -3, 5);
//        camera.lookAt({x:0,y:0,z:0});
//        scene.add(camera);
//        // a cube in the scene
//        var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
//          new THREE.MeshBasicMaterial({
//            color: 0xff0000,
//            wireframe: true
//          })
//        );
//        scene.add(cube);
//        // render
//        renderer.render(scene, camera);
//      }
//
//      init();


//       canvas.danmuCanvas.height = window.screen.height;


////      THREE.Cache.enabled = true;
//      var container, hex;
//      var camera, cameraTarget, scene, renderer;
//      var group, textMesh1, textMesh2, textGeo, materials;
//      var text = "three.js",
//        height = 5,
//        size = 20,
//        hover = 30,
//        curveSegments = 4,
//        bevelThickness = 2,
//        bevelSize = 1.5,
//        bevelEnabled = true,
//        font = undefined,
//        fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
//        fontWeight = "bold"; // normal bold
//      var mirror = true;
//      var fontMap = {
//        "helvetiker": 0,
//        "optimer": 1,
//        "gentilis": 2,
//        "droid/droid_sans": 3,
//        "droid/droid_serif": 4
//      };
//      var weightMap = {
//        "regular": 0,
//        "bold": 1
//      };
//      var reverseFontMap = [];
//      var reverseWeightMap = [];
//      for ( var i in fontMap ) reverseFontMap[ fontMap[i] ] = i;
//      for ( var i in weightMap ) reverseWeightMap[ weightMap[i] ] = i;
//      var targetRotation = 0;
//      init();
//      animate();
//
//
//
//      function decimalToHex( d ) {
//        var hex = Number( d ).toString( 16 );
//        hex = "000000".substr( 0, 6 - hex.length ) + hex;
//        return hex.toUpperCase();
//      }
//      function init() {
//        container = document.createElement( 'div' );
//        document.body.appendChild( container );
//        camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
//        camera.position.set( 100, 300, 700 );
//        cameraTarget = new THREE.Vector3( 0, 150, 0 );
//        // SCENE
//        scene = new THREE.Scene();
//        scene.background = new THREE.Color( 0x000000 );
//        scene.fog = new THREE.Fog( 0x000000, 250, 1400 );
//        // LIGHTS
//        var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
//        dirLight.position.set( 0, 0, 1 ).normalize();
//        scene.add( dirLight );
//        var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
//        pointLight.position.set( 0, 100, 90 );
//        scene.add( pointLight );
//
//        //设置平行光
//        var light = new THREE.DirectionalLight(0xffffff,0.5);
//        light.position.set(-6, 5, 3);
//        light.castShadow = true; //允许阴影
//        light.shadowCameraNear = 0;
//        light.shadowCameraVisible = true//开启调试
//        scene.add(light);
//
//        //添加坐标轴
//        scene.add(getLine([-100, 0, 0], [100, 0, 0]));
//        scene.add(getLine([0, -100, 0], [0, 100, 0]));
//        scene.add(getLine([0, 0, -100], [0, 0, 100]));
//
//        // Get text from hash
//        var hash = document.location.hash.substr( 1 );
//        if ( hash.length !== 0 ) {
//          var colorhash  = hash.substring( 0, 6 );
//          var fonthash   = hash.substring( 6, 7 );
//          var weighthash = hash.substring( 7, 8 );
//          var bevelhash  = hash.substring( 8, 9 );
//          var texthash   = hash.substring( 10 );
//          hex = colorhash;
//          pointLight.color.setHex( parseInt( colorhash, 16 ) );
//          fontName = reverseFontMap[ parseInt( fonthash ) ];
//          fontWeight = reverseWeightMap[ parseInt( weighthash ) ];
//          bevelEnabled = parseInt( bevelhash );
//          text = decodeURI( texthash );
////          updatePermalink();
//        } else {
////          pointLight.color.setHSL( Math.random(), 1, 0.5 );
//          hex = decimalToHex( pointLight.color.getHex() );
//        }
//        materials = [
//          new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
//          new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
//        ];
//        group = new THREE.Group();
//        group.position.y = 100;
//        scene.add( group );
//        loadFont();
//        var plane = new THREE.Mesh(
//          new THREE.PlaneBufferGeometry( 10000, 10000 ),
//          new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, transparent: true } )
//        );
//        plane.position.y = 100;
//        plane.rotation.x = - Math.PI / 2;
//        scene.add( plane );
//        // RENDERER
//        renderer = new THREE.WebGLRenderer( {
//          canvas: document.getElementById('danmuCanvas'),
//          antialias: true,
//        } );
////        renderer.setPixelRatio( window.devicePixelRatio );
//        renderer.setSize( window.innerWidth, window.innerHeight );
////        container.appendChild( renderer.domElement );
//      }
//
//      function getLine(arr1, arr2) {
//        var geometry = new THREE.Geometry();
//        //var geometry2 = new THREE.Geometry();
//        var material = new THREE.LineBasicMaterial( { vertexColors: true } );
//        var color1 = new THREE.Color( 0xFFFFFF ), color2 = new THREE.Color( 0xFFFFFF );
//        // 线的材质可以由2点的颜色决定
//        var p1 = new THREE.Vector3( arr1[0], arr1[1], arr1[2] );
//        var p2 = new THREE.Vector3(  arr2[0], arr2[1], arr2[2] );
//        //var p3 = new THREE.Vector3(  0, 100, 0 );
//        //var p4 = new THREE.Vector3(  0, 0, 100 );
//        geometry.vertices.push(p1);
//        geometry.vertices.push(p2);
//        geometry.colors.push( color1, color2 );
//        return new THREE.Line( geometry, material, THREE.LineSegments );
//      }
//
//      function loadFont() {
//        var loader = new THREE.FontLoader();
//        loader.load( '/static/helvetiker_bold.typeface.json', function ( response ) {
//          font = response;
//          createText();
//        } );
//      }
//      function createText() {
//        textGeo = new THREE.TextBufferGeometry( text, {
//          font: font,
//          size: size,
//          height: height,
//          curveSegments: curveSegments,
//          bevelThickness: bevelThickness,
//          bevelSize: bevelSize,
//          bevelEnabled: bevelEnabled,
//          material: 0,
//          extrudeMaterial: 1
//        });
//        textGeo.computeBoundingBox();
//        textGeo.computeVertexNormals();
//        // "fix" side normals by removing z-component of normals for side faces
//        // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
//        var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
//        textMesh1 = new THREE.Mesh( textGeo, materials );
//        textMesh1.position.x = centerOffset;
//        textMesh1.position.y = hover;
//        textMesh1.position.z = 0;
//        textMesh1.rotation.x = 0;
//        textMesh1.rotation.y = Math.PI * 2;
//        group.add( textMesh1 );
//      }
//
//      //
//      function animate() {
//        requestAnimationFrame( animate );
//        render();
//      }
//      function render() {
//        group.rotation.y += 1 * 0.05;
//        camera.lookAt( cameraTarget );
//        renderer.clear();
//        renderer.render( scene, camera );
//      }

    },
  }
</script>

<style src="./Danmu.css"></style>

<template>
  <div class="danmu">
    <canvas id="danmuCanvas"/>
  </div>
</template>

<script>
import * as THREE from "three";

export default {
  name: 'danmu',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    var scene, camera;
    var geometry, material, mesh;
    let that = this;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    geometry = new THREE.BoxGeometry( 200, 200, 200 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );


    let renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('danmuCanvas')
    });
    console.log(renderer);
    renderer.setClearColor();

    function animate() {

      requestAnimationFrame( animate );

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;

      renderer.render( scene, camera );

    }
    animate();
    // canvas.danmuCanvas.height = window.screen.height;

  },
}
</script>

<style src="./Danmu.css"></style>

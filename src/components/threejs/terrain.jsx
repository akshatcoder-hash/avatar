// import * as dat from "dat.gui";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Terrain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // // Debug
    // const gui = new dat.GUI();

    // Texture Loaders
    const loader = new THREE.TextureLoader();
    const height = loader.load("/textures/height.png");
    const texture = loader.load("/textures/texture.jpg");
    const alpha = loader.load("/textures/alpha.jpg");

    // Canvas
    const canvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Objects
    const geometry = new THREE.PlaneGeometry(3, 3, 64, 64);

    // Materials
    const material = new THREE.MeshStandardMaterial({
      color: "#9dc0dd",
      map: texture,
      displacementMap: height,
      displacementScale: 0.4,
      alphaMap: alpha,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      opacity: 0.3,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = 181;
    scene.add(plane);

    // Mesh

    // Lights
    const pointLight = new THREE.PointLight("#d1c0d1", 3);
    pointLight.position.x = 12;
    pointLight.position.y = 10;
    pointLight.position.z = 4.4;
    scene.add(pointLight);

    // const col = { color: "#7940f1" };
    // gui.addColor(col, "color").onChange(() => {
    //   pointLight.color.set(col.color);
    // });

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      40,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */

    document.addEventListener("mousemove", animateTerrain);

    let mouseY = 0;

    function animateTerrain(event) {
      mouseY = event.clientY;
    }

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects
      plane.rotation.z = 0.2 * elapsedTime;
      plane.material.displacementScale = 0.3 + mouseY * 0.0001;
      // Update Orbital Controls
      // controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return <canvas ref={canvasRef} className="webgl" />;
};

export default Terrain;

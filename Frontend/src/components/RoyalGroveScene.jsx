
import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const RoyalGroveScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const particlesRef = useRef(null);
  const leafSigilsRef = useRef([]);

  useEffect(() => {
    if (!mountRef.current || rendererRef.current) return; // Prevent re-initialization

    const currentMount = mountRef.current;
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a192f, 0.015); // Dark blueish fog

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 5, 15);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 2.1; // Prevent looking too far down/up
    controls.target.set(0, 2, 0);
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x6080a0, 1.5); // Soft bluish ambient
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x88ccff, 2.5); // Cool directional light
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x50ff80, 3, 20); // Greenish magical glow
    pointLight.position.set(0, 3, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Ground Plane (Tiled Royal Floor)
    const planeSize = 30;
    const textureLoader = new THREE.TextureLoader();
    
    const floorColorTexture = textureLoader.load('https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80'); // Example: Grey stone tiles
    floorColorTexture.wrapS = THREE.RepeatWrapping;
    floorColorTexture.wrapT = THREE.RepeatWrapping;
    floorColorTexture.repeat.set(8, 8);

    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorColorTexture,
      roughness: 0.7,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const floorPlane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize), floorMaterial);
    floorPlane.rotation.x = -Math.PI / 2;
    floorPlane.receiveShadow = true;
    scene.add(floorPlane);

    // Enchanted Forest-Castle Fusion (Simplified placeholder geometry)
    const castleMaterial = new THREE.MeshStandardMaterial({ color: 0x606070, roughness: 0.8, metalness: 0.3 });
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x306030, roughness: 0.9 });

    // Central Tree (simplified)
    const treeTrunkGeo = new THREE.CylinderGeometry(0.5, 0.8, 8, 12);
    const treeTrunk = new THREE.Mesh(treeTrunkGeo, castleMaterial); // Use stone-like for base
    treeTrunk.position.y = 4;
    treeTrunk.castShadow = true;
    scene.add(treeTrunk);

    const treeCrownGeo = new THREE.SphereGeometry(3, 16, 12);
    const treeCrown = new THREE.Mesh(treeCrownGeo, foliageMaterial);
    treeCrown.position.y = 9;
    treeCrown.castShadow = true;
    scene.add(treeCrown);

    // Castle Wall fragments (simplified)
    for (let i = 0; i < 5; i++) {
      const wallGeo = new THREE.BoxGeometry(Math.random() * 2 + 1, Math.random() * 4 + 2, 0.5);
      const wall = new THREE.Mesh(wallGeo, castleMaterial);
      wall.position.set(
        (Math.random() - 0.5) * 15,
        wall.geometry.parameters.height / 2,
        (Math.random() - 0.5) * 15
      );
      wall.rotation.y = Math.random() * Math.PI;
      wall.castShadow = true;
      wall.receiveShadow = true;
      scene.add(wall);
    }

    // Floating Leaf Sigils
    const sigilGeometry = new THREE.PlaneGeometry(0.5, 0.8); // simple plane for sigil
    const sigilMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x80ffb0, // Light green
      side: THREE.DoubleSide, 
      transparent: true, 
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    leafSigilsRef.current = [];
    for (let i = 0; i < 10; i++) {
      const sigil = new THREE.Mesh(sigilGeometry, sigilMaterial.clone());
      sigil.position.set(
        (Math.random() - 0.5) * 10,
        Math.random() * 3 + 3,
        (Math.random() - 0.5) * 10
      );
      sigil.userData.orbitRadius = Math.random() * 2 + 3;
      sigil.userData.orbitSpeed = (Math.random() - 0.5) * 0.01;
      sigil.userData.initialAngle = Math.random() * Math.PI * 2;
      scene.add(sigil);
      leafSigilsRef.current.push(sigil);
    }

    // Particle Effects (Glowing Spores/Leaves)
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25; // Spread around
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x60ff90, // Greenish glow
      size: 0.15,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.6,
      depthWrite: false, // So they don't obscure opaque objects too much
    });
    particlesRef.current = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlesRef.current);

    // Mouse move listener for parallax
    const onMouseMove = (event) => {
      if (!cameraRef.current) return;
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      cameraRef.current.setViewOffset(
        window.innerWidth, window.innerHeight,
        mouseX * 50, mouseY * 50, // The multiplication factor controls parallax intensity
        window.innerWidth, window.innerHeight
      );
    };
    window.addEventListener('mousemove', onMouseMove);
    

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return; // Ensure refs are valid
      
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      controlsRef.current?.update();

      // Animate particles (gentle floating)
      if (particlesRef.current) {
        particlesRef.current.rotation.y += delta * 0.1;
        const positions = particlesRef.current.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          positions[i3 + 1] += Math.sin(elapsedTime + positions[i3]) * 0.002; // y-axis bobbing
          if (positions[i3 + 1] < -5) positions[i3+1] = 10; // Reset if too low
          if (positions[i3 + 1] > 10) positions[i3+1] = -5; // Reset if too high
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }
      
      // Animate leaf sigils
      leafSigilsRef.current.forEach(sigil => {
        sigil.rotation.y += delta * 0.5;
        sigil.rotation.x = Math.sin(elapsedTime * 0.5 + sigil.userData.initialAngle) * 0.2;
        // Orbit around central point (0, treeCrown.position.y, 0)
        const angle = elapsedTime * sigil.userData.orbitSpeed + sigil.userData.initialAngle;
        sigil.position.x = sigil.userData.orbitRadius * Math.cos(angle);
        sigil.position.z = sigil.userData.orbitRadius * Math.sin(angle);
        sigil.position.y = treeCrown.position.y - 1 + Math.sin(elapsedTime + sigil.userData.initialAngle) * 0.5; // Bobbing
        sigil.material.opacity = 0.5 + Math.sin(elapsedTime * 2 + sigil.userData.initialAngle) * 0.2;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current || !currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      camera.clearViewOffset(); // Clear parallax on resize
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (rendererRef.current && currentMount) {
        currentMount.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
      // Dispose materials and geometries if needed
      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      rendererRef.current = null; // Mark as disposed/cleaned
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return <div ref={mountRef} className="fixed inset-0 z-0 w-full h-full" />;
};

export default RoyalGroveScene;

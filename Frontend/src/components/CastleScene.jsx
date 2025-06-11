
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const CastleScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const castleRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(128, 128);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create a simple castle using basic geometries
    const castleGroup = new THREE.Group();

    // Main tower
    const towerGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 8);
    const towerMaterial = new THREE.MeshPhongMaterial({ color: 0x8b7355 });
    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.y = 0.6;
    castleGroup.add(tower);

    // Tower roof
    const roofGeometry = new THREE.ConeGeometry(0.4, 0.4, 8);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x2d4a22 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 1.4;
    castleGroup.add(roof);

    // Side towers
    for (let i = 0; i < 3; i++) {
      const sideTower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.2, 0.8, 6),
        towerMaterial
      );
      const angle = (i * Math.PI * 2) / 3;
      sideTower.position.x = Math.cos(angle) * 0.6;
      sideTower.position.z = Math.sin(angle) * 0.6;
      sideTower.position.y = 0.4;
      castleGroup.add(sideTower);

      const sideRoof = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.3, 6),
        roofMaterial
      );
      sideRoof.position.x = Math.cos(angle) * 0.6;
      sideRoof.position.z = Math.sin(angle) * 0.6;
      sideRoof.position.y = 0.95;
      castleGroup.add(sideRoof);
    }

    // Add some flags
    const flagPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 0.3),
      new THREE.MeshPhongMaterial({ color: 0x8b7355 })
    );
    flagPole.position.y = 1.75;
    castleGroup.add(flagPole);

    const flagGeometry = new THREE.PlaneGeometry(0.15, 0.1);
    const flagMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xd4af37,
      side: THREE.DoubleSide 
    });
    const flag = new THREE.Mesh(flagGeometry, flagMaterial);
    flag.position.set(0.075, 1.75, 0);
    castleGroup.add(flag);

    scene.add(castleGroup);
    castleRef.current = castleGroup;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffd700, 0.8);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Position camera
    camera.position.set(2, 1, 2);
    camera.lookAt(0, 0.5, 0);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (castleRef.current) {
        castleRef.current.rotation.y += 0.01;
        
        // Gentle floating motion
        castleRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default CastleScene;

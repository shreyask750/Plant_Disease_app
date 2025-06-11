
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Cylinder, Plane, Cone } from '@react-three/drei';
import * as THREE from 'three';

const Tree = ({ position, scale = 1 }) => {
  const trunkHeight = 3 * scale;
  const trunkRadius = 0.2 * scale;
  const crownRadius = 1.5 * scale;
  const crownHeight = 3 * scale;

  return (
    <group position={position}>
      <Cylinder args={[trunkRadius * 0.8, trunkRadius, trunkHeight, 8]} position={[0, trunkHeight / 2, 0]}>
        <meshStandardMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </Cylinder>
      <Cone args={[crownRadius, crownHeight, 8]} position={[0, trunkHeight + crownHeight / 2 - 0.5 * scale, 0]}>
        <meshStandardMaterial color="#2E8B57" emissive="#1E5639" emissiveIntensity={0.05} roughness={0.7} />
      </Cone>
       <Cone args={[crownRadius * 0.8, crownHeight * 0.7, 8]} position={[0, trunkHeight + crownHeight * 0.6 - 0.5 * scale, 0]}>
        <meshStandardMaterial color="#387850" emissive="#204A31" emissiveIntensity={0.05} roughness={0.7} />
      </Cone>
    </group>
  );
};

const Leaf = ({ initialPosition, mousePos }) => {
  const meshRef = useRef();
  const [velocity] = useState(() => new THREE.Vector3(
    (Math.random() - 0.5) * 0.005, 
    -0.01 - Math.random() * 0.01, 
    (Math.random() - 0.5) * 0.005
  ));
  const [rotationSpeed] = useState(() => new THREE.Vector3(
    (Math.random() - 0.5) * 0.05,
    (Math.random() - 0.5) * 0.05,
    (Math.random() - 0.5) * 0.05
  ));

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    meshRef.current.position.addScaledVector(velocity, delta * 60); // Consistent speed
    meshRef.current.rotation.x += rotationSpeed.x * delta * 60;
    meshRef.current.rotation.y += rotationSpeed.y * delta * 60;
    meshRef.current.rotation.z += rotationSpeed.z * delta * 60;

    // Mouse interaction: gentle push
    if (mousePos.current) {
      const distance = meshRef.current.position.distanceTo(
        new THREE.Vector3(mousePos.current.x * 5, mousePos.current.y * 2, meshRef.current.position.z)
      );
      if (distance < 1.5) {
        const direction = new THREE.Vector3().subVectors(
          meshRef.current.position, 
          new THREE.Vector3(mousePos.current.x * 5, mousePos.current.y * 2, meshRef.current.position.z)
        ).normalize();
        meshRef.current.position.addScaledVector(direction, 0.01); // Gentle push
      }
    }
    

    // Reset leaf if it falls too far
    if (meshRef.current.position.y < -5) {
      meshRef.current.position.set(
        initialPosition.x + (Math.random() - 0.5) * 10,
        5 + Math.random() * 5,
        initialPosition.z + (Math.random() - 0.5) * 10
      );
      velocity.set(
        (Math.random() - 0.5) * 0.005,
        -0.01 - Math.random() * 0.01,
        (Math.random() - 0.5) * 0.005
      );
    }
  });

  const leafColors = ["#FF4500", "#FFA500", "#DAA520", "#B8860B", "#D2691E"];
  const randomColor = useMemo(() => leafColors[Math.floor(Math.random() * leafColors.length)], []);


  return (
    <Sphere ref={meshRef} args={[0.05, 8, 8]} position={initialPosition}>
      <meshStandardMaterial color={randomColor} emissive={randomColor} emissiveIntensity={0.2} roughness={0.6} />
    </Sphere>
  );
};

const ForestScene = () => {
  const { scene } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x0a192f, 0.03); // Dark blueish fog
    
    const handleMouseMove = (event) => {
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [scene]);

  const trees = useMemo(() => {
    const treePositions = [];
    for (let i = 0; i < 40; i++) {
      treePositions.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          0,
          (Math.random() - 0.5) * 40 - 5 // Shift trees back a bit
        ),
        scale: 0.8 + Math.random() * 0.7
      });
    }
    return treePositions;
  }, []);

  const leaves = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      initialPosition: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        Math.random() * 10 + 2, // Start higher
        (Math.random() - 0.5) * 30 -5
      )
    }));
  }, []);

  return (
    <>
      <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#1A2A1A" roughness={0.9} metalness={0.1} />
      </Plane>
      
      {trees.map((tree, i) => (
        <Tree key={i} position={tree.position} scale={tree.scale}/>
      ))}

      {leaves.map(leaf => (
        <Leaf key={leaf.id} initialPosition={leaf.initialPosition} mousePos={mousePos} />
      ))}
      
      <ambientLight intensity={0.2} color="#406040" />
      <directionalLight 
        position={[10, 20, 5]} 
        intensity={0.5} 
        color="#FFDEAD" // Warmer sunlight
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[-10, 5, -15]} intensity={0.3} color="#6495ED" /> {/* Cool back light */}
    </>
  );
};


const ThreeScene = () => {
  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900 to-gray-800">
      <Canvas camera={{ position: [0, 3, 15], fov: 60 }} shadows>
        <ForestScene />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          minDistance={5}
          maxDistance={25}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;

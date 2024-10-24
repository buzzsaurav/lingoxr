import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Line as DreiLine, Sparkles } from '@react-three/drei';
import { TextureLoader } from 'three'; // Import TextureLoader
import { Ring } from '@react-three/drei';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import {  Sphere } from '@react-three/drei';
import FakeGlowMaterial from './FakeGlowMaterial';

export const Node = ({ name, position, level, onClick, color }) => {
  const radius = 0.2 * Math.pow(0.8, level);
  
  // console.log(name, position, level, onClick, color);
  // Define colors based on the level
  let material;
  // if (level === 0) {
  //   // Base node: single color
  //   material = new THREE.MeshStandardMaterial({ color: 'white' });
  // } else if (level === 1) {
  //   // Level 2 nodes: half base color, half random
  //   const baseColor = new THREE.Color('white');
  //   const randomColor = getRandomColor();
  //   material = new THREE.MeshStandardMaterial({ color: baseColor.lerp(randomColor, 0.5) });
  // } else if (level === 2) {
  //   // Level 3 nodes: blend of three colors
  //   const color1 = getRandomColor();
  //   const color2 = getRandomColor();
  //   const color3 = getRandomColor();
    
  //   // Calculate a mix of three colors
  //   const finalColor = new THREE.Color()
  //     .addColors(color1, color2)
  //     .lerp(color3, 0.33);
    // console.log(color);
    // material = new THREE.MeshStandardMaterial({ color });
  // }
  console.log(position)
  return (
    <group position={position}>
      <Sparkles count={10} scale={0.6} size={2} speed={1} opacity={0.3} color='#43d9ff'/>
      <Sphere
        args={[0.45 /(level+1), 32, 32]}
        position={[0, 0, 0]}
        // onPointerOver={() => setHoveredNode(name)}
        // onPointerOut={() => setHoveredNode(null)}
        onClick={onClick}
      >
              <Sphere args={[0.1/(level+2),32,32]} position={[0,0,0]}>
                <meshStandardMaterial emissive={"white"} emissiveIntensity={0.1 } roughness={0} color={color} roughness={0}/>

                </Sphere>

        <meshStandardMaterial color={color} roughness={0}/>
        <FakeGlowMaterial glowInternalRadius={10} glowSharpness={0.5} glowColor = {color} />

      </Sphere> 
      <Text position={[0, radius, 0]} fontSize={0.05 * Math.pow(0.8, level)} color="white" anchorX="center" anchorY="middle">
        {name}
      </Text>
    </group>
  );
};

export const LineBetweenNodes = ({ start, end, isHovered }) => {
  const points = [start, end];
  const color = isHovered ? 'red' : 'white'; // Change color on hover
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(...p)));

  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry} />
      <lineBasicMaterial color={color} opacity={0.1} />
      {/* <FakeGlowMaterial glowInternalRadius={10} glowSharpness={1} glowColor = {color} /> */}
    </line>
  );
};


export const Sphere1 = ({ position, texture, size, onClick, isSelected, onPointerOver, onPointerOut }) => {
  const sphereRef = useRef(); // Reference for the sphere mesh

  // Rotate the sphere on its axis
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01; // Adjust the speed of rotation here
    }
  });

  return (
    <>
      <mesh
        ref={sphereRef} // Attach the ref to the mesh
        position={position}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial attach="material" map={useLoader(TextureLoader, texture)} />
      </mesh>

      {isSelected && (
        <mesh position={position}>
          <sphereGeometry args={[size * 1.1, 32, 32]} /> {/* Slightly larger sphere */}
          <meshBasicMaterial
            color="white"
            transparent
            opacity={0.5}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </>
  );
};

export const Line = ({ start, end }) => {
  return (
    <DreiLine
      points={[start, end]}  // Start and end points of the line
      color="white"
      lineWidth={2}
    />
  );
};


export const OrbitRing = ({ radius }) => {
  return (
    <Ring args={[radius, radius + 0.1, 32]} rotation={[-Math.PI / 2,0, 0]} >
      <meshStandardMaterial color="white" transparent opacity={0.15} />
    </Ring>
  );
};

export const TextLabel = ({ position, name }) => {
    // console.log(position);
  return (
    <Text
      position={[position[0], position[1] + 1, position[2]]} // Position it above the sphere
      fontSize={0.5} // Adjust font size as needed
      color="white" // Text color
      anchorX="center" // Center the text horizontally
      anchorY="middle" // Center the text vertically
    >
      {name}
    </Text>
  );
};


// components/CanvasScene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sphere, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing'; 
import Skybox from './Skybox';
import { Node, LineBetweenNodes } from './Objects';
import * as THREE from 'three';

const CanvasScene = ({ activeNodes, createNodes, cameraPosition }) => {
  const points = [[0,0,0], [1.0893344691263294,0.009536212664063393,0.06892699613405931]];
  const color = 'red'; // Change color on hover
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(...p)));

  return (
    <Canvas style={{ height: '100vh', background: 'black' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={2} position={[10, 10, 5]} />
      {/* <Skybox /> */}
      <OrbitControls />
      <PerspectiveCamera position={cameraPosition} makeDefault />
      {/* <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.5} intensity={1} /> 
      </EffectComposer> */}

      
      {createNodes(activeNodes)}
      <Stars count={800} speed={3} />
      
    </Canvas>
  );
};

export default CanvasScene;

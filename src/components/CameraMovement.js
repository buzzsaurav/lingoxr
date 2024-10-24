import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CameraMovement = ({ isMoving, targetPlanet, cameraRef, setIsMoving, setSelectedWord }) => {
  useFrame(() => {
    if (isMoving && targetPlanet) {
      const targetPosition = targetPlanet.position;
      const targetCameraPosition = new THREE.Vector3(targetPosition[0]+5, targetPosition[1]+1, targetPosition[2]+5); // Adjusted the offset

      // Calculate the direction vector from the current camera position to the target position
      const direction = new THREE.Vector3().subVectors(targetCameraPosition, cameraRef.current.position).normalize();

      // Move the camera a fixed distance towards the target position each frame
      const speed = 0.1; // Adjust this value for speed
      cameraRef.current.position.add(direction.multiplyScalar(speed));

      // Check if the camera is close enough to stop moving
      if (cameraRef.current.position.distanceTo(targetCameraPosition) < speed) {
        cameraRef.current.position.copy(targetCameraPosition); // Snap to the target position to avoid overshooting
        setIsMoving(false);
        setSelectedWord(targetPlanet.name); // Open the dialog box after reaching the new planet
      }
    }
  });

  return null; // This component doesn't render anything
};

export default CameraMovement;

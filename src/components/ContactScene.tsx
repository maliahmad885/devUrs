'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Text3D, Float } from '@react-three/drei'
import * as THREE from 'three'

// Animated Background Geometry
function AnimatedBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial 
        color="#0f0f23" 
        transparent 
        opacity={0.3}
      />
    </mesh>
  )
}

// Floating Contact Icons
function FloatingIcons() {
  const iconsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (iconsRef.current) {
      iconsRef.current.rotation.y = state.clock.elapsedTime * 0.2
      iconsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  const iconPositions = useMemo(() => [
    { x: -8, y: 3, z: 0, color: '#8b5cf6' },
    { x: 8, y: -2, z: 0, color: '#ec4899' },
    { x: -6, y: -4, z: 0, color: '#06b6d4' },
    { x: 6, y: 4, z: 0, color: '#10b981' },
  ], [])

  return (
    <group ref={iconsRef}>
      {iconPositions.map((pos, index) => (
        <Float key={index} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color={pos.color} transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Animated Grid
function AnimatedGrid() {
  const gridRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.3) * 2
    }
  })

  return (
    <mesh ref={gridRef} position={[0, 0, -5]}>
      <gridHelper args={[50, 50, "#6b7280", "#374151"]} />
    </mesh>
  )
}

// Floating Text
function FloatingText() {
  const textRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[0, 8, 0]}
      >
        CONTACT
        <meshNormalMaterial />
      </Text3D>
    </Float>
  )
}

// Main Scene Component
function Scene() {
  const { camera } = useThree()
  
  useFrame((state) => {
    // Gentle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 1
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <AnimatedBackground />
      <AnimatedGrid />
      <FloatingIcons />
      <FloatingText />
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
    </>
  )
}

export default function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }}
      style={{ background: 'linear-gradient(to bottom right, #0f0f23, #1e1b4b, #312e81)' }}
    >
      <Scene />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
} 
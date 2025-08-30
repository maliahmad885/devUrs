'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  color: THREE.Color
  size: number
  life: number
  maxLife: number
}

export default function ThreeJSParticles() {
  const meshRef = useRef<THREE.Points>(null)
  const { size, viewport } = useThree()
  
  // Create particles
  const particles = useMemo(() => {
    const temp: Particle[] = []
    const particleCount = 500 // Increased from 300 to 500
    
    for (let i = 0; i < particleCount; i++) {
      const time = Math.random() * 100
      const particle: Particle = {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15, // Reduced spread
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.15, // Increased speed significantly
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.15
        ),
        color: new THREE.Color().setHSL(
          Math.random() * 0.3 + 0.5, // Purple to blue range
          0.8,
          0.6
        ),
        size: Math.random() * 0.08 + 0.03, // Slightly smaller
        life: time,
        maxLife: 80 // Reduced life for faster cycling
      }
      temp.push(particle)
    }
    return temp
  }, [])

  // Create geometry and material
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particles.length * 3)
    const colors = new Float32Array(particles.length * 3)
    const sizes = new Float32Array(particles.length)

    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z

      colors[i * 3] = particle.color.r
      colors[i * 3 + 1] = particle.color.g
      colors[i * 3 + 2] = particle.color.b

      sizes[i] = particle.size
    })

    return { positions, colors, sizes }
  }, [particles])

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime

    // Update particle positions and properties
    particles.forEach((particle, i) => {
      // Update life
      particle.life += 1.0 // Doubled from 0.5 for faster cycling
      if (particle.life > particle.maxLife) {
        particle.life = 0
      }

      // Update position with velocity and noise
      particle.position.add(particle.velocity)
      
      // Add some wave motion (increased amplitude)
      particle.position.x += Math.sin(time * 1.0 + i * 0.1) * 0.008
      particle.position.y += Math.cos(time * 0.8 + i * 0.1) * 0.008
      particle.position.z += Math.sin(time * 1.2 + i * 0.1) * 0.008

      // Wrap around boundaries (adjusted for smaller spread)
      if (particle.position.x > 7.5) particle.position.x = -7.5
      if (particle.position.x < -7.5) particle.position.x = 7.5
      if (particle.position.y > 7.5) particle.position.y = -7.5
      if (particle.position.y < -7.5) particle.position.y = 7.5
      if (particle.position.z > 7.5) particle.position.z = -7.5
      if (particle.position.z < -7.5) particle.position.z = 7.5

      // Update geometry
      if (!meshRef.current?.geometry) return
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      const colors = meshRef.current.geometry.attributes.color.array as Float32Array
      const sizes = meshRef.current.geometry.attributes.size.array as Float32Array

      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z

      // Fade colors based on life
      const lifeRatio = particle.life / particle.maxLife
      colors[i * 3] = particle.color.r * (0.3 + 0.7 * lifeRatio)
      colors[i * 3 + 1] = particle.color.g * (0.3 + 0.7 * lifeRatio)
      colors[i * 3 + 2] = particle.color.b * (0.3 + 0.7 * lifeRatio)

      // Pulse size based on life
      sizes[i] = particle.size * (0.5 + 0.5 * Math.sin(lifeRatio * Math.PI * 2))
    })

    // Update geometry attributes
    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.geometry.attributes.color.needsUpdate = true
    meshRef.current.geometry.attributes.size.needsUpdate = true

    // Rotate the entire system (faster rotation)
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002 // Doubled speed
      meshRef.current.rotation.x += 0.001 // Doubled speed
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Enhanced Particle System with Different Types
export function AdvancedParticleSystem() {
  const groupRef = useRef<THREE.Group>(null)
  const { size, viewport } = useThree()

  // Create different types of particles
  const particleSystems = useMemo(() => {
    const systems = []
    
    // Energy particles
    for (let i = 0; i < 120; i++) { // Increased from 80 to 120
      systems.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20, // Reduced spread
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.08, // Increased speed significantly
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08
        ),
        color: new THREE.Color().setHSL(
          Math.random() * 0.2 + 0.6, // Blue to purple
          0.9,
          0.7
        ),
        size: Math.random() * 0.12 + 0.04, // Slightly smaller
        type: 'energy'
      })
    }

    // Data particles
    for (let i = 0; i < 90; i++) { // Increased from 60 to 90
      systems.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 18, // Reduced spread
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 18
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1, // Increased speed significantly
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        color: new THREE.Color().setHSL(
          Math.random() * 0.3 + 0.1, // Green to blue
          0.8,
          0.6
        ),
        size: Math.random() * 0.08 + 0.025, // Smaller
        type: 'data'
      })
    }

    // Connection particles
    for (let i = 0; i < 60; i++) { // Increased from 40 to 60
      systems.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15, // Reduced spread
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.12, // Increased speed significantly
          (Math.random() - 0.5) * 0.12,
          (Math.random() - 0.5) * 0.12
        ),
        color: new THREE.Color().setHSL(
          Math.random() * 0.2 + 0.8, // Purple to pink
          0.7,
          0.8
        ),
        size: Math.random() * 0.06 + 0.02, // Smaller
        type: 'connection'
      })
    }

    return systems
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // Update particle systems
    particleSystems.forEach((particle, i) => {
      // Update position
      particle.position.add(particle.velocity)

      // Add different behaviors based on type
      switch (particle.type) {
        case 'energy':
          // Energy particles move in waves
          particle.position.x += Math.sin(time * 0.8 + i * 0.1) * 0.006
          particle.position.y += Math.cos(time * 0.6 + i * 0.1) * 0.006
          break
        case 'data':
          // Data particles move in spirals
          const angle = time * 0.5 + i * 0.1
          particle.position.x += Math.cos(angle) * 0.004
          particle.position.y += Math.sin(angle) * 0.004
          break
        case 'connection':
          // Connection particles move towards center
          const center = new THREE.Vector3(0, 0, 0)
          const direction = center.clone().sub(particle.position).normalize()
          particle.position.add(direction.multiplyScalar(0.001))
          break
      }

      // Wrap around boundaries (adjusted for smaller spread)
      if (particle.position.x > 10) particle.position.x = -10
      if (particle.position.x < -10) particle.position.x = 10
      if (particle.position.y > 10) particle.position.y = -10
      if (particle.position.y < -10) particle.position.y = 10
      if (particle.position.z > 10) particle.position.z = -10
      if (particle.position.z < -10) particle.position.z = 10
    })

    // Rotate the entire system (faster rotation)
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003 // Increased speed
      groupRef.current.rotation.x += 0.0015 // Increased speed
    }
  })

  return (
    <group ref={groupRef}>
      {particleSystems.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
} 
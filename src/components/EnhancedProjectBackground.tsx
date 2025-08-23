'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Box, Torus, Ring, Stars, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

export default function EnhancedProjectBackground() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Detect mobile devices to reduce complexity
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Create particle system for floating elements
  const particleCount = 150
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Create color variations
      const colorVariation = Math.random()
      if (colorVariation < 0.3) {
        colors[i * 3] = 0.5 + Math.random() * 0.5     // Purple
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
      } else if (colorVariation < 0.6) {
        colors[i * 3] = 0.2 + Math.random() * 0.3     // Blue
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
      } else {
        colors[i * 3] = 0.1 + Math.random() * 0.2     // Green
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.4
        colors[i * 3 + 2] = 0.3 + Math.random() * 0.3
      }

      sizes[i] = Math.random() * 0.1 + 0.05
    }

    return { positions, colors, sizes }
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (groupRef.current) {
      // Smooth group rotation with mouse interaction
      groupRef.current.rotation.y += 0.0005 + mousePosition.x * 0.0001
      groupRef.current.rotation.z += 0.0003 + mousePosition.y * 0.0001
      
      // Animate individual elements
      groupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          // Varying animation speeds for organic movement
          const speed = 0.08 + (index * 0.03)
          const amplitude = 0.003 + (index * 0.001)
          
          child.position.y += Math.sin(time * speed + index) * amplitude
          child.rotation.x += 0.0008 + (index * 0.0003)
          child.rotation.z += 0.0006 + (index * 0.0002)
          
          // Add subtle scale animation
          const scale = 1 + Math.sin(time * 0.5 + index) * 0.02
          child.scale.setScalar(scale)
        }
      })
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0003
      particlesRef.current.rotation.x += 0.0002
    }
  })

  // Skip rendering on mobile for better performance
  if (isMobile) {
    return null
  }

  return (
    <>
      {/* Environment for better lighting */}
      <Environment preset="city" />
      
      {/* Ambient Stars with better distribution */}
      <Stars 
        radius={150} 
        depth={80} 
        count={8000} 
        factor={6} 
        saturation={0.1} 
        fade 
        speed={0.8}
      />
      
      <group ref={groupRef}>
        {/* Large Background Spheres with enhanced materials */}
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <Sphere 
            args={[2.5, 32, 32]} 
            position={[-15, 0, -12]}
          >
            <meshStandardMaterial 
              color="#8B5CF6" 
              transparent 
              opacity={0.06}
              metalness={0.3}
              roughness={0.8}
              emissive="#8B5CF6"
              emissiveIntensity={0.02}
            />
          </Sphere>
        </Float>

        <Float speed={0.7} rotationIntensity={0.3} floatIntensity={0.4}>
          <Sphere 
            args={[3, 32, 32]} 
            position={[18, 0, -15]}
          >
            <meshStandardMaterial 
              color="#3B82F6" 
              transparent 
              opacity={0.05}
              metalness={0.2}
              roughness={0.9}
              emissive="#3B82F6"
              emissiveIntensity={0.015}
            />
          </Sphere>
        </Float>

        <Float speed={0.6} rotationIntensity={0.25} floatIntensity={0.35}>
          <Sphere 
            args={[1.8, 32, 32]} 
            position={[0, 0, -18]}
          >
            <meshStandardMaterial 
              color="#10B981" 
              transparent 
              opacity={0.08}
              metalness={0.4}
              roughness={0.7}
              emissive="#10B981"
              emissiveIntensity={0.025}
            />
          </Sphere>
        </Float>

        {/* Enhanced Medium Background Elements */}
        <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.5}>
          <Box 
            args={[1.2, 1.2, 1.2]} 
            position={[-12, 0, -6]}
          >
            <meshStandardMaterial 
              color="#F59E0B" 
              transparent 
              opacity={0.1}
              metalness={0.6}
              roughness={0.4}
              emissive="#F59E0B"
              emissiveIntensity={0.03}
            />
          </Box>
        </Float>

        <Float speed={0.9} rotationIntensity={0.35} floatIntensity={0.45}>
          <Box 
            args={[1.8, 1.8, 1.8]} 
            position={[14, 0, -8]}
          >
            <meshStandardMaterial 
              color="#EF4444" 
              transparent 
              opacity={0.07}
              metalness={0.3}
              roughness={0.8}
              emissive="#EF4444"
              emissiveIntensity={0.02}
            />
          </Box>
        </Float>

        {/* Enhanced Floating Rings with better geometry */}
        <Float speed={0.6} rotationIntensity={0.5} floatIntensity={0.4}>
          <Ring 
            args={[1.8, 2.4, 16, 32]} 
            position={[-8, 6, 0]}
            rotation={[Math.PI / 4, 0, 0]}
          >
            <meshStandardMaterial 
              color="#8B5CF6" 
              transparent 
              opacity={0.12}
              metalness={0.7}
              roughness={0.3}
              emissive="#8B5CF6"
              emissiveIntensity={0.04}
            />
          </Ring>
        </Float>

        <Float speed={0.7} rotationIntensity={0.4} floatIntensity={0.5}>
          <Ring 
            args={[1.2, 1.8, 16, 32]} 
            position={[10, -4, 0]}
            rotation={[0, Math.PI / 3, Math.PI / 6]}
          >
            <meshStandardMaterial 
              color="#3B82F6" 
              transparent 
              opacity={0.1}
              metalness={0.6}
              roughness={0.4}
              emissive="#3B82F6"
              emissiveIntensity={0.03}
            />
          </Ring>
        </Float>

        {/* Enhanced Small Floating Elements with better distribution */}
        {[...Array(8)].map((_, i) => (
          <Float key={i} speed={0.5 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.4}>
            <Sphere 
              args={[0.3, 16, 16]} 
              position={[
                Math.sin(i * Math.PI / 4) * 8,
                Math.cos(i * Math.PI / 4) * 6,
                -3
              ]}
            >
              <meshStandardMaterial 
                color={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#84CC16'][i]} 
                transparent 
                opacity={0.15}
                metalness={0.7}
                roughness={0.3}
                emissive={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#84CC16'][i]}
                emissiveIntensity={0.08}
              />
            </Sphere>
          </Float>
        ))}

        {/* Enhanced Floating Cubes with better materials */}
        {[...Array(6)].map((_, i) => (
          <Float key={`cube-${i}`} speed={0.6 + i * 0.05} rotationIntensity={0.4} floatIntensity={0.5}>
            <Box 
              args={[0.4, 0.4, 0.4]} 
              position={[
                Math.sin(i * Math.PI / 3) * 6,
                Math.cos(i * Math.PI / 3) * 4,
                -2
              ]}
            >
              <meshStandardMaterial 
                color={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'][i]} 
                transparent 
                opacity={0.12}
                metalness={0.8}
                roughness={0.2}
                emissive={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'][i]}
                emissiveIntensity={0.06}
              />
            </Box>
          </Float>
        ))}

        {/* Enhanced Torus Elements */}
        <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.4}>
          <Torus 
            args={[2.2, 0.4, 16, 32]} 
            position={[0, 8, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial 
              color="#8B5CF6" 
              transparent 
              opacity={0.08}
              metalness={0.6}
              roughness={0.4}
              emissive="#8B5CF6"
              emissiveIntensity={0.03}
            />
          </Torus>
        </Float>

        <Float speed={0.7} rotationIntensity={0.4} floatIntensity={0.5}>
          <Torus 
            args={[1.5, 0.3, 16, 32]} 
            position={[0, -8, 0]}
            rotation={[Math.PI / 2, Math.PI / 4, 0]}
          >
            <meshStandardMaterial 
              color="#3B82F6" 
              transparent 
              opacity={0.06}
              metalness={0.5}
              roughness={0.5}
              emissive="#3B82F6"
              emissiveIntensity={0.025}
            />
          </Torus>
        </Float>

        {/* Floating Geometric Shapes */}
        <Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.6}>
          <Torus 
            args={[0.8, 0.2, 8, 16]} 
            position={[-6, -6, 0]}
            rotation={[Math.PI / 4, Math.PI / 6, 0]}
          >
            <meshStandardMaterial 
              color="#F59E0B" 
              transparent 
              opacity={0.2}
              metalness={0.8}
              roughness={0.2}
              emissive="#F59E0B"
              emissiveIntensity={0.05}
            />
          </Torus>
        </Float>

        <Float speed={0.9} rotationIntensity={0.6} floatIntensity={0.7}>
          <Box 
            args={[0.6, 0.6, 0.6]} 
            position={[6, 6, 0]}
          >
            <meshStandardMaterial 
              color="#EC4899" 
              transparent 
              opacity={0.18}
              metalness={0.9}
              roughness={0.1}
              emissive="#EC4899"
              emissiveIntensity={0.07}
            />
          </Box>
        </Float>
      </group>

      {/* Enhanced Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particlePositions.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[particlePositions.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
} 
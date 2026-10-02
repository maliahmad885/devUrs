'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.005
    groupRef.current.children.forEach((child, index) => {
      child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.002
      child.rotation.x += 0.01
      child.rotation.z += 0.005
    })
  })

  return (
    <group ref={groupRef}>
      <Sphere
        args={[0.5, 32, 32]}
        position={[-3, 2, 0]}
        onPointerOver={() => setHovered('sphere')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial
          color={hovered === 'sphere' ? '#22c55e' : '#0ea5e9'}
          transparent
          opacity={0.8}
          metalness={0.1}
          roughness={0.2}
        />
      </Sphere>

      <Box
        args={[0.8, 0.8, 0.8]}
        position={[3, -1, 0]}
        onPointerOver={() => setHovered('cube')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial
          color={hovered === 'cube' ? '#f59e0b' : '#d97706'}
          transparent
          opacity={0.7}
          metalness={0.3}
          roughness={0.1}
        />
      </Box>

      <Torus
        args={[1, 0.3, 16, 32]}
        position={[0, 3, 0]}
        onPointerOver={() => setHovered('torus')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial
          color={hovered === 'torus' ? '#16a34a' : '#15803d'}
          transparent
          opacity={0.6}
          metalness={0.2}
          roughness={0.3}
        />
      </Torus>
    </group>
  )
}

const AnimatedGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    const material = gridRef.current?.material
    if (material && !Array.isArray(material)) {
      material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return <gridHelper ref={gridRef} args={[20, 20, '#22c55e', '#0ea5e9']} position={[0, -5, 0]} />
}

/**
 * Decorative WebGL background. Only rendered on large screens for users who
 * have not asked for reduced motion, and paused while the tab is hidden, so
 * phones and laptops on battery are not running a GPU loop for decoration.
 */
export default function ThreeDBackground() {
  const [enabled, setEnabled] = useState(false)
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener('change', update)

    const onVisibility = () => setFrameloop(document.hidden ? 'never' : 'always')
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      query.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="fixed inset-0 -z-10 opacity-30" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 1.5]}
        frameloop={frameloop}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22c55e" />

        <FloatingElements />
        <AnimatedGrid />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

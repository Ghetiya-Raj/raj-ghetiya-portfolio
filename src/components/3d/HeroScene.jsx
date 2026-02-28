import { useRef, useMemo, Suspense, memo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

/* ────────────── Sub-components ────────────── */

/** Rotating torus knot — flagship object */
function TorusKnotMesh() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.18
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.24
  })
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.4, 0.42, 180, 20]} />
        <meshStandardMaterial
          color="#00ffc8"
          emissive="#00ffc8"
          emissiveIntensity={0.12}
          metalness={0.9}
          roughness={0.08}
          wireframe={false}
        />
      </mesh>
    </Float>
  )
}

/** Orbiting small spheres */
function OrbitSphere({ radius, speed, offset, color, size = 0.18 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed + offset
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.sin(t * 0.7) * 0.6
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.7}
        roughness={0.1}
      />
    </mesh>
  )
}

/** Background particle field */
function ParticleField() {
  const pointsRef = useRef()
  const count = 400

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#00ffc8"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

/** Mouse parallax for the whole scene */
function SceneParallax({ children }) {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

  useFrame(() => {
    camera.position.x += (mouseRef.current.x * 0.8 - camera.position.x) * 0.04
    camera.position.y += (-mouseRef.current.y * 0.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return (
    <group
      onPointerMove={(e) => {
        mouseRef.current = {
          x: (e.point.x / e.eventObject.scale.x) * 0.5,
          y: (e.point.y / e.eventObject.scale.y) * 0.5,
        }
      }}
    >
      {children}
    </group>
  )
}

/* ────────────── Main scene ────────────── */

const HeroScene = memo(function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#00ffc8" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#ff4da6" />
        <pointLight position={[0, 8, 0]} intensity={0.5} color="#a855f7" />

        {/* Objects */}
        <TorusKnotMesh />
        <OrbitSphere radius={3.2} speed={0.5} offset={0} color="#ff4da6" size={0.22} />
        <OrbitSphere radius={2.6} speed={0.8} offset={2.1} color="#a855f7" size={0.16} />
        <OrbitSphere radius={3.8} speed={0.35} offset={4.2} color="#00ffc8" size={0.14} />
        <OrbitSphere radius={2} speed={1.1} offset={1.5} color="#06b6d4" size={0.12} />

        <ParticleField />
      </Suspense>
    </Canvas>
  )
})

export default HeroScene

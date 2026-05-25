import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { ShoppingBag, Check } from "lucide-react";
import { merchItems } from "../lib/menuData";

// 3D Mug Component
function Mug3D({ color = "#C4A484" }: { color?: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Mug body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 2, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Mug bottom */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[1, 0.9, 0.1, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Handle */}
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.5, 0.15, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Coffee inside */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
        <meshStandardMaterial color="#3C2A1E" roughness={0.8} />
      </mesh>
      {/* Logo text */}
      <Text
        position={[0, 0.3, 1]}
        fontSize={0.3}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        CΛFFEINO
      </Text>
    </group>
  );
}

// 3D Tumbler Component
function Tumbler3D() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 2.5, 32]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.2} metalness={0.3} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.7, 0.8, 0.1, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.2} />
      </mesh>
      <Text position={[0, 0.5, 0.8]} fontSize={0.2} color="#C4A484" anchorX="center">
        CΛFFEINO
      </Text>
    </group>
  );
}

// 3D Coffee Bag
function CoffeeBag3D() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 0.5]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      <Text position={[0, 0.3, 0.26]} fontSize={0.2} color="#C4A484" anchorX="center">
        CΛFFEINO
      </Text>
      <Text position={[0, 0, 0.26]} fontSize={0.15} color="#FFFFFF" anchorX="center">
        HOUSE BLEND
      </Text>
    </group>
  );
}

function ProductViewer({ type }: { type: "mug" | "tumbler" | "bag" }) {
  return (
    <div className="aspect-square rounded-xl bg-bg-elevated overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#C4A484" />
        {type === "mug" && <Mug3D />}
        {type === "tumbler" && <Tumbler3D />}
        {type === "bag" && <CoffeeBag3D />}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}

export default function Merch() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const productTypes: Record<string, "mug" | "tumbler" | "bag"> = {
    "mug-01": "mug",
    "tumbler-01": "tumbler",
    "beans-01": "bag",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16"
    >
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Merchandise
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">
            Take Caffeino Home
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Premium merchandise for the true coffee enthusiast. Crafted with the same attention to detail as our coffee.
          </p>
        </motion.div>

        {/* 3D Product Showcase */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {merchItems.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              {productTypes[item.id] ? (
                <ProductViewer type={productTypes[item.id]} />
              ) : (
                <div className="aspect-square rounded-xl bg-bg-elevated flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-text-muted" />
                </div>
              )}
              <div className="mt-6">
                <h3 className="text-text-primary font-medium text-lg mb-2">{item.name}</h3>
                <p className="text-text-secondary text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-accent text-xl font-bold">AED {item.price}</span>
                  <button
                    onClick={() => setSelectedProduct(selectedProduct === item.id ? null : item.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedProduct === item.id
                        ? "bg-green-500/20 text-green-400"
                        : "bg-accent text-bg-dark hover:bg-accent-hover"
                    }`}
                  >
                    {selectedProduct === item.id ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4" /> Added
                      </span>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
                {!item.inStock && (
                  <p className="text-text-muted text-xs mt-2">Coming soon</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other items */}
        <div className="grid md:grid-cols-2 gap-6">
          {merchItems.slice(3).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card rounded-xl p-6 flex gap-6 items-center"
            >
              <div className="w-24 h-24 rounded-xl bg-bg-elevated flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-10 h-10 text-text-muted" />
              </div>
              <div>
                <h3 className="text-text-primary font-medium text-lg mb-1">{item.name}</h3>
                <p className="text-text-secondary text-sm mb-3">{item.description}</p>
                <span className="text-accent font-bold">AED {item.price}</span>
                {!item.inStock && (
                  <span className="ml-3 text-text-muted text-xs">Coming soon</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shop coming soon notice */}
        <div className="mt-16 glass-card rounded-xl p-8 text-center">
          <ShoppingBag className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="text-text-primary text-xl font-medium mb-2">
            Full Shop Coming Soon
          </h3>
          <p className="text-text-secondary max-w-md mx-auto">
            We're working on integrating our full merchandise store. For now, visit any of our branches to purchase these items in person.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

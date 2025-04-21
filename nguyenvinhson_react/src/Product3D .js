import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Product3D = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath); // Sử dụng useGLTF để load file .glb
  const ref = useRef();

  // Xoay mô hình khi rê chuột vào
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Tốc độ xoay (có thể chỉnh sửa)
    }
  });

  return <primitive ref={ref} object={scene} scale={4} />;
};

const Product3DViewer = ({ modelPath }) => {
  return (
    <Canvas
      style={{
        width: "280px",
        height: "280px",
        display: "block",
        margin: "0 auto",
      }}
      camera={{ position: [0, 1, 5], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Product3D modelPath={modelPath} />
      </Suspense>
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default Product3DViewer;

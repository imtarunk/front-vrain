import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  size: number;
  duration: number;
};

const AnimatedBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleArray: Particle[] = new Array(20).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-hidden flex justify-center items-center">
      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-30"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{ y: ["100vh", "-10vh"], opacity: [0.1, 0.6, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <h1 className="text-white text-4xl font-bold">Welcome to Vrain</h1>
    </div>
  );
};

export default AnimatedBackground;

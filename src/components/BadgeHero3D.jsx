import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FloatingBadge = ({ delay = 0, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 100, rotateY: -180 }}
    animate={{ 
      opacity: 1, 
      y: 0, 
      rotateY: 0,
      rotateX: [0, 10, 0],
    }}
    transition={{ 
      duration: 1.2, 
      delay,
      rotateX: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
    whileHover={{ 
      scale: 1.1, 
      rotateY: 15,
      transition: { duration: 0.3 }
    }}
    className="absolute"
  >
    {children}
  </motion.div>
);

const ParticleField = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default function BadgeHero3D() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [currentBadge, setCurrentBadge] = useState(0);
  const badges = ['🏆', '🥇', '⭐', '💎', '🎖️'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBadge((prev) => (prev + 1) % badges.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
      <ParticleField />
      
      {/* Floating Badges */}
      <FloatingBadge delay={0.2}>
        <div className="top-20 left-20 text-6xl opacity-20">🏆</div>
      </FloatingBadge>
      <FloatingBadge delay={0.4}>
        <div className="top-32 right-32 text-4xl opacity-30">⭐</div>
      </FloatingBadge>
      <FloatingBadge delay={0.6}>
        <div className="bottom-40 left-40 text-5xl opacity-25">🥇</div>
      </FloatingBadge>
      <FloatingBadge delay={0.8}>
        <div className="bottom-20 right-20 text-3xl opacity-35">💎</div>
      </FloatingBadge>
      
      <motion.div 
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white"
        style={{ y: y1, opacity }}
      >
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
          className="text-center mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBadge}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-8xl mb-4"
            >
              {badges[currentBadge]}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        <motion.h1 
          className="text-6xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.span
            animate={{ 
              background: [
                "linear-gradient(45deg, #FFD700, #FFA500)",
                "linear-gradient(45deg, #FFA500, #FF6347)",
                "linear-gradient(45deg, #FF6347, #FFD700)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
          >
            Lencana Malaysia
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-xl mb-8 text-center max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Earn 3D Interactive Badges Through Cross-Curricular Learning
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex gap-4"
        >
          <Link to="/badges">
            <motion.button 
              className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(255, 204, 0, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Start Learning</span>
            </motion.button>
          </Link>
          
          <Link to="/about">
            <motion.button 
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
        style={{ y: y2 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-center">
          <div className="text-sm mb-2">Scroll to explore</div>
          <motion.div 
            className="w-6 h-10 border-2 border-white rounded-full mx-auto relative"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="w-1 h-3 bg-white rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
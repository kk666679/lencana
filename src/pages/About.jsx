import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';

export default function About() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-12">

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Lencana Malaysia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Inspiring Malaysian students through immersive, gamified 3D badge learning.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatedCard delay={0.3} className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🇲🇾</div>
            <h3 className="text-xl font-semibold mb-4">Malaysian Heritage</h3>
            <p className="text-gray-600">
              Embracing our national identity through culturally relevant learning experiences.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.4} className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-4">Educational Alignment</h3>
            <p className="text-gray-600">
              Designed in harmony with KSSR and KSSM curricula for structured, holistic education.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.5} className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-4">Gamified Progress</h3>
            <p className="text-gray-600">
              Track learning through interactive 3D badges and achievement milestones.
            </p>
          </AnimatedCard>
        </div>

        {/* Mission Statement */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-12 mb-16"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            Our mission is to reimagine education in Malaysia by building a vibrant, interactive platform that 
            celebrates local culture, nurtures 21st-century competencies, and engages students through cutting-edge 
            gamification using 3D badges and integrated learning pathways.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
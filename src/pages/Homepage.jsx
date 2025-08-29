import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedCard from '../components/AnimatedCard';
import { Award, BookOpen, Users, TrendingUp, Star, Zap } from 'lucide-react';

export default function Homepage() {
  const features = [
    { icon: Award, title: "3D Badges", desc: "Interactive Malaysian heritage badges" },
    { icon: BookOpen, title: "Cross-Curricular", desc: "14 subjects integrated learning" },
    { icon: Users, title: "Collaborative", desc: "Team-based learning activities" },
    { icon: TrendingUp, title: "Progress Tracking", desc: "Real-time learning analytics" },
    { icon: Star, title: "Gamified", desc: "Engaging reward systems" },
    { icon: Zap, title: "Interactive", desc: "Immersive 3D experiences" }
  ];

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Learn. Earn. <span className="text-yellow-400">Excel.</span>
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 opacity-90"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.9 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Malaysia's premier cross-curricular learning platform with interactive 3D badges
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link to="/badges">
                <motion.button 
                  className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg text-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 204, 0, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Badges
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button 
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Lencana Malaysia?</h2>
            <p className="text-xl text-gray-600">Innovative features designed for Malaysian education</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedCard 
                key={feature.title}
                delay={0.1 * index}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="text-white" size={32} />
                </motion.div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Interactive Badges" },
              { number: "14", label: "Subject Areas" },
              { number: "1000+", label: "Active Students" },
              { number: "95%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold mb-2"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of Malaysian students already earning badges and excelling in their studies
            </p>
            <Link to="/signup">
              <motion.button 
                className="px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg text-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
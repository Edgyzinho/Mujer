/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateWomensDayMessage } from './services/ai';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; scale: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", x: `${heart.x}vw`, opacity: 0, scale: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 0],
            scale: heart.scale,
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute text-rose-200/40"
        >
          <Heart fill="currentColor" size={24} />
        </motion.div>
      ))}
    </div>
  );
};

const CuteRose = ({ size = 36, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 21C12 21 12 10 12 10" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      className="text-emerald-600"
    />
    <path 
      d="M12 16C12 16 15 14 16 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      className="text-emerald-500"
    />
    <path 
      d="M12 14C12 14 9 13 8 11" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      className="text-emerald-500"
    />
    <path 
      d="M12 8C14.2091 8 16 6.20914 16 4C16 1.79086 14.2091 0 12 0C9.79086 0 8 1.79086 8 4C8 6.20914 9.79086 8 12 8Z" 
      fill="currentColor" 
      className="text-rose-500"
    />
    <path 
      d="M12 8C12 8 14 9 15 10C16 11 16 12 15 13C14 14 12 13 12 13" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      className="text-rose-600"
    />
    <path 
      d="M12 8C12 8 10 9 9 10C8 11 8 12 9 13C10 14 12 13 12 13" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      className="text-rose-600"
    />
    <circle cx="12" cy="4" r="3" fill="#ff99aa" fillOpacity="0.5" />
  </svg>
);

const HeartTree = () => {
  const treeHearts = useMemo(() => {
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#ff4500', '#da70d6', '#ffc0cb', '#ff0000', '#ffffff'];
    return Array.from({ length: 200 }).map((_, i) => {
      // Heart curve formula for better shape
      const t = Math.random() * Math.PI * 2;
      // Use sqrt for better distribution towards the edge, but allow some randomness for filling
      const r = Math.sqrt(Math.random());
      
      // Heart Curve: 16sin^3(t), 13cos(t)-5cos(2t)-2cos(3t)-cos(4t)
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
      
      // Scale and position
      const size = 5.5; 
      const x = hx * size * r;
      const y = -hy * size * r - 60; // Move up to sit on trunk

      return {
        id: i,
        x,
        y,
        scale: 0.4 + Math.random() * 0.8,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        swayDuration: 3 + Math.random() * 2,
      };
    });
  }, []);

  const fallingPetals = useMemo(() => {
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#ff4500', '#da70d6', '#ffc0cb'];
    return Array.from({ length: 50 }).map((_, i) => {
      const xStart = (Math.random() - 0.5) * 120;
      const swayAmount = 30 + Math.random() * 60;
      
      return {
        id: i,
        xStart,
        yStart: (Math.random() - 0.5) * 60 - 60,
        delay: Math.random() * 15, // Spread out start times more
        duration: 12 + Math.random() * 8, // Much slower: 12-20s
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.3 + Math.random() * 0.5,
        swayAmount,
      };
    });
  }, []);

  return (
    <div className="relative w-72 h-96 flex flex-col items-center justify-end">
      {/* Trunk */}
      <div className="w-6 h-40 bg-gradient-to-b from-emerald-800 to-emerald-900 rounded-full relative z-10 mx-auto">
         <div className="absolute bottom-0 w-12 h-4 bg-emerald-900/50 rounded-full -left-3 blur-sm" />
      </div>
      
      {/* Crown Container with Sway Animation */}
      <motion.div 
        className="absolute bottom-32 left-1/2 w-0 h-0"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {treeHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0 }}
            animate={{ 
              scale: [heart.scale, heart.scale * 1.2, heart.scale],
              rotate: [heart.rotation, heart.rotation + 15, heart.rotation - 15, heart.rotation]
            }}
            transition={{
              duration: heart.swayDuration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              left: heart.x,
              top: heart.y,
              color: heart.color,
              zIndex: 20,
            }}
          >
            <Heart fill="currentColor" size={14} className="drop-shadow-sm" />
          </motion.div>
        ))}
      </motion.div>

      {/* Falling Petals */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-0 h-0 pointer-events-none z-30">
        {fallingPetals.map((petal) => (
           <motion.div
             key={`falling-${petal.id}`}
             initial={{ y: petal.yStart, x: petal.xStart, opacity: 0, scale: 0, rotateX: 0, rotateY: 0 }}
             animate={{ 
               y: 220, 
               opacity: [0, 1, 1, 1, 0],
               rotate: [0, 45, 90, 180, 360],
               rotateX: [0, 90, 180, 270, 360],
               rotateY: [0, 90, 180, 270, 360],
               x: [
                 petal.xStart, 
                 petal.xStart + petal.swayAmount, 
                 petal.xStart - petal.swayAmount, 
                 petal.xStart + petal.swayAmount * 0.5, 
                 petal.xStart
               ]
             }}
             transition={{
               duration: petal.duration,
               repeat: Infinity,
               delay: petal.delay,
               ease: "linear",
               times: [0, 0.1, 0.8, 0.95, 1] // Custom timing for opacity/motion
             }}
             style={{
               position: 'absolute',
               color: petal.color
             }}
           >
             <Heart fill="currentColor" size={14} style={{ transform: `scale(${petal.scale})` }} />
           </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [message, setMessage] = useState<string>(`Feliz **Dia das Mulheres**! 🌹

Que a força, a coragem e a delicadeza de vocês continuem inspirando o mundo todos os dias. Vocês tornam a vida muito mais bonita e especial. ❤️`);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerateMessage = async () => {
    setLoading(true);
    const newMessage = await generateWomensDayMessage();
    if (newMessage) {
      setMessage(newMessage);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex items-center justify-center p-4 overflow-hidden relative">
      <FloatingHearts />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      <div className={`z-10 w-full transition-all duration-700 ease-spring ${isOpen ? 'max-w-4xl' : 'max-w-md'}`}>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="font-serif text-4xl md:text-6xl text-gray-800 mb-3 drop-shadow-sm">
            Feliz Dia das Mulheres
          </h1>
          <p className="text-gray-600 font-sans text-lg">
            Uma homenagem especial para você
          </p>
        </motion.div>

        <div className={`relative perspective-1000 transition-all duration-700 ease-spring ${isOpen ? 'h-[600px] md:h-[500px]' : 'h-[450px]'}`}>
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed"
                layoutId="card"
                onClick={() => setIsOpen(true)}
                className="absolute inset-0 w-full h-full cursor-pointer"
                whileHover={{ scale: 1.03, rotate: -2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: -90, opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="w-full h-full bg-white/80 rounded-3xl shadow-xl border-2 border-white/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 to-purple-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 bg-gradient-to-tr from-rose-100 to-pink-100 rounded-full flex items-center justify-center mb-8 text-rose-500 relative z-10 shadow-inner"
                  >
                    <Heart size={48} fill="currentColor" className="drop-shadow-sm" />
                  </motion.div>
                  
                  <h2 className="font-serif text-3xl text-gray-800 mb-3 relative z-10">
                    Para Você
                  </h2>
                  <p className="text-gray-500 font-medium relative z-10">
                    Toque para abrir seu presente
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="open"
                layoutId="card"
                className="absolute inset-0 w-full h-full"
                initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="w-full h-full bg-white/95 rounded-3xl shadow-2xl border-2 border-white/60 backdrop-blur-xl flex flex-col p-6 md:p-8 relative overflow-hidden">
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="absolute top-5 right-5 text-gray-400 hover:text-rose-500 transition-colors bg-gray-50 rounded-full p-1 z-20"
                  >
                    ✕
                  </motion.button>

                  <div className="flex-1 flex flex-col md:flex-row items-center gap-8 overflow-y-auto scrollbar-hide">
                    
                    {/* Text Section */}
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="mb-4 text-rose-500"
                      >
                        <CuteRose size={48} />
                      </motion.div>
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={message}
                          initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="font-serif text-lg md:text-xl text-gray-800 leading-relaxed italic w-full"
                        >
                           <ReactMarkdown 
                             components={{
                               p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                               strong: ({node, ...props}) => <span className="font-bold text-rose-600" {...props} />
                             }}
                           >
                             {message}
                           </ReactMarkdown>
                        </motion.div>
                      </AnimatePresence>

                      <div className="mt-6 flex gap-3 justify-center md:justify-start w-full">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleGenerateMessage}
                          disabled={loading}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white rounded-full text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-500/30"
                        >
                          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                          {loading ? "Criando mágica..." : "Nova Mensagem"}
                        </motion.button>
                      </div>
                    </div>

                    {/* Tree Section */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                      className="shrink-0"
                    >
                      <HeartTree />
                    </motion.div>

                  </div>
                  
                  <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                     <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Com amor e carinho Enzoo</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

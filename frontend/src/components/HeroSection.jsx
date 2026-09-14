import { motion } from 'framer-motion';
import { Shield, Eye, Terminal, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [glitchTrigger, setGlitchTrigger] = useState(false);

  // Randomly trigger strong glitches for maximum hook effect on text
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchTrigger(true);
      setTimeout(() => setGlitchTrigger(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Universal timeline for perfectly synced combat
  const syncTimes = [0, 0.2, 0.25, 0.4, 0.5, 0.65, 0.8, 1];
  const battleDuration = 15; // Increased duration a lot to minimize and smooth out the aggressive speed

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white selection:bg-green-500 selection:text-black">
      
      {/* 1. STATIC BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-center bg-cover bg-no-repeat w-full h-full"
        style={{ backgroundImage: 'url(/bg_hacker.png)' }}
      />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px' }}></div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]"></div>

      {/* 2. SMOOTHER, SLOWER CHOREOGRAPHY WITH NAMES */}
      <div className="absolute inset-0 z-10 pointer-events-none">
         
         {/* Black Hat (The Attacker) */}
         <motion.div 
            className="absolute top-0 left-0 flex flex-col items-center justify-center"
            animate={{ 
               x: ['-10vw', '35vw', '25vw', '38vw', '38vw', '38vw', '38vw', '-10vw'], // Less distance horizontally
               y: ['40vh', '40vh', '40vh', '30vh', '30vh', '120vh', '120vh', '40vh'], // Less distance vertically
               scale: [0.8, 0.8, 0.7, 1, 0.8, 0.4, 0, 0],
               rotate: [0, 15, -10, 20, 10, -45, -45, 0] // Soft bouncing rotation, no spinning
            }}
            transition={{ duration: battleDuration, times: syncTimes, repeat: Infinity, ease: "easeInOut" }}
         >
            <img 
               src="/bad_hacker.png" 
               alt="Bad Hacker"
               className="object-cover rounded-full border-2 border-red-500 shadow-[0_0_40px_rgba(255,0,0,0.8)]"
               style={{ width: 140, height: 140 }}
            />
            <span className="mt-3 font-mono font-bold text-sm tracking-widest text-red-500 bg-black/70 px-3 py-1 rounded-md backdrop-blur-md border border-red-500/50">
               BLACK HAT
            </span>
         </motion.div>

         {/* White Hat (The Defender) */}
         <motion.div
            className="absolute top-0 left-0 flex flex-col items-center justify-center"
            animate={{ 
               x: ['110vw', '60vw', '68vw', '58vw', '58vw', '58vw', '110vw', '110vw'], // Smoother entrance
               y: ['40vh', '40vh', '40vh', '30vh', '30vh', '30vh', '40vh', '40vh'],
               scale: [0.9, 0.9, 1, 1.2, 1.2, 1.2, 0.9, 0.9],
               rotate: [0, -10, 5, -5, -5, 0, 0, 0]
            }}
            transition={{ duration: battleDuration, times: syncTimes, repeat: Infinity, ease: "easeInOut" }}
         >
           <div className="relative">
             <motion.div
               animate={{ boxShadow: ['0 0 0px rgba(0,100,255,0)', '0 0 50px rgba(0,100,255,1)', '0 0 20px rgba(0,100,255,0.5)', '0 0 80px rgba(0,150,255,1)', '0 0 80px rgba(0,150,255,1)', '0 0 40px rgba(0,100,255,0.8)', '0 0 0px rgba(0,100,255,0)', '0 0 0px rgba(0,100,255,0)'] }}
               transition={{ duration: battleDuration, times: syncTimes, repeat: Infinity, ease: "easeInOut" }}
               className="rounded-full"
             >
                <img 
                   src="/white_hat_hacker.png" 
                   alt="White Hat Hacker"
                   className="object-cover rounded-full border-2 border-blue-500 shadow-[0_0_30px_rgba(0,100,255,0.6)]"
                   style={{ width: 140, height: 140 }}
                />
             </motion.div>
           </div>
           <span className="mt-3 font-mono font-bold text-sm tracking-widest text-blue-400 bg-black/70 px-3 py-1 rounded-md backdrop-blur-md border border-blue-500/50">
               WHITE HAT
           </span>
         </motion.div>

         {/* Red Hat (Vigilante / Takedown) */}
         <motion.div 
            className="absolute top-0 left-0 z-20 flex flex-col items-center justify-center"
            animate={{ 
               x: ['38vw', '38vw', '38vw', '38vw', '38vw', '38vw', '38vw', '38vw'], // Aligns vertically over Black Hat's 38vw spot
               y: ['-40vh', '-40vh', '-40vh', '-40vh', '30vh', '120vh', '120vh', '-40vh'], // Takedown drag
               scale: [1, 1, 1, 1, 1.1, 1, 1, 1]
            }}
            transition={{ duration: battleDuration, times: syncTimes, repeat: Infinity, ease: "anticipate" }}
         >
            <img 
               src="/red_hat_hacker.png" 
               alt="Red Hat Hacker"
               className="object-cover rounded-full border-2 border-orange-500 shadow-[0_0_60px_rgba(255,80,0,1)]"
               style={{ width: 160, height: 160 }}
            />
            <span className="mt-3 font-mono font-bold text-sm tracking-widest text-orange-500 bg-black/70 px-3 py-1 rounded-md backdrop-blur-md border border-orange-500/50">
               RED HAT
            </span>
         </motion.div>

         {/* Elite Hacker (The Boss Patrol) - Reduced to slow hover patrol */}
         <motion.div 
            className="absolute top-0 left-0 flex flex-col items-center justify-center"
            animate={{ 
               x: ['-10vw', '110vw', '110vw', '-10vw'], // Gentle float across width
               y: ['10vh', '30vh', '10vh', '30vh'],     // Gentle float height
               scale: [0.9, 1, 0.9, 1],
               rotate: [0, 5, -5, 0] // minimal rotation
            }}
            transition={{ duration: battleDuration * 1.5, repeat: Infinity, ease: "easeInOut" }}
         >
            <img 
               src="/elite_hacker.png" 
               alt="Elite Hacker"
               className="object-cover rounded-full border-2 border-purple-500 shadow-[0_0_60px_rgba(150,0,255,0.9)]"
               style={{ width: 160, height: 160 }}
            />
            <span className="mt-3 font-mono font-bold text-sm tracking-widest text-purple-400 bg-black/70 px-3 py-1 rounded-md backdrop-blur-md border border-purple-500/50">
               ELITE HACKER
            </span>
         </motion.div>

         {/* Gray Hat (The Fast Chaos Element) - Much slower and smoother path */}
         <motion.div 
            className="absolute top-0 left-0 flex flex-col items-center justify-center"
            animate={{ 
               x: ['100vw', '20vw', '80vw', '40vw', '100vw'],
               y: ['-10vh', '90vh', '0vh', '80vh', '-10vh'],
               rotate: [0, 10, -10, 20, 0]
            }}
            transition={{ duration: battleDuration, repeat: Infinity, ease: "easeInOut" }}
         >
            <img 
               src="/gray_hat_hacker.png" 
               alt="Gray Hat Hacker"
               className="object-cover rounded-full border-2 border-gray-400 shadow-[0_0_30px_rgba(200,200,200,0.8)]"
               style={{ width: 110, height: 110 }}
            />
            <span className="mt-3 font-mono font-bold text-sm tracking-widest text-gray-300 bg-black/70 px-3 py-1 rounded-md backdrop-blur-md border border-gray-400/50">
               GRAY HAT
            </span>
         </motion.div>

      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center flex flex-col items-center max-w-7xl pt-20 pb-16 md:pt-24 md:pb-20">
        
        {/* Core Main Title Block */}
        <div className="flex flex-col items-center mb-6 md:mb-8 mt-8 md:mt-10 font-sans w-full">
          
          <motion.div 
            initial={{ scale: 0, rotateX: 90 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="flex items-center justify-center space-x-2 text-green-500 font-mono tracking-widest text-[10px] sm:text-xs md:text-sm mb-4 bg-black/70 px-4 py-1.5 rounded-full border border-green-500/40 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.3)]"
          >
             <Terminal className="w-4 h-4" /> <span>FANOS SEC // PLATFORM.ONLINE</span>
          </motion.div>

          <motion.p 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-mono text-[10px] sm:text-xs md:text-base tracking-[0.25em] uppercase text-cyber-cyan font-bold mb-3 md:mb-4 drop-shadow-md"
          >
            BUILD. PRACTICE. DEFEND.
          </motion.p>
          
          {/* Intense Neon Glitch Text Effect */}
          <div className="relative w-full flex justify-center">
            <motion.h1 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, x: glitchTrigger ? [0, -5, 5, -5, 5, 0] : 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-[2.8rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] font-black tracking-[-0.07em] leading-[0.82] text-green-500 mb-2 z-10 relative drop-shadow-[0_0_18px_rgba(0,255,65,0.8)]"
              style={{ textShadow: "0 0 25px rgba(0,255,65,1), 0 0 60px rgba(0,255,65,0.6)" }}
            >
              FANOS SEC
            </motion.h1>
            <motion.h1 
              animate={{ opacity: glitchTrigger ? 0.8 : 0, x: glitchTrigger ? 10 : 0 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 text-[2.8rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] font-black tracking-[-0.07em] leading-[0.82] text-red-500 mb-2 z-0 pointer-events-none"
            >
              FANOS SEC
            </motion.h1>
            <motion.h1 
              animate={{ opacity: glitchTrigger ? 0.8 : 0, x: glitchTrigger ? -10 : 0 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 text-[2.8rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] font-black tracking-[-0.07em] leading-[0.82] text-blue-500 mb-2 z-0 pointer-events-none"
            >
              FANOS SEC
            </motion.h1>
          </div>

          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-3xl md:text-5xl font-black tracking-[-0.04em] text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] max-w-6xl mx-auto leading-[1.05]"
          >
            Build Real-World Cybersecurity Skills
          </motion.div>
        </div>

        {/* Typing effect Subtitle Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-4xl text-sm sm:text-base md:text-xl leading-relaxed text-gray-200 mb-8 md:mb-10 font-normal tracking-wide bg-black/75 p-4 sm:p-5 md:p-6 rounded-2xl backdrop-blur-lg shadow-[0_0_25px_rgba(0,0,0,0.9)] border border-white/10"
        >
          Master offensive and defensive cybersecurity through structured courses, career learning paths, hands-on browser labs, and verifiable certifications.
        </motion.p>

        {/* Vibrant Pulsing Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 300 }}
          className="flex flex-col sm:flex-row gap-6 relative z-30"
        >
          <Link to="/courses">
            <motion.button 
              animate={{ boxShadow: ["0 0 15px #00FF41", "0 0 45px #00FF41", "0 0 15px #00FF41"] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.06, backgroundColor: "#ffffff" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#00FF41] text-black font-extrabold uppercase tracking-wider text-base sm:text-lg py-4 px-10 rounded-xl border-2 border-[#00FF41] flex items-center justify-center transition-all cursor-pointer relative overflow-hidden group shadow-[0_0_25px_rgba(0,255,65,0.7)]"
            >
              <Shield className="w-6 h-6 mr-3 text-black group-hover:text-green-600" style={{ strokeWidth: 2.5 }} />
              <span>START TRAINING</span>
              {/* Button Shine effect */}
              <motion.div 
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 1.5, ease: 'easeIn', repeat: Infinity, repeatDelay: 2 }}
                className="absolute top-0 bottom-0 w-8 bg-white/50 skew-x-[30deg]"
              />
            </motion.button>
          </Link>
          
          <Link to="/about">
            <motion.button 
              whileHover={{ scale: 1.06, backgroundColor: "#00FF41", color: "black", boxShadow: "0 0 40px #00FF41" }}
              whileTap={{ scale: 0.95 }}
              className="bg-black/70 backdrop-blur-md border-2 border-[#00FF41] text-[#00FF41] font-extrabold uppercase tracking-wider text-base sm:text-lg py-4 px-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-[0_0_20px_rgba(0,255,65,0.3)]"
            >
              <Eye className="w-6 h-6 mr-3" />
              <span>ABOUT PLATFORM</span>
            </motion.button>
          </Link>
        </motion.div>

      </div>
      
      {/* Visual Glitch Frame Overlay */}
      <motion.div 
        animate={{ opacity: glitchTrigger ? [0, 1, 0] : 0 }}
        className="absolute inset-0 pointer-events-none border-8 border-red-500/50 z-50 mix-blend-overlay"
      />
    </section>
  );
}

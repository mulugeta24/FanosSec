import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import Interactive3DRoles from '../components/Interactive3DRoles';
import OurCourses from '../components/OurCourses';
import TestimonialsSection from '../components/TestimonialsSection';
import MentorsSection from '../components/MentorsSection';
import PlatformOverviewSection from '../components/PlatformOverviewSection';
import LearningPathsSection from '../components/LearningPathsSection';
import HandsOnLabsSection from '../components/HandsOnLabsSection';
import ChallengesSection from '../components/ChallengesSection';
import WhyFanosSection from '../components/WhyFanosSection';
import CertPromotionSection from '../components/CertPromotionSection';
import FinalCTASection from '../components/FinalCTASection';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center w-full bg-cyber-dark overflow-x-hidden"
    >
      {/* 1. HERO SECTION */}
      <HeroSection />
      
      {/* Decorative transition divider */}
      <div className="w-full text-center relative z-20 -mt-10 mb-10">
         <div className="inline-block relative">
            <div className="absolute inset-0 bg-cyber-neon blur-md opacity-30"></div>
            <div className="relative font-mono text-xs text-cyber-neon tracking-[0.2em] uppercase border border-cyber-neon/50 bg-cyber-dark px-6 py-2 rounded-full glass-panel">
               [ FANOS SEC // SYSTEM INTEGRITY: VERIFIED ]
            </div>
         </div>
      </div>
      
      {/* 2. STATISTICS SECTION */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 mb-20 my-4">
        <StatsSection />
      </div>

      {/* 3. [ADD] PLATFORM OVERVIEW: LEARN, PRACTICE, CHALLENGE, CERTIFY */}
      <PlatformOverviewSection />

      {/* 4. EXISTING COURSES */}
      <OurCourses />

      {/* 5. [ADD] LEARNING PATHS */}
      <LearningPathsSection />

      {/* 6. [ADD] HANDS-ON LABS ("LEARN BY DOING") */}
      <HandsOnLabsSection />

      {/* 7. [ADD] SECURITY CHALLENGES ("TEST YOUR SECURITY SKILLS") */}
      <ChallengesSection />
      
      {/* 8. EXISTING TESTIMONIALS */}
      <TestimonialsSection />
      
      {/* 9. EXISTING MENTORS */}
      <MentorsSection />
      
      {/* 10. CAREER PROFILES */}
      <Interactive3DRoles />

      {/* 11. [ADD] WHY FANOS SEC */}
      <WhyFanosSection />

      {/* 12. [ADD] CERTIFICATION PROMOTION */}
      <CertPromotionSection />

      {/* 13. [ADD] FINAL CALL TO ACTION */}
      <FinalCTASection />

    </motion.div>
  );
}

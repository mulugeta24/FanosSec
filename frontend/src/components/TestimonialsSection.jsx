import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Berket',
    role: 'Cybersecurity Analyst',
    text: 'Loved this course. The instructor made complex networking and penetration testing topics intuitive to grasp with direct practical value.',
    initial: 'B'
  },
  {
    id: 2,
    name: 'Tlahun',
    role: 'Security Engineer',
    text: "The course gave me the essential foundation in practical coding and offensive security. It paved the way for my career in cybersecurity.",
    initial: 'T'
  },
  {
    id: 3,
    name: 'Geletaw',
    role: 'Penetration Tester',
    text: 'This platform is amazing! The content is modern and well-structured, with simulated scenarios that directly prepare you for real certifications.',
    initial: 'G'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 bg-black relative z-20">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-sans text-white mb-6 tracking-wide drop-shadow-lg"
          >
            WHAT OUR <span className="text-[#00FF41] drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]">STUDENTS SAY</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg md:text-xl font-light leading-relaxed"
          >
            Real feedback from students and professionals advancing their careers on FANOS SEC.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-[#080c10] rounded-2xl p-8 border border-white/10 hover:border-[#00FF41]/60 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Big Green Quote Icon */}
                <Quote className="text-[#00FF41] w-12 h-12 mb-6 drop-shadow-[0_0_12px_rgba(0,255,65,0.7)]" style={{ fill: 'currentColor' }} />
                
                {/* Testimonial body text */}
                <p className="text-gray-100 text-base sm:text-lg leading-relaxed font-light mb-8">
                  "{testimonial.text}"
                </p>
              </div>

              <div>
                {/* Divider */}
                <hr className="border-t border-white/10 mb-6" />

                {/* Footer: User Identity Profile */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-cyber-neon/15 border border-cyber-neon/40 flex items-center justify-center text-cyber-neon text-lg font-bold font-mono">
                    {testimonial.initial}
                  </div>
                  <div>
                     <h4 className="text-white text-lg font-bold tracking-wide">
                        {testimonial.name}
                     </h4>
                     <p className="text-cyber-neon text-sm font-mono">
                        {testimonial.role}
                     </p>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

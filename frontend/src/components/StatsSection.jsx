import { motion } from 'framer-motion';

const statsData = [
    { number: "500+", label: "STUDENTS TRAINED" },
    { number: "200+", label: "CERTIFIED GRADUATES" },
    { number: "8+", label: "SPECIALIZED TRACKS" },
    { number: "100%", label: "PRACTICAL LAB FOCUS" },
];

const StatsSection = () => {
    return (
        <section className="py-14 bg-cyber-darkest border-t border-b border-cyber-neon/25 relative z-20 shadow-[0_0_35px_rgba(0,0,0,0.9)]">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#080c10] border border-cyber-neon/30 rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center hover:border-cyber-neon hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all"
                        >
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-[#00FF41] mb-2 drop-shadow-[0_0_15px_rgba(0,255,65,0.7)]">
                                {stat.number}
                            </h3>
                            <p className="text-gray-100 font-mono text-xs sm:text-sm uppercase tracking-wider font-bold">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;

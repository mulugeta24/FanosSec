import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, BriefcaseBusiness, ShieldCheck } from 'lucide-react';

const TiltCard = ({ title, role, image, description, focus, accent, bgPos = "center 20%" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative h-[500px] w-[min(380px,calc(100vw-3rem))] shrink-0 rounded-2xl bg-gradient-to-br from-cyber-darkest to-[#0a0a0a] border ${accent.border} shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col items-center justify-end overflow-hidden cursor-crosshair group`}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-0 p-6 flex flex-col justify-between items-start pointer-events-none z-20 bg-gradient-to-t from-black via-black/80 to-transparent"
            >
                <div className="w-full flex justify-between items-start">
                    <span className={`text-[10px] font-mono ${accent.text} ${accent.background} border ${accent.border} px-3 py-1.5 rounded-full uppercase tracking-[0.16em] backdrop-blur-sm`}>
                        {role}
                    </span>
                    <div className={`h-2.5 w-2.5 rounded-full ${accent.dot} animate-pulse shadow-[0_0_10px_currentColor]`}></div>
                </div>

                <div className="w-full">
                    <p className={`mb-2 text-[10px] font-mono uppercase tracking-[0.2em] ${accent.text}`}>{focus}</p>
                    <h3 className="max-w-[290px] text-2xl font-bold leading-tight text-white mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-xs font-semibold text-white/80">
                        <span className="flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4" /> Career pathway</span>
                        <ArrowUpRight className={`h-4 w-4 ${accent.text}`} />
                    </div>
                </div>
            </div>

            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 z-0 bg-black flex items-center justify-center overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover opacity-100"
                    style={{ objectPosition: bgPos }}
                />
                <div className={`absolute inset-0 mix-blend-overlay ${accent.overlay} z-20 pointer-events-none`}></div>
            </div>

            {/* Glowing borders */}
                <div className={`absolute inset-0 border-2 border-transparent group-hover:${accent.hoverBorder} rounded-2xl transition-colors duration-300 z-10 pointer-events-none`} style={{ transform: "translateZ(20px)" }}></div>
        </motion.div>
    );
};

const Interactive3DRoles = () => {
    return (
        <section className="w-full py-24 bg-black relative overflow-hidden font-sans border-t border-b border-cyber-cyan/10">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mx-auto mb-14 max-w-3xl text-center"
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/25 bg-cyber-cyan/5 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-cyber-cyan">
                        <ShieldCheck className="h-3.5 w-3.5" /> Elite professionals
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight font-sans">
                        Learn from <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-neon drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">elite professionals</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Meet the professionals behind the practice. These elite profiles show the expertise, responsibilities, and career direction you can build through focused cybersecurity training.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-12 perspective-[1000px]">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <TiltCard
                            title="Offensive Security Specialist"
                            role="Offensive Security"
                            focus="Advanced practitioner track"
                            description="Develop the expertise to assess applications, validate weaknesses, and turn findings into defensible security improvements."
                            accent={{ text: 'text-cyan-300', background: 'bg-cyan-400/10', border: 'border-cyan-400/30', dot: 'bg-cyan-300', overlay: 'bg-cyan-400/10', hoverBorder: 'border-cyan-300/60' }}
                            image="/mulugeta.jpg"
                            bgPos="center 30%"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <TiltCard
                            title="Junior Penetration Tester"
                            role="Red Teaming"
                            focus="Entry-level practitioner track"
                            description="Build a strong foundation in reconnaissance, testing methodology, and responsible attack simulation within controlled environments."
                            accent={{ text: 'text-emerald-300', background: 'bg-emerald-400/10', border: 'border-emerald-400/30', dot: 'bg-emerald-300', overlay: 'bg-emerald-400/10', hoverBorder: 'border-emerald-300/60' }}
                            image="/nardos.png"
                            bgPos="center 10%"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Interactive3DRoles;

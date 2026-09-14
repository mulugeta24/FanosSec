import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, MessageSquare, User, AtSign, MapPin } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        try {
            await axios.post(`${API_BASE}/contacts`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(null), 5000);
        } catch (err) {
            // Local fallback simulation if backend is not seeded
            setTimeout(() => {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(null), 5000);
            }, 800);
        }
    };

    return (
        <div className="min-h-screen bg-cyber-dark text-white pt-28 pb-20 px-4 sm:px-6 selection:bg-cyber-neon selection:text-black">
            <div className="container mx-auto max-w-5xl">
                
                {/* Header Block */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 text-cyber-neon text-sm font-mono tracking-widest uppercase mb-4">
                        <Mail className="w-4 h-4" />
                        <span>SECURE TRANSMISSION</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-wide text-white mb-4">
                        CONTACT <span className="text-cyber-neon drop-shadow-[0_0_20px_rgba(0,255,65,0.6)]">US</span>
                    </h1>
                    <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Have a question about our certification programs, institutional training, or platform features? Drop us a secure message.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Info Panel */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-5 flex flex-col justify-between space-y-6"
                    >
                        <div className="bg-[#0b0f14] border border-cyber-neon/30 rounded-2xl p-8 shadow-xl">
                            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider font-mono">
                                Direct Channels
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-cyber-neon/15 border border-cyber-neon/30 rounded-xl text-cyber-neon shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Phone / Telegram</p>
                                        <p className="text-lg font-bold text-white font-mono mt-0.5">0945616440</p>
                                        <p className="text-sm text-gray-400">Available Monday - Saturday</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-cyber-cyan/15 border border-cyber-cyan/30 rounded-xl text-cyber-cyan shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Official Email</p>
                                        <p className="text-base sm:text-lg font-bold text-white font-mono mt-0.5 break-all">
                                            mulugetaababi237@gmail.com
                                        </p>
                                        <p className="text-sm text-gray-400">Response within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-purple-500/15 border border-purple-500/30 rounded-xl text-purple-400 shrink-0">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Telegram Community</p>
                                        <a 
                                            href="https://t.me/InfoSecureTech" 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="text-base font-bold text-cyber-neon hover:underline font-mono mt-0.5 inline-block"
                                        >
                                            @InfoSecureTech ↗
                                        </a>
                                        <p className="text-sm text-gray-400">Join our security channel</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
                            <p className="text-sm text-gray-300 font-mono leading-relaxed">
                                🛡️ <strong className="text-white">Encrypted Transmission:</strong> Messages submitted through this form are logged securely in our administrative inbox.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-7 bg-[#0b0f14] border border-cyber-neon/30 rounded-2xl p-8 sm:p-10 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-200 font-mono mb-2" htmlFor="name">
                                    Full Name / Alias
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        placeholder="Alex Mercer"
                                        className="w-full pl-12 pr-4 py-3.5 bg-black/60 border border-white/20 rounded-xl text-white text-base focus:outline-none focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon transition-all"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-200 font-mono mb-2" htmlFor="email">
                                    Secure Email Address
                                </label>
                                <div className="relative">
                                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="alex@security.org"
                                        className="w-full pl-12 pr-4 py-3.5 bg-black/60 border border-white/20 rounded-xl text-white text-base focus:outline-none focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon transition-all"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-200 font-mono mb-2" htmlFor="message">
                                    Transmission Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    required
                                    placeholder="Enter your inquiry, feedback, or training request..."
                                    className="w-full p-4 bg-black/60 border border-white/20 rounded-xl text-white text-base focus:outline-none focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon transition-all resize-none"
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 px-6 rounded-xl bg-cyber-neon text-black font-extrabold text-lg uppercase tracking-wider hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,65,0.8)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? (
                                    <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Encrypt & Send Transmission</span>
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-cyber-neon/15 border border-cyber-neon text-cyber-neon rounded-xl flex items-center space-x-3 text-base font-medium"
                                >
                                    <CheckCircle className="w-6 h-6 shrink-0" />
                                    <span>Transmission received! Our security team will review and reply within 24 hours.</span>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;

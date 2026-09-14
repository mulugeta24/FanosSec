import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingPanel from './FloatingPanel';
import { Terminal, ArrowRight, ExternalLink, Play, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const LabCard = ({ lab, delay = 0, onLaunch }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const isDirectSandbox = !!lab?.sandboxUrl;
    const targetLink = lab?.sandboxUrl || (lab?.challengeId ? `/challenges/${lab.challengeId}` : `/challenges`);

    const handleLaunchClick = (e) => {
        if (!user) {
            e.preventDefault();
            // Redirect to login with return target
            const redirectPath = isDirectSandbox ? '/labs' : targetLink;
            navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`);
            return;
        }

        if (onLaunch) {
            e.preventDefault();
            onLaunch(lab);
        }
    };

    return (
        <FloatingPanel delay={delay} className="flex flex-col h-full border border-cyber-neon/30 hover:border-cyber-neon transition-all bg-[#080c10] p-6 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(0,255,65,0.15)] group">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-cyber-darkest border border-cyber-neon/40 text-cyber-neon group-hover:border-cyber-neon transition-colors">
                        <Terminal size={24} />
                    </div>
                    <div className="flex items-center space-x-2">
                        {lab?.difficulty && (
                            <span className="text-[11px] font-mono font-bold text-cyber-cyan bg-cyber-cyan/10 py-1 px-2.5 rounded-md border border-cyber-cyan/30 uppercase">
                                {lab.difficulty}
                            </span>
                        )}
                        <span className="text-xs font-mono font-bold text-cyber-neon bg-cyber-neon/10 py-1.5 px-3 rounded-md border border-cyber-neon/30 uppercase tracking-wider">
                            Virtual Sandbox
                        </span>
                    </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-wide leading-snug group-hover:text-cyber-neon transition-colors">
                    {lab?.title || 'Interactive Lab'}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base line-clamp-3 mb-6 font-light leading-relaxed">
                    {lab?.description || 'Get hands-on experience with real-world vulnerabilities and defense mechanisms in an isolated environment.'}
                </p>
                {lab?.flag && (
                    <div className="mb-4 px-3 py-1.5 rounded-lg bg-black/60 border border-cyber-neon/30 text-xs font-mono text-cyber-neon">
                        Flag Target: <span className="text-white font-bold">{lab.flag}</span>
                    </div>
                )}
            </div>
            <div className="mt-auto pt-4 border-t border-white/10">
                {isDirectSandbox ? (
                    <a 
                        href={user ? lab.sandboxUrl : `/login?redirect=${encodeURIComponent('/labs')}`}
                        target={user ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        onClick={handleLaunchClick}
                        className="w-full py-3.5 px-4 text-center rounded-xl bg-cyber-neon text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,65,0.8)] font-extrabold text-base uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                    >
                        {!user ? <Lock className="w-4 h-4 text-black" /> : <Play className="w-4 h-4 fill-black" />}
                        <span>{user ? 'LAUNCH SANDBOX' : 'SIGN IN TO LAUNCH'}</span>
                        {user ? <ExternalLink className="w-4 h-4 ml-1" /> : <ArrowRight className="w-4 h-4 ml-1" />}
                    </a>
                ) : (
                    <button 
                        onClick={handleLaunchClick}
                        className="w-full py-3.5 px-4 text-center rounded-xl bg-cyber-neon text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,65,0.8)] font-extrabold text-base uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                    >
                        {!user ? <Lock className="w-4 h-4 text-black" /> : <Play className="w-4 h-4 fill-black" />}
                        <span>{user ? 'LAUNCH SANDBOX' : 'SIGN IN TO LAUNCH'}</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                )}
            </div>
        </FloatingPanel>
    );
};

export default LabCard;

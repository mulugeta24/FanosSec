import { Award, Download } from 'lucide-react';
import FloatingPanel from './FloatingPanel';

const CertificateCard = ({ certificate, delay = 0 }) => {
    return (
        <FloatingPanel delay={delay} className="border border-[#FFD700] border-opacity-30 hover:border-opacity-100 flex flex-col md:flex-row items-center gap-6">
            <div className="p-6 rounded-full bg-[#FFD700] bg-opacity-10 border-2 border-[#FFD700] border-opacity-50">
                <Award className="text-[#FFD700]" size={48} />
            </div>
            <div className="flex-grow text-center md:text-left">
                <p className="text-xs text-cyber-muted font-mono uppercase tracking-widest mb-1">ID: {certificate?.certificateId || 'CCH-999999'}</p>
                <h3 className="text-2xl font-bold text-[#FFD700] font-mono tracking-wide">{certificate?.course?.title || 'Certified Cybersecurity Expert'}</h3>
                <p className="text-cyber-text mt-2">Issued on: {new Date(certificate?.issuedAt || Date.now()).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 md:mt-0">
                <button className="flex items-center space-x-2 outline-neon-button !border-[#FFD700] !text-[#FFD700] hover:!bg-[#FFD700] hover:!text-cyber-dark hover:!shadow-[0_0_20px_rgba(255,215,0,0.8)] px-8">
                    <Download size={20} />
                    <span>Download PDF</span>
                </button>
            </div>
        </FloatingPanel>
    );
};

export default CertificateCard;

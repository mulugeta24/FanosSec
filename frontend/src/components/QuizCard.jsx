import { Link } from 'react-router-dom';
import FloatingPanel from './FloatingPanel';
import { HelpCircle } from 'lucide-react';

const QuizCard = ({ quiz, delay = 0 }) => {
    return (
        <FloatingPanel delay={delay} className="flex flex-col h-full border border-cyber-purple border-opacity-20 hover:border-opacity-100">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg bg-cyber-darkest border border-cyber-purple">
                        <HelpCircle className="text-cyber-purple" size={24} />
                    </div>
                    <span className="text-xs font-mono text-cyber-purple bg-cyber-purple bg-opacity-10 py-1 px-3 rounded-full border border-cyber-purple border-opacity-30 uppercase tracking-wider">
                        Assessment
                    </span>
                </div>
                <h3 className="text-xl font-bold text-cyber-text mb-2 tracking-wide font-mono">{quiz?.title || 'Knowledge Assessment'}</h3>
                <p className="text-cyber-muted text-sm mb-6">
                    Test your comprehension of the latest module. Scoring 80% or above is required to unlock your certificate.
                </p>
            </div>
            <div className="mt-auto">
                <Link to={`/quizzes/${quiz?._id || '1'}`} className="block w-full text-center outline-neon-button !border-cyber-purple !text-cyber-purple hover:!bg-cyber-purple hover:!text-cyber-dark hover:!shadow-[0_0_20px_rgba(176,38,255,0.8)]">
                    Take Quiz
                </Link>
            </div>
        </FloatingPanel>
    );
};

export default QuizCard;

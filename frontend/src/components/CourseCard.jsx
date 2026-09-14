import { Link } from 'react-router-dom';
import FloatingPanel from './FloatingPanel';
import { BookOpen, ArrowRight } from 'lucide-react';

const CourseCard = ({ course, delay = 0 }) => {
    return (
        <FloatingPanel delay={delay} className="flex flex-col h-full border border-cyber-cyan/30 hover:border-cyber-cyan transition-all bg-[#080c10] p-6 rounded-2xl shadow-xl">
            <div className="flex-grow">
                {course?.image && (
                    <div className="w-full h-44 mb-5 rounded-xl overflow-hidden border border-white/10">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                )}
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-cyber-darkest border border-cyber-cyan/40 text-cyber-cyan">
                        <BookOpen size={24} />
                    </div>
                    <span className="text-xs font-mono font-bold text-cyber-cyan bg-cyber-cyan/10 py-1.5 px-3 rounded-md border border-cyber-cyan/30 uppercase tracking-wider text-right ml-2">
                        {course?.category || 'Security Track'}
                    </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-wide leading-snug">
                    {course?.title || 'Course Title'}
                </h3>
                <div className="text-gray-300 text-base mb-6 whitespace-pre-wrap leading-relaxed font-light">
                    {course?.description || 'Learn foundational cybersecurity concepts and dive deep into real-world technical execution.'}
                </div>
            </div>
            <div className="mt-auto pt-4 border-t border-white/10">
                <Link 
                    to={`/enroll/${course?._id || 'dmcst'}`} 
                    className="w-full py-3.5 px-4 text-center rounded-xl bg-cyber-cyan/15 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black font-bold text-base transition-all flex items-center justify-center space-x-2"
                >
                    <span>Access Course</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </FloatingPanel>
    );
};

export default CourseCard;

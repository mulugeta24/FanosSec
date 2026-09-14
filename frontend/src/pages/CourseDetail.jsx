import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Download, Video, FileText, Award } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
// A simple markdown to HTML parser setup, using dangerouslySetInnerHTML for now if no parser is present.
// Normally we'd use react-markdown, we will rely on strict whitespace layout for standard text if no HTML.

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [certLoading, setCertLoading] = useState(false);
  const [certificatePdf, setCertificatePdf] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/courses/${id}`);
        setCourse(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  // Utility to convert standard youtube link to embed link
  const getEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const handleClaimCertificate = async () => {
    try {
      setCertLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.post(`${API_BASE}/certificates`, { courseId: id }, config);
      setCertificatePdf(`${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:5000'}${data.pdfUrl}`);
      setCertLoading(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Error generating certificate');
      setCertLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-cyber-neon pt-20">Loading Tutorial Resource...</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center text-red-500 pt-20">Tutorial not found</div>;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center text-gray-400 hover:text-cyber-neon mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Student Portal
      </Link>

      <div className="mb-10">
        <span className="px-3 py-1 bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/30 text-sm font-bold rounded-full mb-4 inline-block">
          {course.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4">{course.title}</h1>
        <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area: Video & Theory */}
        <div className="lg:col-span-2 space-y-8">
          
          {course.videoUrl && (
             <div className="bg-black/50 border border-gray-800 rounded-2xl overflow-hidden shadow-xl relative mt-4">
               <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center">
                 <Video className="w-5 h-5 text-red-500 mr-2" />
                 <h3 className="text-white font-medium">Video Tutorial</h3>
               </div>
               <div className="aspect-video w-full bg-black">
                 <iframe 
                    className="w-full h-full"
                    src={getEmbedUrl(course.videoUrl)} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
               </div>
             </div>
          )}

          {course.theoryContent && (
             <div className="bg-cyber-dark/80 backdrop-blur-md rounded-2xl border border-gray-800 p-6 md:p-8">
                <div className="flex items-center mb-6 border-b border-gray-800 pb-4">
                   <FileText className="w-5 h-5 text-green-400 mr-2" />
                   <h3 className="text-xl font-bold text-white">Theory & Notes</h3>
                </div>
                <div className="prose prose-invert prose-cyan max-w-none text-gray-300 leading-loose whitespace-pre-wrap">
                  {course.theoryContent}
                </div>
             </div>
          )}
          
          {/* Claim Certificate Action Area */}
          <div className="mt-12 bg-black/40 border border-cyber-neon/40 rounded-2xl p-8 text-center flex flex-col items-center shadow-[0_0_20px_rgba(0,255,65,0.1)]">
             <Award className="w-16 h-16 text-cyber-neon mb-4" />
             <h3 className="text-2xl font-bold text-white mb-2">Mastered this module?</h3>
             <p className="text-gray-400 mb-6">Prove your skills by claiming your official FANOS SEC certificate.</p>
             
             {certificatePdf ? (
                 <a 
                   href={certificatePdf}
                   target="_blank" rel="noopener noreferrer"
                   className="px-8 py-4 bg-cyber-neon text-black font-extrabold uppercase tracking-widest rounded-lg flex items-center hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,65,0.6)]"
                 >
                   <Download className="w-5 h-5 mr-3" />
                   DOWNLOAD CERTIFICATE PDF
                 </a>
             ) : (
                 <button 
                   onClick={handleClaimCertificate}
                   disabled={certLoading}
                   className={`px-8 py-4 bg-cyber-dark border-2 border-cyber-neon text-cyber-neon font-extrabold uppercase tracking-widest rounded-lg flex items-center ${certLoading ? 'opacity-50' : 'hover:bg-cyber-neon hover:text-black shadow-[0_0_15px_rgba(0,255,65,0.3)]'} transition-all`}
                 >
                   {certLoading ? 'GENERATING...' : 'CLAIM CERTIFICATE NOW'}
                 </button>
             )}
          </div>
          
        </div>

        {/* Sidebar: Resources */}
        <div className="space-y-6">
           <div className="bg-cyber-dark/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 sticky top-28">
             <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-3">Course Resources</h3>
             
             {course.pdfUrl ? (
                <a 
                  href={course.pdfUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 p-4 rounded-xl flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center">
                     <FileText className="w-6 h-6 mr-3 text-blue-500" />
                     <div>
                       <p className="font-semibold text-white">Download PDF</p>
                       <p className="text-xs text-blue-400/70">External Link</p>
                     </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-transform" />
                </a>
             ) : (
                <p className="text-sm text-gray-500 italic">No PDF resources available for this tutorial.</p>
             )}

             <div className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-400">
               <p className="mb-2"><strong className="text-gray-300">Added:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
               <p><strong className="text-gray-300">Instructor:</strong> Admin</p>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetail;

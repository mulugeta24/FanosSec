import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import CareerPaths from './pages/CareerPaths';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import Labs from './pages/Labs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyCertificate from './pages/VerifyCertificate';
import ManageSkillWizard from './pages/ManageSkillWizard';
import AdminPathWizard from './pages/AdminPathWizard';
import PreSecurityPath from './pages/PreSecurityPath';
import LearningPaths from './pages/LearningPaths';
import LearningPathDetail from './pages/LearningPathDetail';
import Challenges from './pages/Challenges';
import ChallengeDetail from './pages/ChallengeDetail';
import Certifications from './pages/Certifications';
import Resources from './pages/Resources';
import CourseEnroll from './pages/CourseEnroll';
import StudentDashboard from './pages/StudentDashboard';
import CourseDetail from './pages/CourseDetail';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollControls from './components/ScrollControls';

// Admin pages — new Admin Control Center
import AdminDashboard from './admin/AdminDashboard';
import ModulesPage from './admin/pages/ModulesPage';
import CoursesPage from './admin/pages/CoursesPage';
import LearningPathsPage from './admin/pages/LearningPathsPage';
import LessonsPage from './admin/pages/LessonsPage';
import LabsPage from './admin/pages/LabsPage';
import ChallengesPage from './admin/pages/ChallengesPage';
import QuestionBankPage from './admin/pages/QuestionBankPage';
import QuizzesPage from './admin/pages/QuizzesPage';
import NewsPage from './admin/pages/NewsPage';
import VulnerabilitiesPage from './admin/pages/VulnerabilitiesPage';
import SecurityToolsPage from './admin/pages/SecurityToolsPage';
import GlossaryPage from './admin/pages/GlossaryPage';
import GuidesPage from './admin/pages/GuidesPage';
import CertificatesPage from './admin/pages/CertificatesPage';
import ResourcesPage from './admin/pages/ResourcesPage';
import LearnersPage from './admin/pages/LearnersPage';
import ContactMessagesPage from './admin/pages/ContactMessagesPage';
import AnnouncementsPage from './admin/pages/AnnouncementsPage';
import AdminActivityPage from './admin/pages/AdminActivityPage';
import AnalyticsPage from './admin/pages/AnalyticsPage';
import SettingsPage from './admin/pages/SettingsPage';
import AdminSectionPlaceholder from './admin/pages/AdminSectionPlaceholder';

const AdminRoute = ({ children }) => (
  <ProtectedRoute adminOnly={true}>{children}</ProtectedRoute>
);

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin' || location.pathname.startsWith('/admin/');

  return (
    <div className="flex flex-col min-h-screen bg-cyber-dark text-cyber-text font-sans antialiased overflow-x-hidden selection:bg-cyber-neon selection:text-black">
      {!isAdminRoute && <Header />}

      <main className="flex-grow w-full relative">
        <AnimatePresence mode="wait">
            <Routes>
              {/* ── Public Routes ── */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/learning-paths" element={<LearningPaths />} />
              <Route path="/learning-paths/:id" element={<LearningPathDetail />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/challenges/:id" element={<ChallengeDetail />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/verify" element={<VerifyCertificate />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/career-paths" element={<CareerPaths />} />
              <Route path="/path/pre-security" element={<PreSecurityPath />} />
              <Route path="/enroll/:id" element={<CourseEnroll />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />

              {/* ── Auth Routes ── */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* ── Student Routes ── */}
              <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
              <Route path="/course/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />

              {/* ── Admin Routes — FANOS SEC Control Center ── */}
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/wizard" element={<AdminRoute><ManageSkillWizard /></AdminRoute>} />
              <Route path="/admin/path/new" element={<AdminRoute><AdminPathWizard /></AdminRoute>} />

              {/* Education */}
              <Route path="/admin/courses" element={<AdminRoute><CoursesPage /></AdminRoute>} />
              <Route path="/admin/paths" element={<AdminRoute><LearningPathsPage /></AdminRoute>} />
              <Route path="/admin/modules" element={<AdminRoute><ModulesPage /></AdminRoute>} />
              <Route path="/admin/lessons" element={<AdminRoute><LessonsPage /></AdminRoute>} />

              {/* Assessment */}
              <Route path="/admin/question-bank" element={<AdminRoute><QuestionBankPage /></AdminRoute>} />
              <Route path="/admin/quizzes" element={<AdminRoute><QuizzesPage /></AdminRoute>} />

              {/* Practical */}
              <Route path="/admin/labs" element={<AdminRoute><LabsPage /></AdminRoute>} />
              <Route path="/admin/challenges" element={<AdminRoute><ChallengesPage /></AdminRoute>} />
              <Route path="/admin/resources" element={<AdminRoute><ResourcesPage /></AdminRoute>} />
              <Route path="/admin/pdfs" element={<AdminRoute><ResourcesPage /></AdminRoute>} />
              <Route path="/admin/documents" element={<AdminRoute><ResourcesPage /></AdminRoute>} />
              <Route path="/admin/videos" element={<AdminRoute><ResourcesPage /></AdminRoute>} />
              <Route path="/admin/images" element={<AdminRoute><ResourcesPage /></AdminRoute>} />
              <Route path="/admin/slides" element={<AdminRoute><ResourcesPage /></AdminRoute>} />

              {/* Cyber Intelligence */}
              <Route path="/admin/news" element={<AdminRoute><NewsPage /></AdminRoute>} />
              <Route path="/admin/vulnerabilities" element={<AdminRoute><VulnerabilitiesPage /></AdminRoute>} />
              <Route path="/admin/security-tools" element={<AdminRoute><SecurityToolsPage /></AdminRoute>} />
              <Route path="/admin/glossary" element={<AdminRoute><GlossaryPage /></AdminRoute>} />
              <Route path="/admin/guides" element={<AdminRoute><GuidesPage /></AdminRoute>} />

              {/* Certifications */}
              <Route path="/admin/certificates" element={<AdminRoute><CertificatesPage /></AdminRoute>} />

              {/* User Management */}
              <Route path="/admin/learners" element={<AdminRoute><LearnersPage /></AdminRoute>} />
              <Route path="/admin/messages" element={<AdminRoute><ContactMessagesPage /></AdminRoute>} />

              {/* Communication */}
              <Route path="/admin/announcements" element={<AdminRoute><AnnouncementsPage /></AdminRoute>} />

              {/* System */}
              <Route path="/admin/admin-activity" element={<AdminRoute><AdminActivityPage /></AdminRoute>} />
              <Route path="/admin/audit-logs" element={<AdminRoute><AdminActivityPage /></AdminRoute>} />
              <Route path="/admin/learning-analytics" element={<AdminRoute><AnalyticsPage /></AdminRoute>} />
              <Route path="/admin/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />

              {/* Keep unfinished admin destinations inside the admin shell. */}
              <Route path="/admin/*" element={<AdminRoute><AdminSectionPlaceholder activeSection="" title="FANOS SEC Admin Control Center" description="This administration destination is being prepared for database-backed management." /></AdminRoute>} />
            </Routes>
        </AnimatePresence>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollControls />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

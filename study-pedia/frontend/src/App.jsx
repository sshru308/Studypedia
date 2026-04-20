import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';
import CollegeInfo from './pages/CollegeInfo';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminPanel from './pages/AdminPanel';
import ManageCourses from './pages/ManageCourses';
import ManageSubjects from './pages/ManageSubjects';
import ManageMaterials from './pages/ManageMaterials';
import SendMemo from './pages/SendMemo';
import ManageExams from './pages/ManageExams';
import ExamsDashboard from './pages/ExamsDashboard';
import ManageTimetable from './pages/ManageTimetable';
import ViewTimetable from './pages/ViewTimetable';
import ApplyLeave from './pages/ApplyLeave';
import ManageLeave from './pages/ManageLeave';
import ManageAlumni from './pages/ManageAlumni';
import ManageHappyUs from './pages/ManageHappyUs';
import StudentProfile from './pages/StudentProfile';
import CGPACalculator from './pages/CGPACalculator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <DataProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<CollegeInfo />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/dashboard" element={
              isAuthenticated && user?.role === 'student' ? <StudentDashboard user={user} /> : <Navigate to="/login" />
            } />
            <Route path="/profile" element={
              isAuthenticated && user?.role === 'student' ? <StudentProfile user={user} /> : <Navigate to="/login" />
            } />
            <Route path="/cgpa-calculator" element={
              isAuthenticated && user?.role === 'student' ? <CGPACalculator user={user} /> : <Navigate to="/login" />
            } />
            <Route path="/admin" element={
              isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />
            } />
            <Route path="/admin/courses" element={<ManageCourses />} />
            <Route path="/admin/subjects" element={<ManageSubjects />} />
            <Route path="/admin/materials" element={<ManageMaterials />} />
            <Route path="/admin/send-memo" element={<SendMemo />} />
            <Route path="/admin/manage-exams" element={<ManageExams />} />
            <Route path="/admin/manage-timetable" element={<ManageTimetable />} />
            <Route path="/admin/manage-leave" element={<ManageLeave />} />
            <Route path="/admin/manage-alumni" element={<ManageAlumni />} />
            <Route path="/admin/manage-happyus" element={<ManageHappyUs />} />
            <Route path="/exams" element={
              isAuthenticated && user?.role === 'student' ? <ExamsDashboard user={user} /> : <Navigate to="/login" />
            } />
            <Route path="/timetable" element={
              isAuthenticated && user?.role === 'student' ? <ViewTimetable user={user} /> : <Navigate to="/login" />
            } />
            <Route path="/apply-leave" element={
              isAuthenticated && user?.role === 'student' ? <ApplyLeave user={user} /> : <Navigate to="/login" />
            } />
          </Routes>
        </Router>
      </NotificationProvider>
    </DataProvider>
  );
}

export default App;
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Load data from localStorage
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('studyPedia_courses');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', code: 'BCA', name: 'Bachelor of Computer Applications', duration: '3 Years', semesters: 6, description: 'Programming, Databases, Web Development' },
      { id: '2', code: 'BCOM', name: 'Bachelor of Commerce', duration: '3 Years', semesters: 6, description: 'Accounting, Finance, Business Studies' },
      { id: '3', code: 'BSC', name: 'Bachelor of Science', duration: '3 Years', semesters: 6, description: 'Mathematics, Physics, Chemistry' }
    ];
  });

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('studyPedia_subjects');
    if (saved) return JSON.parse(saved);
    return {};
  });

  const [materials, setMaterials] = useState(() => {
    const saved = localStorage.getItem('studyPedia_materials');
    if (saved) return JSON.parse(saved);
    return {};
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('studyPedia_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('studyPedia_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('studyPedia_materials', JSON.stringify(materials));
  }, [materials]);

  // Course Management
  const addCourse = (course) => {
    const newCourse = { ...course, id: Date.now().toString() };
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (id, updatedCourse) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updatedCourse } : c));
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // Subject Management
  const getSubjects = (courseCode, semester, curriculum) => {
    const key = `${courseCode}_${semester}_${curriculum}`;
    return subjects[key] || [];
  };

  const addSubject = (courseCode, semester, curriculum, subject) => {
    const key = `${courseCode}_${semester}_${curriculum}`;
    const newSubject = { ...subject, id: Date.now().toString() };
    setSubjects({
      ...subjects,
      [key]: [...(subjects[key] || []), newSubject]
    });
  };

  const deleteSubject = (courseCode, semester, curriculum, subjectId) => {
    const key = `${courseCode}_${semester}_${curriculum}`;
    setSubjects({
      ...subjects,
      [key]: subjects[key].filter(s => s.id !== subjectId)
    });
  };

  // Materials Management
  const getMaterials = (subjectId, type) => {
    return materials[`${subjectId}_${type}`] || [];
  };

  const addMaterial = (subjectId, type, material) => {
    const key = `${subjectId}_${type}`;
    const newMaterial = { ...material, id: Date.now().toString(), uploadedAt: new Date().toISOString() };
    setMaterials({
      ...materials,
      [key]: [...(materials[key] || []), newMaterial]
    });
  };

  const deleteMaterial = (subjectId, type, materialId) => {
    const key = `${subjectId}_${type}`;
    setMaterials({
      ...materials,
      [key]: materials[key].filter(m => m.id !== materialId)
    });
  };

  return (
    <DataContext.Provider value={{
      courses, addCourse, updateCourse, deleteCourse,
      subjects, getSubjects, addSubject, deleteSubject,
      materials, getMaterials, addMaterial, deleteMaterial
    }}>
      {children}
    </DataContext.Provider>
  );
};
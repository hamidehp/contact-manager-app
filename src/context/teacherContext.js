import {createContext} from 'react';
export const teacherContext=createContext({
    Loading:false,
    setLoading:()=>{},
    teacher:{},
    setTeacher:()=>{},
    teachers:[],
    setTeachers:()=>{},
    filteredTeachers:[],
    setFilteredTeachers:()=>{},
    teacherQuery:{},
    groups:[],
    //errors:[],
    onTeacherChange:()=>{},
    deleteTeacher:()=>{},
    updateTeacher:()=>{},
    createContext:()=>{},
    teacherSearch:()=>{}
});
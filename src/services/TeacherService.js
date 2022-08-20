import axios from 'axios';
const SERVER_URL ="http://localhost:9000";
//@desc GetAllTeachers
//@route Get http://localhost:9000/teachers
export const getAllTeachers=() =>{
    const url=`${SERVER_URL}/teachers`;
    return axios.get(url);
}

//@desc GetTeacher with teacherId
//@route Get http://localhost:9000/teachers/:teacherId
export const getTeacher=(teacherId)=>{
    const url =`${SERVER_URL}/teachers/${teacherId}`;
    return axios.get(url);
}

//@desc GetAllGroups
//@route Get http://localhost:9000/groups
export const getAllGroups =()=>{
    const url=`${SERVER_URL}/groups`;
    return axios.get(url);
}

//@desc Getgroup with groupId
//@route Get http://localhost:9000/groups/:groupId
export const getGroup=(groupId)=>{
    const url =`${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}

//@desc PostCreateTeacher
//@route Post http://localhost:9000/teachers
export const createTeacher =(teacher) =>
{
    const url=` ${SERVER_URL}/teachers`;
    return axios.post(url,teacher);
}

//@desc PutUpdateTeacher
//@route Put http://localhost:9000/teachers/:teacherId
export const updateTeacher =(teacher,teacherId) =>
{
    const url=` ${SERVER_URL}/teachers/${teacherId}`;
    return axios.put(url,teacher);
}

//@desc Delete DeleteTeacher
//@route Delete http://localhost:9000/teachers/:teacherId

export const deleteTeacher =(teacherId) =>{
    const url=`${SERVER_URL}/teachers/${teacherId}`;
    return axios.delete(url);
}